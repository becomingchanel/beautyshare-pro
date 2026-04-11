// components/HomepagePricingGuideSection.tsx
// Drop this into your Next.js app and import from app/page.tsx, placed
// above your footer. Uses Cormorant Garamond (display) + Outfit (body)
// fonts already loaded by your site.
//
// Usage:
//   import PricingGuideSection from "@/components/HomepagePricingGuideSection";
//   <PricingGuideSection />

import Link from "next/link";

export default function PricingGuideSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Diagonal orange accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-64 bg-[#FA6A27]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
      />
      {/* Soft gradient wash */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D61465]/10 rounded-full blur-3xl" />
      <div className="absolute top-20 left-1/3 w-3 h-3 rounded-full bg-[#E2AD37]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left: real PDF cover image */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#FA6A27] via-[#D61465] to-[#DCBDEF] rounded-2xl blur-3xl opacity-40" />
              <img
                src="/images/pricing-guide-cover.png"
                alt="The Raw Hair Pricing Playbook — free 8-page guide"
                className="relative w-64 h-auto rounded-md shadow-2xl ring-1 ring-[#FA6A27]/30"
                style={{ transform: "rotate(-4deg) perspective(1000px) rotateY(-8deg)" }}
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FA6A27] text-white text-[10px] tracking-[0.2em] font-sans font-bold uppercase px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Free · 8 Pages
              </div>
            </div>
          </div>

          {/* Right: copy + CTA */}
          <div className="md:col-span-3">
            <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase mb-4">
              Free Download
            </p>

            <h2 className="font-display text-5xl md:text-6xl font-bold leading-[1.0] mb-6 text-white">
              See the prices <em className="text-[#FA6A27]">before</em>
              <br />
              you join.
            </h2>

            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              We get it &mdash; you want to know what you&apos;re getting before you
              commit. Grab our free pricing playbook and see exactly what BSP charges
              for raw hair, compared side-by-side with five of the top brands on the
              market.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-sm text-white/80">
              {[
                "Verified competitor prices",
                "Profit-per-bundle breakdown",
                "Real earnings scenarios",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA6A27]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/pricing-guide"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-md bg-gradient-to-r from-[#FA6A27] to-[#D61465] text-white font-bold text-base uppercase tracking-wide hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-2xl shadow-[#FA6A27]/30"
            >
              Get The Free Playbook
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="mt-5 text-white/40 text-sm">
              No spam. Just the playbook and an invite to our weekly webinar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
