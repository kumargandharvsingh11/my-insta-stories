import { StaticImageData } from "next/image";
export interface Story {
    id: number;
    content: StaticImageData; // Image or video content
}

export interface User {
    id: number;
    username: string;
    profilePicture: StaticImageData; // Assuming you'll use local images for now
    stories: Story[];
}