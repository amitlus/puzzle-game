export type PuzzleType = "logic" | "visual" | "cipher" | "motion" | "sequence";

export interface Puzzle {
    id: string;
    title: string;
    story_text: string;
    puzzle_type: PuzzleType;
    content: string;
    image_url?: string;
    answer: string;
    hints: string[];
    order: number;
}

export interface Progress {
    puzzle_id: string;
    completed?: boolean;
    attempts?: number;
    hints_used?: number;
}
