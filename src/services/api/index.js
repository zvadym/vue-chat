import axios from '@/axios'

const USER_DETAILS = 'user/details/{pk}/'
const ROOMS_LIST = 'rooms/'
const ROOM_DETAILS = 'rooms/{pk}/'
const MESSAGE_LIST = 'rooms/{room_pk}/messages/'

export default {
  login({ email, password }) {
    return axios
      .post(process.env.VUE_APP_API_LOGIN_URL, {
        username: email,
        password: password
      })
      .then(response => {
        return {
          accessToken: response.data.access,
          refreshToken: response.data.refresh
        }
      })
  },
  logout({ refreshToken }) {
    return axios.post(process.env.VUE_APP_API_LOGOUT_URL, {
      refresh: refreshToken
    })
  },
  refresh({ refreshToken }) {
    return axios.post(process.env.VUE_APP_API_REFRESH_URL, {
      refresh: refreshToken
    })
  },
  verify({ refreshToken }) {
    return axios.post(process.env.VUE_APP_API_VERIFY_URL, {
      token: refreshToken
    })
  },
  getUserData(id) {
    return axios
      .get(USER_DETAILS.replace('{pk}', id))
      .then(response => response.data)
  },
  getRooms() {
    return axios.get(ROOMS_LIST).then(response => response.data)
  },
  createRoom(instance) {
    return axios
      .post(ROOMS_LIST, {
        title: instance.title,
        is_private: instance.isPrivate,
        members: instance.memberIds
      })
      .then(response => response.data)
  },
  updateRoom(instance) {
    return axios.put(ROOM_DETAILS.replace('{pk}', instance.id), {
      id: instance.id,
      title: instance.title,
      members: instance.members,
      is_private: instance.isPrivate
    })
  },
  createMessage(instance) {
    return axios
      .post(MESSAGE_LIST.replace('{room_pk}', instance.roomId), {
        message: instance.message
      })
      .then(response => response.data)
  },
  getMessages(roomId) {
    return axios
      .get(MESSAGE_LIST.replace('{room_pk}', roomId))
      .then(response => response.data)
  }
}
