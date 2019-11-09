import axios from 'axios';

export async function baseGet(route) {
  try {
    const response = await axios.get(route);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
    };
  }
}
