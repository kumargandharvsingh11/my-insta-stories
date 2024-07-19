import StoryList from "@/app/components/StoryList";
import StoryView from "@/app/components/StoryView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoryList /> 
      {/* Temporary StoryView for testing (replace with actual integration later) */}
      <StoryView userId={1} />
      {/* ... rest of your page content */}
    </main>
  );
}
