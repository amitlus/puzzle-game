type ProgressEntry = { completed?: boolean; hints_used?: number };
type ProgressMap = Record<string, ProgressEntry>;

export class PuzzleStorage {
    private static key = "puzzleProgress";

    static getProgress(): ProgressMap {
        try {
            return JSON.parse(localStorage.getItem(this.key) || "{}");
        } catch {
            return {};
        }
    }

    static updateProgress(id: string, updates: ProgressEntry) {
        const progress = this.getProgress();
        progress[id] = { ...progress[id], ...updates };
        localStorage.setItem(this.key, JSON.stringify(progress));
    }
}
