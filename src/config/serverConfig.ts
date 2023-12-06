const envs = ['development', 'production'] as const
export type Env = (typeof envs)[number]

export interface IServerConfig {
  port: number
  env: Env
}

const isTypeOfEnv = (env: unknown): env is Env => {
  return typeof env === 'string' && envs.includes(env as Env)
}

export const serverConfig: IServerConfig = {
  port: Number(process.env.NODE_PORT) || 3000,
  env: isTypeOfEnv(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
}
