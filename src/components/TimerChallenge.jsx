import { useState, useRef } from 'react';

import ResultModal from './ResultModal.jsx';

// let timer;

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaning, setTimeRemaning] = useState(targetTime * 1000);

    const timerIsActive = timeRemaning > 0 && timeRemaning < targetTime * 1000;

    if(timeRemaning <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaning((prevTimeRemining) => prevTimeRemining - 10);
        }, 10);
    };

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    };

    function handleReset() {
        setTimeRemaning(targetTime * 1000);
    }

    return (
        <>
            <ResultModal targetTime={targetTime} ref={dialog} remainingTime={timeRemaning} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start' } Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running... ' : 'Timer inactive' } 
                </p>
            </section>
        </>
    )
};