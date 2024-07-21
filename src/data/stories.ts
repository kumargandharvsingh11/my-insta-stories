import {User} from '@/types'

const users: User[] = [
  {
    id: 1,
    username: "StarryEyedSkies",
    profilePicture: "/images/profile1.jpg",
    stories: [
      { id: 1, content: "/images/story1.jpg" },
    ],
  },
  {
    id: 2,
    username: "BeatsByBen",
    profilePicture: "/images/profile2.jpg",
    stories: [
      { id: 2, content:"/images/story2.jpg" },
      { id: 3, content:"/images/story3.jpg" },
    ],
  },
  {
    id: 3,
    username: "Wanderlust",
    profilePicture: "/images/profile3.jpg",
    stories: [
      { id: 4, content: "/images/story4.jpg" },
      { id: 5, content: "/images/story5.jpg"},
      { id: 6, content: "/images/story6.jpg" },
    ],
  },
  {
    id: 4,
    username: "UrbanExplorer",
    profilePicture: "/images/profile4.jpg",
    stories: [
      { id: 7, content: "/images/story7.jpg" },
    ],
  },
  {
    id: 5,
    username: "VintageVoyage",
    profilePicture: "/images/profile5.jpg",
    stories: [
      { id: 8, content:"/images/story8.jpg" },
      { id: 9, content: "/images/story9.jpg" },
    ],
  },
  {
    id: 6,
    username: "LunaFox",
    profilePicture: "/images/profile6.jpg",
    stories: [
      { id: 10, content: "/images/story10.jpg" },
    ],
  },
  // Add more users as needed
];

export default users;
