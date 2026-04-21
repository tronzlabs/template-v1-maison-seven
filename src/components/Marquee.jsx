export default function Marquee({ items = [], className = "" }) {
  const list = [...items, ...items];
  return (
    <div className={`relative flex select-none overflow-hidden ${className}`}>
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-14 whitespace-nowrap">
        {list.map((it, i) => (
          <span key={i} className="flex items-center gap-14 font-display text-5xl italic md:text-7xl">
            <span>{it}</span>
            <span className="inline-block h-2 w-2 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
