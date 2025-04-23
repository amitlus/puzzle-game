import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Puzzle } from "../entities/types";
import PuzzleCard from "../components/puzzle/PuzzleCard";
import AnswerInput from "../components/puzzle/AnswerInput";
import HintSystem from "../components/puzzle/HintSystem";
import { PuzzleManager } from "../logic/PuzzleManager";
import { PuzzleStorage } from "../logic/PuzzleStorage";

const puzzleManager = new PuzzleManager();

export default function Game() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [progress, setProgress] = useState(PuzzleStorage.getProgress());
    const [selectedCategory, setSelectedCategory] = useState<"all" | Puzzle["puzzle_type"]>("all");

    useEffect(() => {
        setProgress(PuzzleStorage.getProgress());
    }, []);

    const allPuzzles = puzzleManager.getAll();
    const filteredPuzzles =
        selectedCategory === "all"
            ? allPuzzles
            : allPuzzles.filter((p) => p.puzzle_type === selectedCategory);

    const currentPuzzle = filteredPuzzles[currentIndex];
    const totalPuzzles = filteredPuzzles.length;

    const completedCount = Object.entries(progress).filter(
        ([id, p]) => p.completed && filteredPuzzles.find((pz) => pz.id === id)
    ).length;

    const handleAnswer = async (answer: string): Promise<boolean> => {
        if (!currentPuzzle) return false;
        if (answer.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
            puzzleManager.markCompleted(currentPuzzle.id);
            setProgress(PuzzleStorage.getProgress());
            setIsCorrect(true);
            return true;
        }
        return false;
    };

    const handleHintUse = (index: number) => {
        if (!currentPuzzle) return;
        puzzleManager.useHint(currentPuzzle.id, index);
        setProgress(PuzzleStorage.getProgress());
    };

    const navigate = (dir: number) => {
        const newIndex = currentIndex + dir;
        if (newIndex >= 0 && newIndex < filteredPuzzles.length) {
            setCurrentIndex(newIndex);
            setIsCorrect(false);
        }
    };

    const categories: ("all" | Puzzle["puzzle_type"])[] = [
        "all",
        "logic",
        "visual",
        "cipher",
        "motion",
        "sequence",
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setCurrentIndex(0);
                                setIsCorrect(false);
                            }}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                selectedCategory === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Navigation Bar */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        disabled={currentIndex === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-30"
                    >
                        ← Prev
                    </button>
                    <div className="text-center text-gray-300">
                        <h2 className="text-xl font-bold">
                            Puzzle {currentIndex + 1} / {totalPuzzles}
                        </h2>
                        <p>{completedCount} solved</p>
                    </div>
                    <button
                        onClick={() => navigate(1)}
                        disabled={currentIndex === totalPuzzles - 1}
                        className="text-gray-400 hover:text-white disabled:opacity-30"
                    >
                        Next →
                    </button>
                </div>

                {/* Puzzle Progress Bar */}
                <div className="space-y-2">
                    <p className="text-sm text-gray-400 text-right">
                        Progress: {completedCount} / {totalPuzzles}
                    </p>
                    <div className="w-full bg-gray-700 rounded h-3 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full transition-all duration-300"
                            style={{
                                width: `${(completedCount / totalPuzzles) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Puzzle Content */}
                <AnimatePresence mode="wait">
                    {currentPuzzle && (
                        <motion.div
                            key={currentPuzzle.id}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PuzzleCard puzzle={currentPuzzle} />
                            <AnswerInput onSubmit={handleAnswer} isCorrect={isCorrect} />
                            <HintSystem hints={currentPuzzle.hints} onUseHint={handleHintUse} />
                            {isCorrect && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-600 text-green-300"
                                >
                                    ✅ Puzzle Solved!
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
