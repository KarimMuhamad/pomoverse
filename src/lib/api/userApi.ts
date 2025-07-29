import axiosInstance from "$lib/api/axiosInstance";

interface RegisterRequest {
  username?: string;
  email: string;
  password: string;
}

interface UpdatePreferencesRequest {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export const refreshTokenRequest = async () => {
  try {
    const res = await axiosInstance.post('/auth/refresh', {}, {
      withCredentials: true,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const userRegisterRequest = async (payload: RegisterRequest) => {
  try {
    const res = await axiosInstance.post('/auth/register', {
      username: payload.username,
      email: payload.email,
      password: payload.password
    }, {skipAuth: true});

    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const userLoginRequest = async (payload: RegisterRequest) => {
  try {
    const res = await axiosInstance.post('/auth/login', {
      email: payload.email,
      password: payload.password
    }, {skipAuth: true});

    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const userGetRequest = async (accessToken: string) => {
  try {
    const res = await axiosInstance.get('/users/me');
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const userLogoutRequest = async () => {
  try {
    const res = await axiosInstance.delete('/auth/logout');
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getUserPreferencesRequest = async () => {
  try {
    const res = await axiosInstance.get('/users/preferences');
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const updatePreferencesRequest = async (payload: UpdatePreferencesRequest) => {
  try {
    const res = await axiosInstance.patch('/users/preferences', payload);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getUserSetting = async () => {
  try {
    const res = await axiosInstance.get('/users/setting');
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}