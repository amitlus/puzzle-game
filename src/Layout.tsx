import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
            {/* Glowing gradient behind content */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,245,255,0.05),_transparent_80%)] pointer-events-none z-0" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10 z-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main content */}
            <div className="relative z-10 px-4 md:px-8 py-6">{children}</div>
        </div>
    );
}
