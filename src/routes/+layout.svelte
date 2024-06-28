<script lang="ts">
	import Bottom from '$lib/components/Bottom.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>PPDB Point APP</title>
</svelte:head>
<div class="min-h-screen flex flex-col">
	<Navbar />
	<slot />
	<Bottom />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
