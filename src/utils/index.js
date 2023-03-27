import { v4 as uuidv4 } from 'uuid'

//生成模拟token并保存到localStorage
export const getUUID = () => {
  //先查本地存储是否存在
  let uuid_token = localStorage.getItem('user_token')
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('user_token', uuid_token)
  }
  return uuid_token
}
