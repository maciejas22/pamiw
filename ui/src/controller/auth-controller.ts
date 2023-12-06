import { path } from '../config/paths.ts'
import { ILoginUserInput } from '../model'
import api from '../utils/api'

export const loginUser = async (user: ILoginUserInput) => {
  return await api
    .post<ILoginUserInput>(`${path.auth.login}`, user)
    .then((response) => response.data)
}
