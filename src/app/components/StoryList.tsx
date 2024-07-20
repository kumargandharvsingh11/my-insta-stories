"use client";

import React from "react";
import Image from "next/image";
import users from "@/data/stories"; // Import the updated data

interface StoryListProps {
    onStoryClick: (userId: number) => void;
}
const StoryList: React.FC<StoryListProps> = ({ onStoryClick }) => {
    return (
        <div className="flex overflow-x-auto gap-4 py-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex-shrink-0 cursor-pointer" // Make it clickable
                    onClick={() => onStoryClick(user.id)}>
                    <Image
                        src={user.profilePicture}
                        alt={user.username}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                    />
                    <p className="text-center text-xs mt-1">{user.username}</p>
                    {/* You can add a visual indicator for multiple stories here if needed */}
                </div>
            ))}
        </div>
    );
};

export default StoryList;
