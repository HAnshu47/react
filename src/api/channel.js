import http from '../request/axios'

export function channelListAPI() {
  return http.get('/channels')
}
