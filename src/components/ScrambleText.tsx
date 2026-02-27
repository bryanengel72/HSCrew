import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*0123456789';

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;   // ms before scramble starts
    duration?: number; // ms total duration
}

export function ScrambleText({ text, className = '', delay = 0, duration = 1400 }: ScrambleTextProps) {
    const [display, setDisplay] = useState(text.replace(/[^ ]/g, CHARS[0]));
    const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            const startTime = performance.now();
            const totalFrames = Math.ceil(duration / 30);

            const tick = (frame: number) => {
                // Always snap to final text on last frame
                if (frame >= totalFrames) {
                    setDisplay(text);
                    return;
                }

                const progress = frame / totalFrames; // 0 → 1

                setDisplay(
                    text
                        .split('')
                        .map((char, i) => {
                            if (char === ' ') return ' ';
                            // Each character reveals left-to-right based on progress
                            const charThreshold = i / text.length;
                            if (progress > charThreshold + 0.15) {
                                return char; // fully revealed
                            }
                            // Still scrambling
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join('')
                );

                frameRef.current = setTimeout(() => tick(frame + 1), 30);
            };

            tick(0);
        }, delay);

        return () => {
            clearTimeout(startTimeout);
            if (frameRef.current) clearTimeout(frameRef.current);
        };
    }, [text, delay, duration]);

    return <span className={className}>{display}</span>;
}
