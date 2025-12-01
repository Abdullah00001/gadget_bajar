import jwt from 'jsonwebtoken';
const SECRET = process.env.MOCK_PAYMENT_SECRET ?? 'mock_secret';

export function createMockStripePaymentIntent(orderId: string, amount: number) {
  const paymentId = `pi_${Math.random().toString(36).slice(2, 10)}`;
  const clientSecret = `cs_${Math.random().toString(36).slice(2, 12)}`;
  const signature = jwt.sign({ orderId }, SECRET, { expiresIn: '1h' });
  const payload = {
    event: 'payment_intent.succeeded',
    orderId,
    paymentId,
    amount,
    webhookSignature: signature,
  };
  return {
    paymentId,
    clientSecret,
    webhookPayload: payload,
  };
}

export function createMockPaypalOrder(orderId: string, amount: number) {
  const paymentId = `pp_${Math.random().toString(36).slice(2, 10)}`;
  const approvalUrl = `https://mock.paypal/checkout?token=${paymentId}`;

  const signature = jwt.sign({ orderId }, SECRET, { expiresIn: '1h' });
  const payload = {
    event: 'checkout.order.approved',
    orderId,
    paymentId,
    amount,
    webhookSignature: signature,
  };
  return {
    paymentId,
    approvalUrl,
    webhookPayload: payload,
  };
}

export function verifyMockWebhook(signatureToken: string) {
  try {
    const data = jwt.verify(signatureToken, SECRET);
    return { valid: true, data };
  } catch (err) {
    return { valid: false, error: err };
  }
}
