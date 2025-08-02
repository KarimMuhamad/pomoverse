import { updateProfileRequest } from "$lib/api/userApi";

interface User {
  email?: string;
  id?: number;
  username?: string;
  password?: string;
}

class UserStore {
  user: User | null = $state<User | null>(null);

  async updateUser(payload: User) {
    try {
      const res = await updateProfileRequest(payload);
      this.user = res?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export const userStore = new UserStore();