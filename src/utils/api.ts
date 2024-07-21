import { User } from '@/types';

export async function getUsersStories(): Promise<User[]> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
    .then((res) => res.json())
    .catch((err) => ([]));
}