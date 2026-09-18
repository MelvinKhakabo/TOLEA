export default function Badge({ children = 'Verified' }: { children?: React.ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] font-medium text-forest bg-white px-[9px] py-1 rounded inline-flex items-center gap-1.5">
      <span>✓</span>
      {children}
    </span>
  );
}