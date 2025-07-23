import { UserStore } from "$lib/state/User.svelte";
import {userGetRequest} from "$lib/api/userApi";

export const load = async () => {
  const userStore = new UserStore();

  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const res = await userGetRequest(token);
      userStore.user = res?.data;
      return {
        user: userStore.user
      }
    } catch (e) {
      console.log(e);
      userStore.user = null;
      return {user: null}
    }
  } else {
    userStore.user = null;
    return {user: null}
  }
}