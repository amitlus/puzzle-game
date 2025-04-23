import { Puzzle } from "../../entities/types";

const categoryColors: Record<string, string> = {
    logic: "bg-blue-600 text-blue-100",
    visual: "bg-purple-600 text-purple-100",
    cipher: "bg-red-600 text-red-100",
    motion: "bg-green-600 text-green-100",
    sequence: "bg-yellow-600 text-yellow-900",
};

export default function PuzzleCard({ puzzle }: { puzzle: Puzzle }) {
    return (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg text-white mb-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-blue-400">{puzzle.title}</h2>
                <span className={`px-3 py-1 text-sm rounded-full ${categoryColors[puzzle.puzzle_type]}`}>
          {puzzle.puzzle_type}
        </span>
            </div>
            <p className="text-gray-300 mb-4">{puzzle.story_text}</p>
            {puzzle.image_url && (
                <img
                    src={puzzle.image_url}
                    alt={puzzle.title}
                    className="rounded-lg max-h-48 object-cover border border-gray-600"
                />
            )}
        </div>
    );
}
