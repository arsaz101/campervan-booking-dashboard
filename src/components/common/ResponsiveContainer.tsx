import React from 'react';

const ResponsiveContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default ResponsiveContainer;