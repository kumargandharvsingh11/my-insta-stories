"use client";

import React from "react";
import Image from "next/image";
import { User as IUser } from "@/types"

interface StoryListProps {
    onStoryClick: (userId: number) => void;
    users: IUser[];
}
const StoryList: React.FC<StoryListProps> = ({ onStoryClick, users }) => {
    return (
        <div className="flex overflow-x-auto gap-4 py-2 story-list-container">
            {users.map((user) => (
                <div
                    data-testid='story-preview'
                    key={user.id}
                    className="flex-shrink-0 cursor-pointer first:pl-[5px]" // Make it clickable
                    onClick={() => onStoryClick(user.id)}>
                    <div className="story">
                        <Image
                            src={user.profilePicture}
                            alt={user.username}
                            width={72}
                            height={72}
                            className="rounded-full object-cover  border-4 border-transparent"
                        />
                    </div>
                    <div style={{ width: "72px" }}>
                        <p className="text-center text-xs mt-1 truncate">{user.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
