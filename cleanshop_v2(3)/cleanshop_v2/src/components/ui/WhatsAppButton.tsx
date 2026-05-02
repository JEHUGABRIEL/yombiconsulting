import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import type { CartItem } from '@/types';

interface Props {
  cart?: CartItem[];
  cartTotal?: number;
  message?: string;
}

export function WhatsAppButton({ cart = [], cartTotal = 0, message }: Props) {
  const openWhatsApp = () => {
    const text = cart.length > 0
      ? `Bonjour Clean., je souhaite commander :\n${cart.map(i => `- ${i.name} (${i.quantity}x)`).join('\n')}\nTotal : ${cartTotal.toLocaleString()} CFA`
      : message ?? 'Bonjour Clean., je souhaite commander du matériel informatique.';

    window.open(`https://wa.me/23672280727?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openWhatsApp}
      aria-label="Contacter Clean Shop sur WhatsApp"
      className="fixed bottom-24 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-200 md:bottom-6"
    >
      <MessageSquare size={26} />
    </motion.button>
  );
}
