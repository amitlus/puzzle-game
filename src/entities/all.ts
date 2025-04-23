import { Puzzle, Progress } from "./types";

export const PuzzleAPI = {
    list: async (): Promise<Puzzle[]> => [
        {
            id: "1",
            title: "The First Puzzle",
            story_text: "You found a strange encrypted note...",
            puzzle_type: "cipher",
            answer: "echo",
            image_url: "",
            hints: ["Try thinking like a signal...", "It's something you hear."],
            order: 1,
        },
    ],
};

export const ProgressAPI = {
    filter: async (): Promise<Progress[]> => [],
    create: async (progress: Progress): Promise<void> => {},
    update: async (id: string, progress: Partial<Progress>): Promise<void> => {},
};

export const UserAPI = {
    me: async () => ({ email: "test@example.com" }),
};
