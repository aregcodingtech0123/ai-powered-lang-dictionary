export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-5 animate-spin rounded-full border-2 border-indigo-200 border-t-brand-primary ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
