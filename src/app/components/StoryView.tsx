"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User as IUser } from "@/types"
import { calculateProgress, stringPercentageToNumber } from "@/utils";

interface StoryViewProps {
    initialUserId: number;
    onClose: () => void; // Function to close the StoryView
    users: IUser[];
}
const storyTime = 5000

const StoryView: React.FC<StoryViewProps> = ({ initialUserId, onClose, users }) => {
    const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
    const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
    const [isHolding, setIsHolding] = useState<boolean>(false);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(
        users.findIndex((user) => user.id === initialUserId)
    );

    const currentUser: IUser = users[currentUserIndex];

    const elapsedTime = useRef<number>(0); // Use useRef to store elapsedTime
    const progressBarRef = useRef<HTMLDivElement>(null); // Ref for progress bar element

    // State to trigger transition animation
    const [storyTransition, setStoryTransition] = useState<boolean>(false);

    useEffect(() => {
        if (currentStoryIndex === 0 && currentUserIndex === 0) return; // If both are 0 no transition needed
        setStoryTransition(true);
        const timeout = setTimeout(() => {
            setStoryTransition(false);
        }, 400); // Adjust the timeout value for the desired transition duration
        return () => clearTimeout(timeout);
    }, [currentStoryIndex, currentUserIndex]); // Trigger when story or user changes


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const autoAdvance = () => {
            if (currentUser) {
                if (currentStoryIndex < currentUser.stories.length - 1) { //to check if not last story
                    setCurrentStoryIndex(currentStoryIndex + 1);
                    if (progressBarRef.current) {
                        const currentWidth = progressBarRef.current.style.width;
                        setProgressBarWidth(stringPercentageToNumber(currentWidth));
                    }
                } else if (currentUserIndex < users.length - 1) {
                    setCurrentUserIndex(currentUserIndex + 1);
                    setCurrentStoryIndex(0);
                    if (progressBarRef.current) {
                        progressBarRef.current.style.width = "0%";
                    }
                    setProgressBarWidth(0);
                } else {
                    onClose();
                    setProgressBarWidth(0);
                }
            }

            // Reset elapsedTime and progress bar before moving to the next story
            elapsedTime.current = 0;

        };

        if (!isHolding) {
            interval = setInterval(() => {
                if (progressBarRef.current && currentUser) {
                    elapsedTime.current += 100;
                    const progress = Math.min((elapsedTime.current / storyTime) * 100, 100);

                    //for adjusting width of multiple stories
                    if (currentUser.stories.length > 1) {
                        const computedWidth = calculateProgress(currentStoryIndex, currentUser.stories.length - 1, progress);
                        progressBarRef.current.style.width = `${computedWidth}%`;
                    } else {
                        progressBarRef.current.style.width = `${progress}%`;
                    }

                    if (elapsedTime.current >= storyTime) {
                        autoAdvance();
                    }
                }
            }, 100); // Update every 100ms
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentStoryIndex, currentUserIndex, isHolding]); // Removed startTime from dependency array


    const handlePrev = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        } else if (currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
            setCurrentStoryIndex(users[currentUserIndex - 1].stories.length - 1);
        }
        elapsedTime.current = 0;
    };

    const handleNext = () => {
        if (currentStoryIndex < currentUser?.stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else if (currentUserIndex < users.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setCurrentStoryIndex(0);
        }
        elapsedTime.current = 0;
    }

    // Calculate divider positions
    const dividerPositions = React.useMemo(() => {
        if (!currentUser || currentUser.stories.length <= 1) return [];
        const numDividers = currentUser.stories.length - 1;
        return Array.from({ length: numDividers }, (_, i) =>
            ((i + 1) / currentUser.stories.length) * 100
        );
    }, [currentUser]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black">
            {currentUser && currentUser.stories[currentStoryIndex] && (
                <div className="relative w-full h-full"> {/* Container for image and tap zones */}
                    <Image
                        src={currentUser.stories[currentStoryIndex].content}
                        alt={`${currentUser.username}'s story`}
                        fill
                        className={`object-contain transition-opacity duration-500 ${storyTransition ? "opacity-0" : "opacity-100"
                            }`}
                        data-testid="story-image"
                    />
                    {/* Tap Zones */}
                    <div
                        data-testid="left-tap-zone"
                        className="absolute top-0 left-0 w-1/2 h-full"
                        onClick={handlePrev}
                        onTouchStart={() => setIsHolding(true)}
                        onTouchEnd={() => setIsHolding(false)}
                        onMouseDown={() => setIsHolding(true)}
                        onMouseUp={() => setIsHolding(false)}
                    />
                    <div
                        data-testid="right-tap-zone"
                        className="absolute top-0 right-0 w-1/2 h-full"
                        onClick={handleNext}
                        onTouchStart={() => setIsHolding(true)}
                        onTouchEnd={() => setIsHolding(false)}
                        onMouseDown={() => setIsHolding(true)}
                        onMouseUp={() => setIsHolding(false)}
                    />
                </div>
            )}

            <div className="absolute top-4 right-4">
                <button
                    data-testid="close-button"
                    className="text-white text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-gray-500 w-full">
                <div
                    ref={progressBarRef}  // Attach ref to progress bar
                    className="h-full bg-black transition-all duration-0 ease-in-out"
                ></div>
                {/* Dividers */}
                {dividerPositions.map((position, index) => (
                    <div
                        key={index}
                        className="absolute top-0 h-full w-[8px] bg-white" // Style the divider (adjust as needed)
                        style={{ left: `${position}%` }}
                    ></div>
                ))}
            </div>

            {/* User Info */}
            < div className="absolute top-4 left-4 flex items-center" >
                {currentUser && (
                    <>
                        <Image
                            src={currentUser.profilePicture}
                            alt={currentUser.username}
                            width={32}
                            height={32}
                            className="rounded-full mr-2"
                            data-testid="profile-image"
                        />
                        <span className="text-white text-sm font-medium">
                            {currentUser.username}
                        </span>
                    </>
                )}
            </div>
            {/* ... Close Button (we'll add this in the next step) */}
        </div >
    );
};

export default StoryView;