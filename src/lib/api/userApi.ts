import axiosInstance from "$lib/api/axiosInstance";

interface RegisterRequest {
  username?: string;
  email: string;
  password: string;
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