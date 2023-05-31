import { type DependencyList, useEffect } from 'react';

export default function useTimer(cb: () => void, duration: number, dependency?: DependencyList) {
  useEffect(() => {
    const timerId = setTimeout(cb, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, dependency);
}
