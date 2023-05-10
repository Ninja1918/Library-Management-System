import axios from 'axios';
import { defaultParams, googleBooks, openLibrary } from '..';

export async function getVolume(url, params = {}) {
  try {
    const response = await axios.get(`${openLibrary}${url}`, {
      params: { ...defaultParams, ...params },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
