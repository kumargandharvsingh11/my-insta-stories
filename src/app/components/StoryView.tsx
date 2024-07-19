"use client";
import React from "react";

interface StoryViewProps {
  userId: number; // Pass the ID of the user whose story to display
}

const StoryView: React.FC<StoryViewProps> = ({ userId }) => {
  // Logic to fetch the user's stories based on userId (from the 'users' data)
  // ...

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black"> 
        {/* Display the user's stories here (images or videos) */}
        {/* Add navigation controls (left/right arrows or swipe gestures) */}
        {/* Add a close button to exit StoryView */}
    </div>
  );
};

export default StoryView;
