interface MessagesProps {
    isCleared: boolean;
    isGameOver: boolean;
}

const Messages: React.FC<MessagesProps> = ({ isCleared, isGameOver }) => {
    return (
        <div>
            {isCleared && (
                <h4 className="text-xl font-bold uppercase text-green-700">
                    ALL CLEARED
                </h4>
            )}
            {isGameOver && (
                <h4 className="text-xl font-bold uppercase text-red-700">
                    GAME OVER
                </h4>
            )}
        </div>
    );
};

export default Messages;
