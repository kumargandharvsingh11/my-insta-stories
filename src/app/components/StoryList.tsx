"use client";

import React from "react";
import Image from "next/image";
import users from "@/data/stories"; // Import the updated data

interface StoryListProps {
    onStoryClick: (userId: number) => void;
}
const StoryList: React.FC<StoryListProps> = ({ onStoryClick }) => {
    return (
        <div className="flex overflow-x-auto gap-4 py-4 story-list-container">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex-shrink-0 cursor-pointer" // Make it clickable
                    onClick={() => onStoryClick(user.id)}>
                    <div className="story">
                        <Image
                            src={user.profilePicture}
                            alt={user.username}
                            width={68}
                            height={68}
                            className="rounded-full object-cover  border-4 border-transparent"
                        />
                    </div>
                    <p className="text-center text-xs mt-1">{user.username}</p>
                    {/* You can add a visual indicator for multiple stories here if needed */}
                </div>
            ))}
        </div>
    );
};

export default StoryList;
