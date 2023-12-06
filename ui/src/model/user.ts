export interface User {
  id: number
  usernmae: string
  password: string
  role: string
}

export interface ILoginUserInput {
  username: string
  password: string
}
