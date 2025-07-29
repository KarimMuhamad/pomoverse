import axiosInstance from "$lib/api/axiosInstance";

export const getAllLabelsRequest = async () => {
  try {
    const res = await axiosInstance.get('/labels');
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}