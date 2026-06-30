function FcfaBadge() {
  return (
    <span className="inline-flex items-center justify-center px-1 py-0.5 bg-brand-600 text-white text-[9px] font-bold uppercase tracking-wider rounded-sm leading-none shrink-0">
      FCFA
    </span>
  );
}

export function FcfaCurrency({
  price,
  className = ''
}: {
  price: string;
  className?: string;
}) {
  // "Sur demande" / "Upon request" — no currency to display
  if (
    price === 'Sur demande' ||
    price === 'Upon request'
  ) {
    return <span className={className}>{price}</span>;
  }

  const parts = price.split('FCFA');

  // No FCFA in the string — render as-is
  if (parts.length <= 1) {
    return <span className={className}>{price}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {parts[0] && <span>{parts[0]}</span>}
      <FcfaBadge />
      {parts.slice(1).join('')}
    </span>
  );
}
