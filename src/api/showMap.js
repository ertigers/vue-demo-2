import ajax from '@/api/ajax.js';
const base_url = 'http://127.0.0.1:9585/icvs2/'

// xxx
export const xxx = (params) => {
  return ajax('post',`${base_url}login`, params);
}

