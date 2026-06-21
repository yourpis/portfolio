"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";

export default function MorphingWord({ word1, word2 }: { word1: string, word2: string }) {
  const [currentWord, setCurrentWord] = useState(word1);
  const [displayText, setDisplayText] = useState(word1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextWord = currentWord === word1 ? word2 : word1;
      let iteration = 0;
      // Frames for the scramble (lowered for faster morph)
      const maxIterations = 10; 
      
      const scrambleInterval = setInterval(() => {
        setDisplayText(() => {
          return nextWord.split("").map((letter, index) => {
            // Un-scramble letter by letter
            const revealLimit = (maxIterations / nextWord.length) * index;
            if (iteration > revealLimit + 2) { 
              return nextWord[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("");
        });

        iteration++;
        if (iteration >= maxIterations + 5) {
          clearInterval(scrambleInterval);
          setDisplayText(nextWord);
          setCurrentWord(nextWord);
        }
      }, 25); // Faster frame rate (25ms)
    }, 2000); // Wait 2 seconds instead of 3 before swapping

    return () => clearInterval(interval);
  }, [currentWord, word1, word2]);

  return <span>{displayText}</span>;
}
