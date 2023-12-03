export const jwtConfig = {
  signingAlgorithm: 'HS256',
  secret: {
    access: new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
  },
  expirationTime: {
    access: '7d',
  },
}
