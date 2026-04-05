import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GHL_WEBHOOK_URL environment variable is not set");
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }

  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "";

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || "",
      tags: ["webinar-registered"],
      source: "Webinar Landing Page",
    }),
  });

  if (!response.ok) {
    console.error("GHL webhook failed:", response.status);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
