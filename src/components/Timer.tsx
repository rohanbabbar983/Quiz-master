import { useEffect, useState } from 'react';

interface Props {
  duration: number;
  onTimeout: () => void;
  resetSignal: number;
}

const Timer = ({ duration, onTimeout, resetSignal }: Props) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration);
  }, [resetSignal]);

  useEffect(() => {
    if (time <= 0) return onTimeout();
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  return <div className="text-lg font-semibold">Time Left: <span className={`${time < 10 ? "text-red-600" : "text-indigo-600"}`}>{time}s</span></div>;
};

export default Timer;
