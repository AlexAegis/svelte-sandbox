<script lang="ts">
	import { version } from '../../package.json';
	import DigitDisplay from './components/digit-display.svelte';
	import Menu from './components/menu.svelte';
	import Panel from './components/panel.svelte';
	import Playfield from './components/playfield.svelte';
	import Smiley from './components/smiley.svelte';
	import TitleBar from './components/title-bar.svelte';
	import type { Field, MinesweeperGame } from './core';
	import { assetMap } from './core';
	import { elapsedTime$, gamePreset$, remainingMines$, winHistory$ } from './store';

	let game!: MinesweeperGame<Field>;

	$winHistory$; // keep a subscription alive on game level to keep the refCount

</script>

<div class="panel outer outset">
	<TitleBar title="Svelte Minesweeper v{version}" icon={assetMap.mine} />
	<div class="panel game padded">
		<Menu />
		<Panel class="panel inset padded">
			<DigitDisplay value={$remainingMines$} paddedLength={3} />
			<Smiley on:click={() => game.reset()} />
			<DigitDisplay value={$elapsedTime$} paddedLength={3} />
		</Panel>
		<Playfield class="panel inset" bind:game gamePreset={$gamePreset$} />
	</div>
</div>

<style>
	.outer {
		display: grid;
		height: fit-content;
		width: fit-content;
		margin: auto;
		grid-template-rows: auto auto;
		user-select: none;
	}

	.game {
		display: grid;
		grid-auto-rows: 1fr;
		grid-auto-columns: 1fr;
		height: fit-content;
		width: fit-content;
		box-sizing: border-box;
		grid-template-rows: auto 5em auto;
	}

</style>
