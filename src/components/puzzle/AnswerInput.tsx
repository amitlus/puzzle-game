import React, { useState } from "react";

export default function AnswerInput({
                                        onSubmit,
                                        isCorrect,
                                    }: {
    onSubmit: (answer: string) => Promise<boolean>;
    isCorrect: boolean;
}) {
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(answer);
        setAnswer("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                type="text"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
                Submit
            </button>
            {isCorrect && (
                <p className="text-green-400 text-sm">✅ Correct! Well done.</p>
            )}
        </form>
    );
}
