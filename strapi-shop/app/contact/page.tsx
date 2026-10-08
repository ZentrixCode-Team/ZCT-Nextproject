import Link from "next/link";

import { getContactPage } from "@/lib/api";

export default async function ContactPage() {
  const { data: contact } =
    await getContactPage();

  if (!contact) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <p className="text-sm text-slate-500">
          Contact page content is unavailable.
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
            Contact
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] text-white sm:text-7xl">
            {contact.title}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            {contact.description}
          </p>

        </div>
      </section>

      {/* Contact Information + Form */}
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">

        {/* Contact Information */}
        <div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
            {contact.formTitle}
          </p>

          <div className="mt-8 space-y-7">

            {/* Email */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Email
              </p>

              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                {contact.email}
              </a>
            </div>

            {/* Response Time */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Response time
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {contact.responseTime}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Location
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {contact.location}
              </p>
            </div>

          </div>
        </div>

        {/* Form */}
        <form
  className="rounded-3xl border border-white/[0.07] bg-[#090c10] p-6 sm:p-8"
>

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-slate-400"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder={
                  contact.namePlaceholder
                }
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-slate-400"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder={
                  contact.emailPlaceholder
                }
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
              />
            </div>

          </div>

          {/* Message */}
          <div className="mt-6">

            <label
              htmlFor="message"
              className="mb-2 block text-xs font-medium text-slate-400"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={7}
              placeholder={
                contact.messagePlaceholder
              }
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 h-12 rounded-full bg-white px-7 text-sm font-bold text-black transition hover:bg-slate-200"
          >
            {contact.buttonText}
          </button>

        </form>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.06] py-16 text-center">

        <p className="text-sm text-slate-500">
          {contact.bottomText}
        </p>

        <Link
          href="/shop"
          className="mt-3 inline-block text-sm font-bold text-cyan-400 transition-colors hover:text-cyan-300"
        >
          {contact.bottomLinkText}
        </Link>

      </section>
    </main>
  );
}