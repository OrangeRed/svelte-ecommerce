<script lang="ts">
	import { Button } from './ui/button';
	import { Badge } from './ui/badge';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

	import type { Product } from '$routes/+page.server';

	import { cart, addToCart, removeFromCart } from '$store/cart';
	export let product: Product;
</script>

<Card class="bg-gray-400">
	<CardHeader>
		<CardTitle>
			<div class="relative">
				{product.name}
				{#if product.id in $cart}
					<Badge class="absolute bottom-0 bg-green-800">{$cart[product.id]}</Badge>
				{/if}
			</div>
		</CardTitle>
		<CardDescription>{product.id}</CardDescription>
	</CardHeader>
	<CardContent>
		Unit Price: {(product.price / 100).toLocaleString('en-US', {
			style: 'currency',
			currency: product.currency
		})}
	</CardContent>
	<CardFooter>
		<Button class="w-full bg-primary" on:click={() => addToCart(product.id)}>Add to cart</Button>
		<Button class="w-full bg-destructive" on:click={() => removeFromCart(product.id)}>
			Remove from cart
		</Button>
	</CardFooter>
</Card>
