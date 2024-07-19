import { StaticImageData } from "next/image";

interface Story {
  id: number;
  content: StaticImageData; // Image or video content
}

interface User {
  id: number;
  username: string;
  profilePicture: StaticImageData; // Assuming you'll use local images for now
  stories: Story[];
}

const users: User[] = [
  {
    id: 1,
    username: "user1",
    profilePicture: require("./../../public/images/profile1.jpg"), 
    stories: [
      { id: 1, content: require("./../../public/images/story1.jpg") },
      // Add more stories for user1 if needed
    ],
  },
  {
    id: 2,
    username: "user2",
    profilePicture: require("./../../public/images/profile2.jpg"),
    stories: [
      { id: 2, content: require("./../../public/images/story2.jpg") },
      { id: 3, content: require("./../../public/images/story3.jpg") },
    ],
  },
  // Add more users as needed
];

export default users;
