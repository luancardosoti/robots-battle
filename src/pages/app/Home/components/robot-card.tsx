import type { IRobot } from '@/services/robot-service'

interface RobotCardProps {
  robot: IRobot
}

export function RobotCard({ robot }: RobotCardProps) {
  return (
    <div className="font-robot font-bold flex flex-col items-center shadow-lg rounded-md p-4 border-2">
      <img className="w-40 h-40" src={robot.imageUrl} alt={robot.name} />
      <h3 className="text-2xl">{robot.name}</h3>
      <div className="mt-4 flex justify-between gap-4 text-sm">
        <div>
          <p>Ataque: {robot.attack}</p>
          <p>Defesa: {robot.defense}</p>
        </div>

        <div>
          <p>Velocidade: {robot.speed}</p>
          <p>HP: {robot.hp}</p>
        </div>
      </div>
    </div>
  )
}
