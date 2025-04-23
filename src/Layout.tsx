import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
            {/* Neon radial glow */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,245,255,0.1),_transparent_70%)] pointer-events-none z-0" />

            {/* Neon grid pattern */}
            <div
                className="fixed inset-0 pointer-events-none z-0 neon-grid-pulse"
                style={{
                    backgroundImage: `
      linear-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 245, 255, 0.15) 1px, transparent 1px)
    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Content wrapper */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
