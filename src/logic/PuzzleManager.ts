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

    useHint(puzzleId: string, index: number) {
        const progress = PuzzleStorage.getProgress();
        const prev = progress[puzzleId]?.hints_used || 0;

        // Store max(index + 1, existing)
        const used = Math.max(prev, index + 1);

        PuzzleStorage.updateProgress(puzzleId, { hints_used: used });
    }

}
