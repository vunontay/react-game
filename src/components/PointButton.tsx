interface PointButtonProps {
    id: number;
    x: number;
    y: number;
    onClick: (id: number) => void;
    isClicked: boolean;
}

const PointButton = ({ id, x, y, onClick, isClicked }: PointButtonProps) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                isClicked ? "bg-red-500" : "bg-white"
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            {id}
        </button>
    );
};

export default PointButton;
