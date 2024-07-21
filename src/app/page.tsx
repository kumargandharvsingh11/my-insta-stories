"use client"

import { useState } from "react"; // Import useState
import Image from "next/image";
import StoryList from "./components/StoryList";
import StoryView from "./components/StoryView";

export default function Home() {
  const [showStoryView, setShowStoryView] = useState(false); // State to control StoryView visibility
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleStoryClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowStoryView(true);
  };

  const handleCloseStoryView = () => {
    setShowStoryView(false);
    setSelectedUserId(null);
  };

  return (
    <main className="min-h-screen">
      {/* Instagram Logo */}
      <div className="p-1 border-b-[0.5px] border-gray-400">
        <Image
          src="/images/instaFullLogo.png" // Replace with the actual path to your logo image
          alt="Instagram Logo"
          width={160} // Adjust width as needed
          height={80} // Adjust height as needed
        />
      </div>
      <StoryList
        onStoryClick={(userId: number) => {
          setSelectedUserId(userId);
          setShowStoryView(true);
        }}
      />

      {showStoryView && selectedUserId !== null && (
        <StoryView
          key={selectedUserId}
          initialUserId={selectedUserId}
          onClose={handleCloseStoryView}
        />
      )}
    </main>
  );
}
