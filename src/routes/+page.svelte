<script lang="ts">
	import { Button } from '$components/ui/button';
	import ProductCard from '$components/ProductCard.svelte';

	import { cart } from '$routes/_store/cart.js';
	$: cartSize = Object.values($cart).reduce((total, item) => (total += item), 0);

	export let data;
	const { products } = data;

	// TODO
	async function checkout() {}
</script>

<div class="mx-auto flex h-full flex-col items-center justify-center">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<div class="grid w-full grid-cols-3 gap-4">
		<div class="col-span-3 flex justify-center">
			<h1>Sveltekit 1.0 store</h1>
		</div>

		{#each products as product}
			<ProductCard {product} />
		{/each}

		<div class="col-span-3 flex justify-center">
			{#if cartSize !== 0}
				<!-- content here -->
				<Button on:click={() => checkout()}
					>Checkout {cartSize} {cartSize === 1 ? 'item' : 'items'}</Button
				>
			{/if}
		</div>
	</div>
</div>
