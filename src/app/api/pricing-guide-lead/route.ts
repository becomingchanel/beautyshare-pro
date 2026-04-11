// app/api/pricing-guide-lead/route.ts
// Next.js route handler that receives the form submission and forwards
// it to your GHL inbound webhook. Wire this up once and the landing page
// will start feeding leads straight into your BSP CRM automation.

import { NextResponse } from "next/server";

// Set this in your Vercel project env vars, NOT in the code
// GHL_PRICING_GUIDE_WEBHOOK=https://services.leadconnectorhq.com/hooks/xxxxx
const GHL_WEBHOOK = process.env.GHL_PRICING_GUIDE_WEBHOOK;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, email, phone, source } = body;

    if (!email || !firstName || !phone) {
      return NextResponse.json({ error: "Missing required fields (first name, email, phone)" }, { status: 400 });
    }

    // Forward to GHL — this fires your pricing-guide email automation
    if (GHL_WEBHOOK) {
      await fetch(GHL_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          email,
          phone,
          source: source || "pricing-guide",
          tags: ["pricing-guide-lead", "bsp-prospect"],
          custom_fields: {
            download_requested: "BSP_Raw_Hair_Pricing_Playbook",
            download_date: new Date().toISOString(),
          },
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("pricing-guide-lead error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
