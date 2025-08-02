import {userGetRequest} from "$lib/api/userApi";
import {userStore} from "$lib/state/User.svelte";

export const load = async () => {
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