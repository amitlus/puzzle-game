import { useState } from "react";

export default function HintSystem({
                                       hints,
                                       onUseHint,
                                   }: {
    hints: string[];
    onUseHint: (index: number) => void;
}) {
    const [shown, setShown] = useState<number[]>([]);

    return (
        <div className="space-y-2 mt-6">
            <h3 className="text-lg font-semibold text-blue-300">Hints</h3>
            {hints.map((hint, index) =>
                shown.includes(index) ? (
                    <p
                        key={index}
                        className="bg-gray-700 text-gray-200 p-3 rounded border border-gray-600"
                    >
                        {hint}
                    </p>
                ) : (
                    <button
                        key={index}
                        className="text-blue-400 hover:underline"
                        onClick={() => {
                            setShown([...shown, index]);
                            onUseHint(index);
                        }}
                    >
                        Reveal Hint {index + 1}
                    </button>
                )
            )}
        </div>
    );
}
