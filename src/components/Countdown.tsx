import React, { useEffect, useState } from "react";

type countdownProps = {
  minutes: number;
  seconds: number;
};

const Countdown: React.FC<countdownProps> = ({ minutes, seconds }) => {
  const [countdownMinutes, setCountdownMinutes] = useState(minutes);
  const [countdownSeconds, setCountdownSeconds] = useState(seconds);

  useEffect(() => {
    // Calculate the total remaining seconds
    const totalRemainingSeconds = countdownMinutes * 60 + countdownSeconds;

    // Start the countdown
    const interval = setInterval(() => {
      if (totalRemainingSeconds > 0) {
        const minutes = Math.floor(totalRemainingSeconds / 60);
        const seconds = totalRemainingSeconds % 60;

        setCountdownMinutes(minutes);
        setCountdownSeconds(seconds);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [countdownMinutes, countdownSeconds]);

  return (
    <span className="countdown font-mono text-2xl">
      {countdownMinutes.toString().padStart(2, "0")}:
      {countdownSeconds.toString().padStart(2, "0")}
    </span>
  );
};

export default Countdown;
