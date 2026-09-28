export default function ImagePlaceholder({
  caption,
  className = '',
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(232,163,49,0.30), transparent 55%), radial-gradient(circle at 75% 70%, rgba(43,110,79,0.26), transparent 55%), linear-gradient(135deg, #e9ded0, #cfc3ad)',
      }}
    >
      {caption && (
        <span className="absolute bottom-2.5 left-3 font-mono text-[9.5px] text-[#5a4f3d]">
          {caption}
        </span>
      )}
    </div>
  );
}