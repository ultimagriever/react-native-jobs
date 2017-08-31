import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';

import {
  CLEAR_LIKED_JOBS,
  FETCH_JOBS,
  LIKE_JOB
} from './types';

const request = axios.create({
  baseURL: 'http://api.indeed.com/ads/apisearch'
});

const getParams = zip => ({
  params: {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript',
    l: zip
  }
});

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    const zip = await reverseGeocode(region);
    const params = getParams(zip);

    const { data } = await request.get('', params);
    dispatch({ type: FETCH_JOBS, payload: data });
    typeof callback === 'function' && callback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = job => ({
  type: LIKE_JOB,
  payload: job
});

export const clearLikedJobs = () => ({
  type: CLEAR_LIKED_JOBS
});
