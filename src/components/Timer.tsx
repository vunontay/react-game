interface TimerProps {
    time: number;
}

const Timer = ({ time }: TimerProps) => {
    return (
        <div className="flex items-center gap-2">
            <span>Time:</span>
            <span>{time.toFixed(1)}s</span>
        </div>
    );
};

export default Timer;
