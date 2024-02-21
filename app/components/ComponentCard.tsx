import React from "react";

interface ComponentCardProps {
    title: string,
    subtitle: string,
    children: React.ReactNode
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, subtitle, children }) => {
    return <div className="shadow-card w-full p-5 rounded-lg w-full">
        <div className="flex justify-between mb-3">
            <div>
                <div className="text-[1.5rem] font-semibold">
                    {title}
                </div>
                <div className="text-[.9rem] text-neutral-400">
                    {subtitle}
                </div>
            </div>
        </div>
        <div>
            {children}
        </div>
    </div>
}

export default ComponentCard