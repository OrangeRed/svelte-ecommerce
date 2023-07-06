import { writable, get } from 'svelte/store';

type Cart = Record<string, number>;

const cartStore = writable<Cart>({});

export function addToCart(id: string) {
	const cart = get(cartStore);

	if (id in cart) {
		cart[id]++;
	} else {
		cart[id] = 1;
	}

	cartStore.update(() => cart);
}

export function removeFromCart(id: string) {
	const cart = get(cartStore);

	if (id in cart && cart[id] !== 1) {
		cart[id]--;
	} else if (cart[id] === 1) {
		delete cart[id];
	}

	cartStore.update(() => cart);
}

export { cartStore as cart, type Cart };
