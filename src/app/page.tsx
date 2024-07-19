import StoryList from "@/app/components/StoryList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoryList /> 
      {/* ... rest of your page content */}
    </main>
  );
}
