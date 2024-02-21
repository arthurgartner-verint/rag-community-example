import { motion } from 'framer-motion';
import React from 'react';
import colors from '~/styles/colors';

interface ButtonProps {
    handleClick?: () => void;
    disabled: boolean;
    text: string;
}

const AnimatedButton: React.FC<ButtonProps> = ({ handleClick, disabled, text }) => {
    const variants = {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.95 },
    };

    return (
        <motion.button
            className={`px-4 py-2 bg-verintBlue text-white rounded-lg focus:outline-none focus:shadow-outline ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
            onClick={!disabled ? handleClick : undefined}
            whileHover={!disabled ? { opacity: 0.9 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            variants={variants}
            transition={{ duration: 0.1 }}
        >
            {disabled ? (
                <motion.div
                    className="flex items-center justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                >
                    <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </motion.div>
            ) : (
                <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                >
                    {text}
                </motion.span>
            )}
        </motion.button>
    );
};

export default AnimatedButton;
