import { api } from '@/lib/axios'

export interface IRobot {
  id: string
  name: string
  attack: number
  defense: number
  speed: number
  hp: number
  imageUrl: string
}

interface IRobotCreateBody {
  name: string
  attack: number
  defense: number
  speed: number
  hp: number
  imageUrl: string
}

export const robotService = {
  async create(body: IRobotCreateBody) {
    const { data } = await api.post<IRobot>('/robots', body)
    return data
  },
  async list() {
    const { data } = await api.get<IRobot[]>('/robots')
    return data
  },
}
