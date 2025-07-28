import {userGetRequest} from "$lib/api/userApi";
import {userStore} from "$lib/state/User.svelte";

export const load = async () => {
  let user = userStore.user;
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const res = await userGetRequest(token);
      user = res?.data;
      return {
        user: user
      }
    } catch (e) {
      console.log(e);
      user = null;
      return {user: null}
    }
  } else {
    user = null;
    return {user: null}
  }
}