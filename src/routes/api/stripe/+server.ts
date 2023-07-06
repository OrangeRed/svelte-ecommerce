import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

import { z } from 'zod';

import type { RequestHandler } from '@sveltejs/kit';
// import type { Cart } from '$store/cart';

const validator = z.object({
	items: z.record(z.string(), z.number())
});

export type Cart = z.infer<typeof validator>;

export const POST: RequestHandler = async ({ request }) => {
	const data = validator.parse(await request.json());

	const lineItems = Object.entries(data.items).reduce((lineItems, [id, quantity]) => {
		lineItems.push({
			price: id,
			quantity
		});

		return lineItems;
	}, [] as Stripe.Checkout.SessionCreateParams.LineItem[]);

	// const session = await stripe.checkout.sessions.create({
	// 	line_items: lineItems,
	// 	mode: 'payment',
	// 	success_url: 'https://localhost:5173/success',
	// 	cancel_url: 'https://localhost:5173/'
	// });

	// return new Response(JSON.stringify({ url: session.url }), {
	// 	status: 200,
	// 	headers: { 'content-type': 'application/json' }
	// });

	return new Response(JSON.stringify({ response: lineItems }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
