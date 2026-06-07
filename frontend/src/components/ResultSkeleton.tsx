"use client";

export function ResultSkeleton() {
  return (
    <section className="card-surface space-y-6 rounded-2xl p-5 sm:p-6 md:p-8">
      <div className="space-y-3 border-b border-brand-border pb-5">
        <div className="h-3 w-16 max-w-full animate-pulse rounded bg-indigo-100" />
        <div className="h-9 w-56 max-w-[min(100%,14rem)] animate-pulse rounded-lg bg-indigo-100/80" />
      </div>

      <div className="space-y-3">
        <div className="h-3 w-20 max-w-full animate-pulse rounded bg-slate-200" />
        <div className="space-y-2">
          <div className="h-12 w-full max-w-full animate-pulse rounded-input bg-slate-100" />
          <div className="h-12 w-full max-w-full animate-pulse rounded-input bg-slate-100" />
        </div>
      </div>

      <div className="space-y-3 rounded-card border border-indigo-100 bg-brand-gradient-subtle p-5">
        <div className="h-3 w-24 max-w-full animate-pulse rounded bg-indigo-100" />
        <div className="space-y-2">
          <div className="h-4 w-full max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[95%] max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[88%] max-w-full animate-pulse rounded bg-slate-200/80" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-3 w-28 max-w-full animate-pulse rounded bg-slate-200" />
        <div className="space-y-3">
          <div className="h-16 w-full max-w-full animate-pulse rounded-card bg-slate-100" />
          <div className="h-16 w-full max-w-full animate-pulse rounded-card bg-slate-100" />
          <div className="h-16 w-full max-w-full animate-pulse rounded-card bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
