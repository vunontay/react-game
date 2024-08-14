interface ControlsProps {
    isPlaying: boolean;
    isGameOver: boolean;
    onStart: () => void;
    onRestart: () => void;
}

const Controls = ({
    isPlaying,
    isGameOver,
    onStart,
    onRestart,
}: ControlsProps) => {
    return (
        <div>
            {!isPlaying && !isGameOver ? (
                <button
                    onClick={onStart}
                    className="inline-block border-2 rounded-sm min-w-[100px] hover:bg-gray-100 transition-all"
                >
                    Play
                </button>
            ) : (
                <button
                    onClick={onRestart}
                    className="inline-block border-2 rounded-sm min-w-[100px] hover:bg-gray-100 transition-all"
                >
                    Restart
                </button>
            )}
        </div>
    );
};

export default Controls;
