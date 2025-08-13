import React, { useState, useEffect, useRef } from "react";

const TypingEffect = ({ text, speed, delay, onTypingEnd }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        if (index >= text.length) {
          clearInterval(intervalId);
          if (onTypingEnd) onTypingEnd();
        }
      }, speed);
    }, delay);

    return () => clearTimeout(typingTimeout);
  }, [text, speed, delay, onTypingEnd]);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default TypingEffect;
