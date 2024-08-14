import React, { useState, useEffect, useCallback } from "react";
import { Point } from "@/types/point";
import Messages from "@/components/Messages";
import Timer from "@/components/Timer";
import Controls from "@/components/Controls";
import PointButton from "@/components/PointButton";

function App() {
    const [points, setPoints] = useState<Point[]>([]);
    const [pointInput, setPointInput] = useState<string>("3");
    const [time, setTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentNumber, setCurrentNumber] = useState<number>(1);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isCleared, setIsCleared] = useState<boolean>(false);
    const [clickedPoint, setClickedPoint] = useState<number | null>(null);

    // Generate random points based on user input
    const generatePoints = useCallback(() => {
        const newPoints: Point[] = [];
        for (let i = 1; i <= parseInt(pointInput); i++) {
            newPoints.push({
                id: i,
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
            });
        }
        setPoints(newPoints);
    }, [pointInput]);

    // Start or restart the game
    const handleStart = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setIsCleared(false);
        setTime(0);
        setCurrentNumber(1);
        generatePoints();
    };

    // Restart the game
    const handleRestart = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setIsCleared(false);
        setTime(0);
        setCurrentNumber(1);
        generatePoints();
    };

    // Handle point clicks and game state
    const handlePointClick = (id: number) => {
        if (id === currentNumber) {
            setClickedPoint(id);
            setTimeout(() => {
                setPoints((prevPoints) =>
                    prevPoints.filter((point) => point.id !== id)
                );
                setCurrentNumber((prev) => prev + 1);
                setClickedPoint(null);
            }, 500);
        } else {
            setIsPlaying(false);
            setIsGameOver(true);
        }
    };

    // Update timer and check for game end
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying && !isGameOver && points.length > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 0.1);
            }, 100);
        }

        if (points.length === 0 && isPlaying) {
            setIsPlaying(false);
            setIsCleared(true);
        }

        return () => clearInterval(interval);
    }, [isPlaying, isGameOver, points.length]);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="max-w-[600px] w-full flex flex-col gap-4">
                {(isCleared || isGameOver) && (
                    <Messages isCleared={isCleared} isGameOver={isGameOver} />
                )}
                {!isCleared && !isGameOver && (
                    <h4 className="text-xl font-bold uppercase text-start">
                        LET'S PLAY
                    </h4>
                )}

                <div className="flex items-center gap-2">
                    <label>Points:</label>
                    <input
                        value={pointInput}
                        onChange={(e) => setPointInput(e.target.value)}
                        className="border-2 rounded-sm"
                        type="number"
                    />
                </div>
                <Timer time={time} />
                <Controls
                    isPlaying={isPlaying}
                    isGameOver={isGameOver}
                    onStart={handleStart}
                    onRestart={handleRestart}
                />
                <div className="border-2 border-black min-h-[500px] relative">
                    {points.map((point) => (
                        <PointButton
                            key={point.id}
                            id={point.id}
                            x={point.x}
                            y={point.y}
                            onClick={handlePointClick}
                            isClicked={clickedPoint === point.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
