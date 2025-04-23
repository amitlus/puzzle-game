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

    const allPuzzles = puzzleManager.getAll();
    const filteredPuzzles = selectedCategory === "all"
        ? allPuzzles
        : allPuzzles.filter(p => p.puzzle_type === selectedCategory);

    const currentPuzzle = filteredPuzzles[currentIndex];
    const totalPuzzles = filteredPuzzles.length;

    useEffect(() => {
        setProgress(PuzzleStorage.getProgress());
    }, []);

    const currentPuzzle: Puzzle | null = puzzleManager.getByIndex(currentIndex);
    const totalPuzzles = puzzleManager.getCount();
    const completedCount = Object.values(progress).filter(p => p.completed).length;

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
        puzzleManager.useHint(currentPuzzle.id);
        setProgress(PuzzleStorage.getProgress());
    };

    const navigate = (dir: number) => {
        const newIndex = currentIndex + dir;
        if (newIndex >= 0 && newIndex < totalPuzzles) {
            setCurrentIndex(newIndex);
            setIsCorrect(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto space-y-8">
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
