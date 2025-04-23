import { Puzzle } from "../entities/types";
import { PuzzleStorage } from "./PuzzleStorage";
import { mockPuzzles } from "../data/puzzles";

export class PuzzleManager {
    private puzzles: Puzzle[] = mockPuzzles;

    getAll(): Puzzle[] {
        return this.puzzles;
    }

    getByIndex(index: number): Puzzle | null {
        return this.puzzles[index] ?? null;
    }

    getCount(): number {
        return this.puzzles.length;
    }

    markCompleted(puzzleId: string) {
        PuzzleStorage.updateProgress(puzzleId, { completed: true });
    }

    useHint(puzzleId: string) {
        const progress = PuzzleStorage.getProgress();
        const prev = progress[puzzleId]?.hints_used || 0;
        PuzzleStorage.updateProgress(puzzleId, { hints_used: prev + 1 });
    }
}
