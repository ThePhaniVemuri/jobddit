export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/libs/supabase/supabase-admin";

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!);

type PaymentWebhookData = {
  event_type?: string;
  type?: string;

  id?: string;
  payment_id?: string;

  customer?: {
    email?: string;
  };

  customer_email?: string;

  metadata?: {
    user_id?: string;
    product_id?: string;
  };

  amount_total?: number;
  currency?: string;
};


// Webhook to handle payment confirmations from Dodo Payments
export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const rawBody = await request.text();

    // ✅ Verify webhook signature
    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);

    const body = JSON.parse(rawBody);
    const eventType = body.event_type || body.type;

    // 🎯 Only one-time payment success matters
    if (
      eventType === "payment.succeeded" ||
      eventType === "checkout.session.completed"
    ) {
      await handleOneTimePaymentSuccess(body);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Dodo webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleOneTimePaymentSuccess(data: PaymentWebhookData) {
  // 🔑 user_id MUST come from metadata (set during checkout)
  const userId = data.metadata?.user_id;
  const email = data.customer?.email || data.customer_email;
  const paymentId = data.payment_id || data.id;

  if (!userId || !paymentId) {
    console.error("Missing user_id or payment_id in webhook");
    return;
  }

  // ✅ Idempotency check
  const { data: existing } = await supabaseAdmin
    .from("user_purchases")
    .select("id")
    .eq("checkout_session_id", paymentId)
    .maybeSingle();

  if (existing) {
    // Payment already processed
    return;
  }

  // ✅ Insert purchase record
  await supabaseAdmin.from("user_purchases").insert({
    user_id: userId,
    email,
    product_id: data.metadata?.product_id || "prod_onetime_3usd",

    checkout_session_id: paymentId,

    amount: data.amount_total ?? 300,
    currency: data.currency ?? "USD",

    status: "paid",
  });
}
