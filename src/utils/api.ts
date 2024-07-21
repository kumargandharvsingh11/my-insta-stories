import { User } from '@/types';

export async function getUsersStories(): Promise<User[]> {
  return fetch(`http://localhost:3000/api/users`)
    .then((res) => res.json())
    .catch((err) => ({
      success: false,
      error: { message: err.message, details: err }
    }));
}