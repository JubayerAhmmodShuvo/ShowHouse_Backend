// payment.service.ts

import Stripe from 'stripe';
import { PaymentDTO } from './payment.interface';
import PaymentModel from './payment.model';

const stripeApiKey = process.env.STRIPE_KEY;

if (!stripeApiKey) {
  throw new Error('Stripe API key is not defined.');
}

const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2023-10-16',
});

const createPayment = async (
  paymentDTO: PaymentDTO
): Promise<string | null> => {
  try {
    console.log('Received paymentDTO:', paymentDTO);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentDTO.price * 100),
      currency: 'usd',
    });

    console.log('PaymentIntent details:', paymentIntent);

    if (paymentIntent.client_secret) {
      const clientSecret = paymentIntent.client_secret;
      console.log('Client Secret:', clientSecret);

      if (paymentIntent.status === 'succeeded') {
        const payment = new PaymentModel(paymentDTO);
        await payment.save();
        console.log('Payment saved successfully!');
      }

      return clientSecret;
    } else {
      console.error('Failed to retrieve client_secret.');
      throw new Error('Failed to confirm payment');
    }
  } catch (error) {
    console.error('Error during payment creation:', error);
    throw new Error('Failed to create payment');
  }
};


export const PaymentService = {
  createPayment,
};
