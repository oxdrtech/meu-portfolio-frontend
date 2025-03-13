import { useState, useEffect } from "react";

export const useScrambledText = (words: string[]) => {
  const [displayText, setDisplayText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const randomChars = "!@#$%&*?";

  useEffect(() => {
    const word = words[loopIndex % words.length];
    let progress = 0;

    const interval = setInterval(() => {
      if (progress <= word.length) {
        let scrambledText = word
          .split("")
          .map((char, i) =>
            i < progress
              ? char
              : randomChars[Math.floor(Math.random() * randomChars.length)]
          )
          .join("");

        setDisplayText(scrambledText);
        progress++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoopIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loopIndex, 100, words]);

  return displayText;
};
