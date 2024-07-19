import { StaticImageData } from "next/image";

interface Story {
    id: number;
    username: string;
    profilePicture: StaticImageData;
    content: StaticImageData; 
}

const stories: Story[] = [
    {
        id: 1,
        username: "user1",
        profilePicture: require("../public/images/profile1.jpg"), // Replace with your image paths
        content: require("../public/images/story1.jpg"),
    },
    {
        id: 2,
        username: "user2",
        profilePicture: require("../public/images/profile2.jpg"),
        content: require("../public/images/story2.jpg"),
    },
    {
        id: 3,
        username: "user2",
        profilePicture: require("../public/images/profile2.jpg"),
        content: require("../public/images/story3.jpg"),
    },
    // Add more stories as needed
];

export default stories;
