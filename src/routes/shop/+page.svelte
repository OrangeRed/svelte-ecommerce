<script lang="ts">
	import { goto } from '$app/navigation';
	import ProductCard from '$components/ProductCard.svelte';
	import Button from '$components/ui/button/Button.svelte';

	import type { CheckoutPostResponse } from '$routes/api/checkout/+server.js';

	import { cart } from '$store/cart.js';
	$: cartSize = Object.values($cart).reduce((total, quantity) => (total += quantity), 0);

	export let data;
	const { products } = data;

	async function checkout() {
		const data: CheckoutPostResponse = await fetch('api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items: $cart
			})
		}).then((response) => response.json());

		goto(data.session_url);
	}
</script>

<div class="grid w-full grid-cols-3 gap-4">
	{#each products as product}
		<ProductCard {product} />
	{/each}

	<div class="col-span-3 flex justify-center">
		{#if cartSize !== 0}
			<Button on:click={() => checkout()}
				>Checkout {cartSize} {cartSize === 1 ? 'item' : 'items'}</Button
			>
		{/if}
	</div>
</div>
