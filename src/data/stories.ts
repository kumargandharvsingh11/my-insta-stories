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
  {
    id: 3,
    username: "user3",
    profilePicture: require("./../../public/images/profile3.jpg"),
    stories: [
      { id: 4, content: require("./../../public/images/story4.jpg") },
      { id: 5, content: require("./../../public/images/story5.jpg") },
      { id: 6, content: require("./../../public/images/story6.jpg") },
    ],
  },
  {
    id: 4,
    username: "user4",
    profilePicture: require("./../../public/images/profile4.jpg"),
    stories: [
      { id: 7, content: require("./../../public/images/story7.jpg") },
    ],
  },
  {
    id: 5,
    username: "user5",
    profilePicture: require("./../../public/images/profile5.jpg"),
    stories: [
      { id: 8, content: require("./../../public/images/story8.jpg") },
      { id: 9, content: require("./../../public/images/story9.jpg") },
    ],
  }
  // Add more users as needed
];

export default users;
