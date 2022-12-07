<script lang="ts">
	import Game from './Game.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center items-center">
	<h1>Memory Game</h1>
	<div>
		<Game />
	</div>
</section>
