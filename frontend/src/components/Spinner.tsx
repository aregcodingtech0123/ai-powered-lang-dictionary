export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
