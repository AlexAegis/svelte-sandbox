<script lang="ts">
	export let value: number;

	$: lastDigit = value % 10;

</script>

<div>
	<span
		style="grid-column: 2; grid-row: 1;"
		class:on={lastDigit === 0 || lastDigit === 2 || lastDigit === 3 || lastDigit >= 5}
		class="segment-horizontal segment-top off"
	/>
	<span
		style="grid-column: 1; grid-row: 2;"
		class:on={lastDigit === 0 ||
			(lastDigit >= 4 && lastDigit <= 6) ||
			lastDigit >= 8 ||
			lastDigit === 9}
		class="segment-vertical segment-left off"
	/>
	<span
		style="grid-column: 3; grid-row: 2;"
		class:on={lastDigit <= 4 || lastDigit >= 7}
		class="segment-vertical segment-right off"
	/>
	<span
		style="grid-column: 2; grid-row: 3;"
		class:on={isNaN(lastDigit) || (lastDigit >= 2 && lastDigit <= 6) || lastDigit >= 8}
		class="segment-horizontal segment-center off"
	/>
	<span
		style="grid-column: 1; grid-row: 4;"
		class:on={lastDigit === 0 || lastDigit === 2 || lastDigit === 6 || lastDigit === 8}
		class="segment-vertical segment-left off"
	/>
	<span
		style="grid-column: 3; grid-row: 4;"
		class:on={lastDigit <= 1 || lastDigit >= 3}
		class="segment-vertical segment-right off"
	/>
	<span
		style="grid-column: 2; grid-row: 5;"
		class:on={!isNaN(lastDigit) && lastDigit !== 1 && lastDigit !== 4 && lastDigit !== 7}
		class="segment-horizontal segment-bottom off"
	/>
</div>

<style>
	.segment-vertical {
		width: 5px;
		height: 20px;
	}

	.segment-horizontal {
		width: 20px;
		height: 5px;
	}

	.segment-top {
		clip-path: polygon(0 0, 100% 0, var(--high-angle) 100%, var(--low-angle) 100%);
	}

	.segment-center {
		height: 6px;
		clip-path: polygon(
			var(--low-angle) 0,
			var(--high-angle) 0,
			100% 50%,
			var(--high-angle) 100%,
			var(--low-angle) 100%,
			0% 50%
		);
	}

	.segment-bottom {
		clip-path: polygon(var(--low-angle) 0, var(--high-angle) 0, 100% 100%, 0% 100%);
	}

	.segment-left {
		clip-path: polygon(0 0, 100% var(--low-angle), 100% var(--high-angle), 0% 100%);
	}

	.segment-right {
		clip-path: polygon(0 var(--low-angle), 100% 0, 100% 100%, 0 var(--high-angle));
	}

	.off:not(.on) {
		background-image: radial-gradient(#8c0000 35%, transparent var(--low-angle));
		background-color: #240100;
		background-position: 0px 0, 37px 39px;
		background-size: 2px 2px;
	}

	.on {
		background-color: red;
	}

	div {
		width: 22px;
		height: 42px;
		background-color: black;
		display: grid;

		grid-template-columns: 1px 16px 5px;
		grid-template-rows: 1px 17px 3px 16px 1px;

		padding: 1px;

		--low-angle: 25%;
		--high-angle: calc(100% - var(--low-angle));
	}

	span {
		z-index: 10;
	}

</style>
