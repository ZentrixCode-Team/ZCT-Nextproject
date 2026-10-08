export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#05070a] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl animate-pulse">

        <div className="mb-10">
          <div className="h-3 w-24 rounded-full bg-white/[0.06]" />
          <div className="mt-4 h-10 w-72 rounded-xl bg-white/[0.06]" />
          <div className="mt-4 h-4 w-96 max-w-full rounded-full bg-white/[0.04]" />
        </div>

        <div className="mb-6 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6">
          <div className="h-5 w-40 rounded-lg bg-white/[0.06]" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="h-20 rounded-2xl bg-white/[0.03]" />
            <div className="h-20 rounded-2xl bg-white/[0.03]" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-56 rounded-3xl bg-white/[0.025]" />
          <div className="h-56 rounded-3xl bg-white/[0.025]" />
          <div className="h-56 rounded-3xl bg-white/[0.025]" />
        </div>

      </div>
    </main>
  );
}