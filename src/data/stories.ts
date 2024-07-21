import {User} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
// const BASE_URL =  "http://localhost:3000";
console.log("base url", BASE_URL)

const users: User[] = [
  {
    id: 1,
    username: "StarryEyedSkies",
    profilePicture: `${BASE_URL}/images/profile1.jpg`,
    stories: [
      { id: 1, content: `${BASE_URL}/images/story1.jpg` },
    ],
  },
  {
    id: 2,
    username: "BeatsByBen",
    profilePicture: `${BASE_URL}/images/profile2.jpg`,
    stories: [
      { id: 2, content:`${BASE_URL}/images/story2.jpg` },
      { id: 3, content:`${BASE_URL}/images/story3.jpg` },
    ],
  },
  {
    id: 3,
    username: "Wanderlust",
    profilePicture: `${BASE_URL}/images/profile3.jpg`,
    stories: [
      { id: 4, content: `${BASE_URL}/images/story4.jpg` },
      { id: 5, content: `${BASE_URL}/images/story5.jpg`},
      { id: 6, content: `${BASE_URL}/images/story6.jpg` },
    ],
  },
  {
    id: 4,
    username: "UrbanExplorer",
    profilePicture: `${BASE_URL}/images/profile4.jpg`,
    stories: [
      { id: 7, content: `${BASE_URL}/images/story7.jpg` },
    ],
  },
  {
    id: 5,
    username: "VintageVoyage",
    profilePicture: `${BASE_URL}/images/profile5.jpg`,
    stories: [
      { id: 8, content:`${BASE_URL}/images/story8.jpg` },
      { id: 9, content: `${BASE_URL}/images/story9.jpg` },
    ],
  },
  {
    id: 6,
    username: "LunaFox",
    profilePicture: `${BASE_URL}/images/profile6.jpg`,
    stories: [
      { id: 10, content: `${BASE_URL}/images/story10.jpg` },
    ],
  },
  // Add more users as needed
];

export default users;
