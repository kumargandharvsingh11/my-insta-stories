"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import users from "@/data/stories";

interface StoryViewProps {
    initialUserId: number;
    onClose: () => void; // Function to close the StoryView
}

const StoryView: React.FC<StoryViewProps> = ({ initialUserId, onClose }) => {
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(
        users.findIndex((user) => user.id === initialUserId)
    );

    const currentUser = users[currentUserIndex];

    const elapsedTime = useRef(0); // Use useRef to store elapsedTime
    const progressBarRef = useRef<HTMLDivElement>(null); // Ref for progress bar element

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const autoAdvance = () => {
            if (currentUser) {
                if (currentStoryIndex < currentUser.stories.length - 1) {
                    setCurrentStoryIndex(currentStoryIndex + 1);
                } else if (currentUserIndex < users.length - 1) {
                    setCurrentUserIndex(currentUserIndex + 1);
                    setCurrentStoryIndex(0);
                } else {
                    onClose();
                }
            }

            // Reset elapsedTime and progress bar before moving to the next story
            console.log("Resetting elapsedTime and progressBarWidth");
            elapsedTime.current = 0;
            setProgressBarWidth(0);
            if (progressBarRef.current) {
                progressBarRef.current.style.width = "0%";
            }
        };

        if (!isHolding) {
            elapsedTime.current = 0;
            setProgressBarWidth(0);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = "0%";
            }
            interval = setInterval(() => {
              if (progressBarRef.current && currentUser) {
                elapsedTime.current += 100;
                const progress = Math.min((elapsedTime.current / 2500) * 100, 100);
                progressBarRef.current.style.width = `${progress}%`;
        
                // Log progress and elapsed time
                console.log("elapsedTime:", elapsedTime.current);
                console.log("progress:", progress);
        
                if (elapsedTime.current >= 2500) {
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
        // Console log after handlePrev (CORRECTED)
        console.log(
            "After handlePrev:",
            "currentUserIndex:",
            currentUserIndex,
            "currentStoryIndex:",
            currentStoryIndex
        );
    };

    const handleNext = () => {
        if (currentStoryIndex < currentUser?.stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else if (currentUserIndex < users.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setCurrentStoryIndex(0);
        }
        // Console log after handleNext (CORRECTED)
        console.log(
            "After handleNext:",
            "currentUserIndex:",
            currentUserIndex,
            "currentStoryIndex:",
            currentStoryIndex
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black">
            {currentUser && currentUser.stories[currentStoryIndex] && (
                <div className="relative w-full h-full"> {/* Container for image and tap zones */}
                    <Image
                        src={currentUser.stories[currentStoryIndex].content}
                        alt={`${currentUser.username}'s story`}
                        fill
                        className="object-contain"
                    />
                    {/* Tap Zones */}
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full"
                        onClick={handlePrev}
                        onTouchStart={() => setIsHolding(true)}
                        onTouchEnd={() => setIsHolding(false)}
                        onMouseDown={() => setIsHolding(true)}
                        onMouseUp={() => setIsHolding(false)}
                    />
                    <div
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
                    className="text-white text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white w-full">
                <div
                    ref={progressBarRef}  // Attach ref to progress bar
                    className="h-full bg-gray-800 transition-all duration-500"
                ></div>
            </div>
            {/* User Info */}
            <div className="absolute top-4 left-4 flex items-center">
                {currentUser && (
                    <>
                        <Image
                            src={currentUser.profilePicture}
                            alt={currentUser.username}
                            width={32}
                            height={32}
                            className="rounded-full mr-2"
                        />
                        <span className="text-white text-sm font-medium">
                            {currentUser.username}
                        </span>
                    </>
                )}
            </div>
            {/* ... Close Button (we'll add this in the next step) */}
        </div>
    );
};

export default StoryView;