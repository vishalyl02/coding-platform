// useTestTimer.js - Fixed timer with persistence
import { useState, useEffect } from "react";

export function useTestTimer(testStarted, testSubmitted, durationInSeconds, testId) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    // Calculate time left based on saved start time
    const savedStartTime = localStorage.getItem(`test_${testId}_startTime`);
    
    if (savedStartTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
      const remaining = Math.max(0, durationInSeconds - elapsedSeconds);
      setTimeLeft(remaining);

      // If time already expired
      if (remaining <= 0) {
        alert("Time's up! Test will be auto-submitted.");
        // You can add auto-submit logic here
        return;
      }
    }

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up! Submitting test...");
          // Auto-submit logic can be added here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, durationInSeconds, testId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return { timeLeft, formatTime: () => formatTime(timeLeft) };
}