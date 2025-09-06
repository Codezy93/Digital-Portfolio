import React, { forwardRef } from 'react';

const CustomSection = forwardRef(({ children, name = null }, ref) => {
    return (
        <section ref={ref} className="relative w-full h-screen p-4 overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 ">
            {name && (
                <h1 className="text-6xl font-bold text-blue-800 font-mono">{name}</h1>
            )}
            {children}
        </section>
    );
});

export default CustomSection;
