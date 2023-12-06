import { $Enums } from '@prisma/client'

export interface JWTPayloadType {
  id: number
  username: string
  role: $Enums.Role
}
