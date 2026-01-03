import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { createClient } from "@/libs/supabase/server";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,  
});

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await client.checkoutSessions.create({
    product_cart: [
      {
        product_id: process.env.DODO_PAYMENTS_PRODUCT_ID!,
        quantity: 1,
      },
    ],
    customer: {
      email: user.email!,
      name: user.email!,
    },
    metadata: {
      user_id: user.id, // 🔑 critical
      product_id: process.env.DODO_PAYMENTS_PRODUCT_ID!
    },
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({
    checkoutUrl: session.checkout_url,
  });
}