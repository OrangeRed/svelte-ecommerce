import { z } from 'zod';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { createCheckoutSession } from '$lib/server/checkout';

const validator = z.object({
	items: z.record(z.string(), z.number())
});

// Middleware to generate the response typedef
const createResponse = async (data: z.infer<typeof validator>) => {
	return {
		session_url: await createCheckoutSession(data.items)
	};
};

export const POST: RequestHandler = async ({ request }) => {
	const data = validator.parse(await request.json());

	const response = await createResponse(data);

	return json(response);
};

export type CheckoutPostResponse = Awaited<ReturnType<typeof createResponse>>;
