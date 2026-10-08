import Link from "next/link";

import { getAboutPage } from "@/lib/api";
import RichText from "@/app/components/RichText";

export default async function AboutPage() {
  const { data: about } =
    await getAboutPage();

  if (!about) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <p className="text-sm text-slate-500">
          About page content is unavailable.
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
            {about.title}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1] tracking-[-0.04em] text-white sm:text-7xl">
            {about.heroTitle}
            <br />
            <span className="text-slate-500">
              {about.heroHighlight}
            </span>
          </h1>

        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Our story
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
              {about.storyTitle}
            </h2>
          </div>

          <div>
            <RichText
              content={about.storyContent}
            />
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/[0.06] bg-[#07090c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">

          <div className="grid gap-12 md:grid-cols-3">

            <div>
              <span className="text-3xl font-black text-cyan-400">
                01
              </span>

              <h3 className="mt-6 text-xl font-bold text-white">
                {about.qualityTitle}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {about.qualityDescription}
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-cyan-400">
                02
              </span>

              <h3 className="mt-6 text-xl font-bold text-white">
                {about.simplicityTitle}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {about.simplicityDescription}
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-cyan-400">
                03
              </span>

              <h3 className="mt-6 text-xl font-bold text-white">
                {about.designTitle}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {about.designDescription}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:px-10">

        <h2 className="text-3xl font-black text-white sm:text-5xl">
          {about.ctaTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
          {about.ctaDescription}
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-black transition hover:bg-slate-200"
        >
          Explore Products →
        </Link>

      </section>
    </main>
  );
}