import { useState, useEffect, useCallback } from 'react';

interface IUseTimerProps {
  initialSeconds: number;
  onTimeEnd: () => void;
}
/**
 * @description 타이머 훅
 * @param initialSeconds 초기 초
 * @param onTimeEnd 타이머 종료 시 실행할 함수
 * @returns 초, 포맷팅 함수
 */
export const useTimer = ({ initialSeconds, onTimeEnd }: IUseTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [seconds]);

  return { seconds, formatTime };
};
