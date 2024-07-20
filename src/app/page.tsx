"use client"

import { useState } from "react"; // Import useState
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
