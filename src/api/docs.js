import http from '../request/axios';

export function getDocsListAPI(payload) {
  return http.get('/mp/articles', { params: payload });
}

export function deleteDocsAPI(id) {
  return http.delete(`/mp/articles/${id}`);
}

export function recordDetailsAPI(id) {
  return http.get(`/mp/articles/${id}`);
}

export function putDocsAPI(payload, id) {
  if (id) {
    return http.put(`/mp/articles/${id}`, payload);
  } else {
    return http.post('/mp/articles', payload);
  }
}
