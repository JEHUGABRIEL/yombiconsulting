import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { Review, ReviewFormData } from '@/types';

export function useReviews(isAdmin: boolean) {
  const [approvedReviews, setApprovedReviews] = useState<Record<number, Review[]>>({});
  const [pendingReviews,  setPendingReviews]  = useState<Review[]>([]);
  const [submitting,      setSubmitting]      = useState(false);

  // ── Fetch helpers ──────────────────────────────────────────

  const fetchApproved = useCallback(async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    // Table may not exist yet (before running supabase-schema.sql)
    if (error) {
      if (!error.message.includes('schema cache')) {
        console.error('[Reviews] fetch approved:', error.message);
      }
      return;
    }

    const grouped = (data as Review[]).reduce<Record<number, Review[]>>((acc, rev) => {
      if (!acc[rev.product_id]) acc[rev.product_id] = [];
      acc[rev.product_id].push(rev);
      return acc;
    }, {});

    setApprovedReviews(grouped);
  }, []);

  const fetchPending = useCallback(async () => {
    if (!isAdmin) return;
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      if (!error.message.includes('schema cache')) {
        console.error('[Reviews] fetch pending:', error.message);
      }
      return;
    }
    setPendingReviews(data as Review[]);
  }, [isAdmin]);

  // ── Initial load ───────────────────────────────────────────

  useEffect(() => { fetchApproved(); }, [fetchApproved]);
  useEffect(() => { fetchPending();  }, [fetchPending]);

  // ── Realtime subscription ──────────────────────────────────

  useEffect(() => {
    const channel = supabase
      .channel('reviews-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
        fetchApproved();
        if (isAdmin) fetchPending();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, fetchApproved, fetchPending]);

  // ── Actions ────────────────────────────────────────────────

  const submitReview = async (productId: number, form: ReviewFormData): Promise<boolean> => {
    if (!form.user.trim() || !form.comment.trim()) {
      toast.error('Merci de remplir tous les champs.');
      return false;
    }

    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      user:       form.user.trim(),
      rating:     form.rating,
      comment:    form.comment.trim(),
      date:       new Date().toISOString().split('T')[0],
      status:     'pending',
    });
    setSubmitting(false);

    if (error) {
      toast.error("Erreur lors de l'envoi. Réessayez.");
      console.error('[Reviews] submit:', error.message);
      return false;
    }

    toast.success('Avis envoyé ! Il sera visible après modération.');
    return true;
  };

  const approveReview = async (review: Review) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'approved' })
      .eq('id', review.id);

    if (error) { toast.error("Erreur lors de l'approbation."); return; }
    toast.success('Avis approuvé !');
    setPendingReviews(prev => prev.filter(r => r.id !== review.id));
    fetchApproved();
  };

  const rejectReview = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) { toast.error('Erreur lors de la suppression.'); return; }
    toast.success('Avis supprimé.');
    setPendingReviews(prev => prev.filter(r => r.id !== id));
  };

  return {
    approvedReviews,
    pendingReviews,
    submitting,
    submitReview,
    approveReview,
    rejectReview,
  };
}
