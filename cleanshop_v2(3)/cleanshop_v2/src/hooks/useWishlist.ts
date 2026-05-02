import { useState, useCallback } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggle = useCallback((id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isInWishlist = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggle, isInWishlist };
}
