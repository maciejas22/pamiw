import * as jose from 'jose'
import { jwtConfig } from '../config'

export const generateToken = async (payload: jose.JWTPayload) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: jwtConfig.signingAlgorithm })
    .setIssuedAt()
    .setExpirationTime(jwtConfig.expirationTime.access)
    .sign(jwtConfig.secret.access)
}

export const decodeToken = async (token: string) => {
  const { payload } = await jose.jwtVerify(token, jwtConfig.secret.access, {
    algorithms: [jwtConfig.signingAlgorithm],
  })
  return payload
}
