import axiosInstance from "$lib/api/axiosInstance";

export const getAllLabelsRequest = async () => {
  try {
    const res = await axiosInstance.get('/labels');
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const addLabelRequest = async (payload: any) => {
  try {
    const res = await axiosInstance.post('/labels', payload);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}