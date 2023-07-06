<script lang="ts">
	import { ShoppingCartIcon, SearchIcon, UserCircleIcon } from 'lucide-svelte';
</script>

<header class="grid w-full grid-cols-3 p-5">
	<img class="col-start-2 m-auto h-16" src="logo_roast_wh_v.png" alt="logo" srcset="" />
	<div class="mr-10 flex content-center items-center justify-end gap-8">
		<SearchIcon class="scale-125" />
		<UserCircleIcon class="scale-125" />
		<div class="relative">
			<!-- <Badge class="absolute left-2 top-[-1.2rem] bg-green-800 font-extrabold">{30}</Badge> -->
			<span class="absolute right-[-0.5rem] top-[-1.2rem] font-extrabold">{30}</span>
			<ShoppingCartIcon class="scale-125" />
		</div>
	</div>
</header>

<section class="grid w-full grid-cols-3 bg-gray-800 p-2">
	<div class="col-start-2 flex justify-evenly text-primary-foreground">
		<a href="/shop">Shop</a>
		<span>Locations</span>
		<span>Story</span>
		<span>Careers</span>
	</div>
</section>

<!-- class="flex flex-col justify-center w-full p-10 lg:px-20 lg:py-10 2xl:ml-52 relative text-center lg:text-left lg:w-5/12 order-1" -->

<section>
	<div class="flex w-full bg-red-400">
		<div class="m-10 flex w-full flex-col justify-center lg:w-5/12">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
			<h2 class="scroll-m-20 pb-2 text-6xl font-thin tracking-tight transition-colors first:mt-0">
				DON PEPE HONEY GESHA Farmlevel Reserve
			</h2>
			<span
				>This Costa Rican Gesha is delicate, candied, and tart, with the aromas of an early summer
				flower harvest.</span
			>
		</div>
		<img class="w-full lg:w-7/12" src="test.webp" alt="" srcset="" />
	</div>
</section>
