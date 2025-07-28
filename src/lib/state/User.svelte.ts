interface User {
  email: string;
  id: number;
  username: string;
}

class UserStore {
  #user: User | null = $state<User | null>(null);

  set user(user: User | null) {
    this.#user = user;
  }

  get user() {
    return this.#user;
  }
}

export const userStore = new UserStore();