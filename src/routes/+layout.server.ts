import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

import type { LayoutServerLoad } from './$types';

export type Product = {
	id: string;
	name: string;
	price: number;
	currency: string;
};

export const load: LayoutServerLoad = async () => {
	const { data } = await stripe.prices.list({ expand: ['data.product'] });

	const prices = data.reduce((prices, currentPrice) => {
		const { name } = currentPrice.product as Stripe.Product;

		if (currentPrice.billing_scheme === 'per_unit') {
			prices.push({
				name: name,
				id: currentPrice.id,
				price: currentPrice.unit_amount!,
				currency: currentPrice.currency
			});
		}

		return prices;
	}, [] as Product[]);

	return { products: prices };
};
