import axiosInstance from "$lib/api/axiosInstance";

export interface SessionRequestPayload {
  labelId?: number | null;
  duration: number;
  hour?: number;
  type: string;
  isCompleted?: boolean;
}

export const createSessionRequest = async (payload: SessionRequestPayload) => {
  try {
    const res = await axiosInstance.post('/session', payload);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateSessionRequest = async (id: number, payload: SessionRequestPayload) => {
  if(!id) return;

  try {
    const res = await axiosInstance.patch('/session/' + id, payload);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}