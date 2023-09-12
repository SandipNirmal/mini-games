<script lang="ts">
	import { getRandomImages, shuffle } from '$lib/utils/util';

	type Level = {
		name: string;
		item_count: number;
		grid_size: number;
	};

	type Block = {
		name: string;
		icon: string;
		selected: boolean;
		matched: boolean;
	};

	type Game = {
		total: number;
		matched: number;
		blocks: Block[];
		currentSelection: Block[];
	};

	const LEVELS: Record<string, Level> = {
		EASY: {
			name: 'easy',
			item_count: 8,
			grid_size: 4
		},
		MEDIUM: {
			name: 'medium',
			item_count: 18,
			grid_size: 6
		},
		HARD: {
			name: 'hard',
			item_count: 32,
			grid_size: 8
		}
	};

	const GAME_STATE = {
		RUNNING: 'running',
		OVER: 'over'
	};

	export let level = LEVELS.EASY;
	let itemCount = level.item_count;
	let images: string[];

	let blockArr: Block[][];
	let currentSelection: Record<string, number>[] = [];
	let score = 0;
	let gameState = GAME_STATE.RUNNING;
	let disableClick = false;

	// Start, Restart Game
	function start() {
		blockArr = [];
		gameState = GAME_STATE.RUNNING;
		score = 0;
		itemCount = level.item_count;

		images = getRandomImages(itemCount);
		images = [...images, ...images];
		const shuffledImages = shuffle(images);

		for (let i = 0; i < level.grid_size; i++) {
			blockArr.push([]);
			for (let j = 0; j < level.grid_size; j++) {
				const index = level.grid_size * i + j;
				const img = shuffledImages[index];
				const item = {
					name: img,
					icon: img,
					selected: false,
					matched: false
				};
				blockArr[i].push(item);
			}
		}

		disableClick = false;
	}

	/**
	 * Reveal selected item
	 */
	function reveal(i: number, j: number): void {
		if (disableClick || blockArr[i][j].selected) return;

		blockArr[i][j].selected = true;
		handleAnswering(i, j);
	}

	/**
	 * Handles answering and scoring
	 */
	function handleAnswering(i: number, j: number): void {
		const val = { name: blockArr[i][j].name, row: i, col: j };
		currentSelection.push(val);

		// reveal selection before hiding it
		let timer;

		if (currentSelection.length === 2) {
			disableClick = true;

			timer = setTimeout(() => {
				const first = currentSelection[0];
				const second = currentSelection[1];

				if (first.name === second.name) {
					score += 1;
					blockArr[first.row][first.col].matched = true;
					blockArr[second.row][second.col].matched = true;

					if (score === itemCount) {
						gameState = GAME_STATE.OVER;
						disableClick = true;
					}
				} else {
					blockArr[first.row][first.col].selected = false;
					blockArr[second.row][second.col].selected = false;
				}

				currentSelection = [];
				disableClick = false;
			}, 300);
		}
	}

	/**
	 * Handles level selection and restarts the level
	 */
	function changeLevel(e: any) {
		//fix event type
		level = LEVELS[e.target.value];

		start();
	}

	// start the game
	start();
</script>

<svelte:head>
	{#each images as image}
		<link rel="preload" as="image" href={`/assets/animals/${image}.svg`} />
	{/each}
</svelte:head>

<section>
	<div class="flex justify-between mt-6">
		<div class="flex">
			<h4 class="font-medium">Change Level:</h4>
			<select on:change={changeLevel}>
				{#each Object.keys(LEVELS) as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>
		<h4 class="font-medium text-lg">Score: {score} / {itemCount}</h4>
	</div>

	<div class="bg-gray-200 p-2 shadow-xl rounded mt-4 mb-8 relative">
		{#each blockArr as block, i}
			<div class="flex">
				{#each block as img, j}
					<button on:click={() => reveal(i, j)}>
						{#if img.selected || img.matched}
							<img
								src={`/assets/animals/${img.icon}.svg`}
								alt={img.name}
								class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border shadow m-1"
							/>
						{:else}
							<div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border shadow m-1 bg-white" />
						{/if}
					</button>
				{/each}
			</div>
		{/each}

		{#if gameState === GAME_STATE.OVER}
			<div class="absolute h-full w-full flex justify-center items-center z-10 top-0 left-0">
				<h2 class="text-red-600 font-bold text-xl bg-red-50 opacity-70 py-2 w-full text-center">
					Game Over
				</h2>
			</div>
		{/if}
	</div>

	<div class="flex justify-center">
		<button
			on:click={start}
			class="rounded-md bg-slate-500 text-white font-semibold px-4 py-2 shadow-md">Restart</button
		>
	</div>
</section>
