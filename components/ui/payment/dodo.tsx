import DodoPayments from 'dodopayments';
import { redirect } from 'next/navigation';

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode', // defaults to 'live_mode'
});

async function main() {
  const session = await client.checkoutSessions.create({
    product_cart: [
      { product_id: 'prod_subscription_monthly', quantity: 1 }
    ],
    // Optional: configure trials for subscription products
    subscription_data: { trial_period_days: 14 },
    customer: {
      email: 'subscriber@example.com',
      name: 'Jane Doe',
    },
    return_url: 'https://example.com/success',
  });

  redirect(`${session.checkout_url}`);  
}

main();