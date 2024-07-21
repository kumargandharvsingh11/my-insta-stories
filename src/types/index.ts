export interface Story {
    id: number;
    content: string; // Image or video content
  }
  
export interface User {
    id: number;
    username: string;
    profilePicture: string; // Assuming you'll use local images for now
    stories: Story[];
  }