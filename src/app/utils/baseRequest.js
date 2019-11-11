import axios from 'axios';

export async function baseGet(route) {
  try {
    const response = await axios.get(route);
    return response.data;
  } catch (error) {
    return {
      status: 'error',
    };
  }
}

export async function basePost(route, content) {
  try {
    const response = await axios.post(route, content);
    return response.data;
  } catch (error) {
    return {
      status: 'error',
    };
  }
}

export async function basePatch(route, content) {
  try {
    const response = await axios.patch(route, content);
    return response.data;
  } catch (error) {
    return {
      status: 'error',
    };
  }
}
