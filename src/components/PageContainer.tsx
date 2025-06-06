import React from "react";

export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-start min-h-screen">
            {children}
        </div>
    );
}
