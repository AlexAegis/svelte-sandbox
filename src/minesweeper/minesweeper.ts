export class Coordinate {
	constructor(public readonly x: number, public readonly y: number) {}

	static random(xMin: number, xMax: number, yMin: number, yMax: number): Coordinate {
		return new Coordinate(rand(xMin, xMax), rand(yMin, yMax));
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}

	equal(other: Coordinate): boolean {
		return this.x === other.x && this.y === other.y;
	}
}

export function rand(min: number, max: number): number {
	return Math.floor(min + Math.random() * max);
}

export const directions = {
	NORTH: new Coordinate(0, 1),
	NORTHEAST: new Coordinate(1, 1),
	EAST: new Coordinate(1, 0),
	SOUTHEAST: new Coordinate(1, -1),
	SOUTH: new Coordinate(0, -1),
	SOUTHWEST: new Coordinate(-1, -1),
	WEST: new Coordinate(-1, 0),
	NORTHWEST: new Coordinate(-1, 1),
};

export type Mine = 'M';
export class MinesweeperGame {
	mines = new Map<string, Coordinate>();
	totalRevealed = new Map<string, Coordinate>();
	mineField!: (Mine | number)[][];
	fieldCount = this.x * this.y;

	constructor(
		public readonly x: number,
		public readonly y: number = x,
		public readonly mineCount: number,
		public start: Coordinate
	) {
		if (start.x > x || start.y > y || start.x < 0 || start.y < 0) {
			throw new Error('Start tile out of field');
		}

		this.generate();
	}

	public haveWon(): boolean {
		return this.fieldCount === this.totalRevealed.size + this.mines.size;
	}

	public getValueOfTile(x: number, y: number): Mine | number {
		return this.mineField[x][y];
	}

	private generate(): void {
		// Preinitialize the field
		this.mineField = [];
		for (let x = 0; x < this.x; x++) {
			const row: number[] = [];
			for (let y = 0; y < this.y; y++) {
				row[y] = 0;
			}
			this.mineField[x] = row;
		}
		// Generate mine locations until there is enough, while skipping the start location
		while (this.mines.size < this.mineCount) {
			const coord = Coordinate.random(0, this.x, 0, this.y);
			if (!coord.equal(this.start)) {
				this.mines.set(coord.toString(), coord);
				this.mineField[coord.x][coord.y] = 'M';
			}
		}
		// Add it's influence of every mine to it's surrounding fields
		for (const [, mineLocation] of this.mines) {
			for (const direction of Object.values(directions)) {
				const x = mineLocation.x + direction.x;
				const y = mineLocation.y + direction.y;
				const row = this.mineField[x];
				if (row) {
					const field = row[y];
					if (typeof field === 'number') {
						row[y] = field + 1;
					}
				}
			}
		}
	}

	public reveal(x: number, y: number, revealed = new Set<string>()): Coordinate[] {
		const coord = new Coordinate(x, y);
		const coordStr = coord.toString();
		const field = this.mineField[x]?.[y];

		if (field !== undefined && !revealed.has(coordStr)) {
			revealed.add(coordStr);
			if (field === 'M') {
				throw [...this.mines.values()];
			}
			const revealThese = [new Coordinate(x, y)];
			if (field === 0) {
				for (const direction of Object.values(directions)) {
					revealThese.push(...this.reveal(x + direction.x, y + direction.y, revealed));
				}
			}
			// Tracking every revealed field
			for (const r of revealThese) {
				this.totalRevealed.set(r.toString(), r);
			}

			return revealThese;
		} else return [];
	}
}
