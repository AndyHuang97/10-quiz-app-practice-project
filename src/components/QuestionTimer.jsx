import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // If only timeout (no setInterval) no need for useEffect, because:
    // 1. there is no infinite loop
    // 2. it's not using a not yet assigned ref
    // but with setInterval it would create multiple timeout, because the component
    // is rerendered every 100ms.
    // we want to keep only 1 timeout per question
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); //both are props

  // this would cause an infinite loop, because it's updating the state
  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    // without clean up function, there will be 2 intervals and the remaining time
    // will be depleted twice as fast
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" value={remainingTime} max={timeout} className={mode}/>;
}
