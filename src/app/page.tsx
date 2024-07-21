import { getUsersStories } from "@/utils/api";
import App from "./components/App";
import Image from "next/image";


export default async function Home() {
  const users = await getUsersStories();
  return (
    <App  users={users}/>
  );
}
