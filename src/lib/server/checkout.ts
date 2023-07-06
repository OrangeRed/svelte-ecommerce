import type Stripe from 'stripe';
import { stripe } from './_stripe';

export async function createCheckoutSession(items: Record<string, number>) {
	const lineItems = Object.entries(items).reduce((lineItems, [id, quantity]) => {
		lineItems.push({
			price: id,
			quantity
		});

		return lineItems;
	}, [] as Stripe.Checkout.SessionCreateParams.LineItem[]);

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'https://localhost:5173/success',
		cancel_url: 'https://localhost:5173/'
	});

	if (!session.url) {
		throw new Error('Could not generate Stripe URL');
	}

	return session.url;
}
