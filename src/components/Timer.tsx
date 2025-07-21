'use client';

import { useState, useEffect, memo } from 'react';

interface ITimerProps {
  initialSeconds: number;
  onTimeEnd: () => void;
}
/**
 * @description 타이머 컴포넌트
 * @param initialSeconds 초기 초
 * @param onTimeEnd 타이머 종료 시 실행할 함수
 * @returns 타이머 컴포넌트
 */

const Timer = memo(({ initialSeconds, onTimeEnd }: ITimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimeEnded, setIsTimeEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  useEffect(() => {
    if (isTimeEnded) {
      onTimeEnd();
    }
  }, [isTimeEnded, onTimeEnd]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <div className="text-center font-bold text-xl mb-4">{formatTime()}</div>;
});

Timer.displayName = 'Timer';

export default Timer;
