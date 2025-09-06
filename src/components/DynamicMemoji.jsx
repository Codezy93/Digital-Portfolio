'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "memoji/bump.png",
    "memoji/cheers.png",
    // "memoji/display.png",
    "memoji/finger-crossed.png",
    // "memoji/greet.png",
    "memoji/hugs.png",
    // "memoji/idea.png",
    "memoji/laugh.png",
    // "memoji/love.png",
    "memoji/party.png",
    // "memoji/perfect.png",
    // "memoji/smirk.png",
    "memoji/stars.png",
    "memoji/tease.png",
    "memoji/think.png",
    // "memoji/wave.png",
];

export default function DynamicMemoji() {
    const [currentImage, setCurrentImage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomImage = useCallback(() => {
        if (images.length <= 1) return images[0];
        let newImage = currentImage;
        while (newImage === currentImage) {
        newImage = images[Math.floor(Math.random() * images.length)];
        }
        return newImage;
    }, [currentImage]);

    useEffect(() => {
        setCurrentImage(getRandomImage());
    }, []);

    const handleMouseEnter = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const newImage = getRandomImage();
        setCurrentImage(newImage);

        setTimeout(() => {
        setIsAnimating(false);
        }, 500);
    };

    return (
        <div className="w-50 h-50 cursor-pointer overflow-hidden" onMouseEnter={handleMouseEnter}>
            <AnimatePresence mode="wait">
            {currentImage && (
                <motion.img
                key={currentImage}
                src={currentImage}
                alt="Dynamic Memoji"
                className="w-full h-full object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
            )}
            </AnimatePresence>
        </div>
    );
}
