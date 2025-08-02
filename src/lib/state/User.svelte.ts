interface User {
  email: string;
  id: number;
  username: string;
}

class UserStore {
  user: User | null = $state<User | null>(null);
}

export const userStore = new UserStore();