import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15', typescript: true });

import type { PageServerLoad } from './$types';

export type Product = {
	id: string;
	name: string;
	price: number;
	currency: string;
};

export const load: PageServerLoad = async () => {
	const { data } = await stripe.products.list({ expand: ['data.default_price'] });

	const products = data.reduce((products, currentProduct) => {
		const price = currentProduct.default_price;

		// Type guards
		if (!price || typeof price === 'string') {
			return products;
		}

		if (price.billing_scheme === 'per_unit') {
			products.push({
				id: currentProduct.id,
				name: currentProduct.name,
				price: price.unit_amount!,
				currency: price.currency
			});
		}

		return products;
	}, [] as Product[]);

	return { products };
};
