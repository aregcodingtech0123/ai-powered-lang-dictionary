"use client";

export function ResultSkeleton() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg sm:p-6 md:bg-white/60 md:shadow-xl md:backdrop-blur-md">
      <div className="space-y-2">
        <div className="h-3 w-16 max-w-full animate-pulse rounded bg-slate-200/80" />
        <div className="h-8 w-56 max-w-[min(100%,14rem)] animate-pulse rounded bg-slate-200/80" />
      </div>

      <div className="space-y-3">
        <div className="h-3 w-20 max-w-full animate-pulse rounded bg-slate-200/80" />
        <div className="space-y-2">
          <div className="h-4 w-full max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[92%] max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[85%] max-w-full animate-pulse rounded bg-slate-200/80" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-3 w-24 max-w-full animate-pulse rounded bg-slate-200/80" />
        <div className="space-y-2">
          <div className="h-4 w-full max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[95%] max-w-full animate-pulse rounded bg-slate-200/80" />
          <div className="h-4 w-[88%] max-w-full animate-pulse rounded bg-slate-200/80" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-3 w-28 max-w-full animate-pulse rounded bg-slate-200/80" />
        <div className="space-y-3">
          <div className="h-14 w-full max-w-full animate-pulse rounded-xl bg-slate-200/80" />
          <div className="h-14 w-full max-w-full animate-pulse rounded-xl bg-slate-200/80" />
          <div className="h-14 w-full max-w-full animate-pulse rounded-xl bg-slate-200/80" />
        </div>
      </div>
    </section>
  );
}
