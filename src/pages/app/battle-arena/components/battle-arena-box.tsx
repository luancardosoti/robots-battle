import type { IRobot } from '@/services/robot-service'

interface BattleArenaBoxProps {
  redRobot?: IRobot | null
  yellowRobot?: IRobot | null
}

export function BattleArenaBox({ redRobot, yellowRobot }: BattleArenaBoxProps) {
  return (
    <div className="border rounded-md flex h-96 bg-battle-versus bg-cover bg-center relative">
      {redRobot && (
        <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center rounded-md px-4">
          <img
            className="w-40 h-40 rounded-full"
            src={redRobot.imageUrl}
            alt={redRobot.name}
          />
          <h3 className="mt-2 text-2xl bg-red-800 py-1 px-4 rounded-full shadow-lg capitalize">
            {redRobot.name}
          </h3>
          <div className="mt-4 flex justify-between gap-4 text-lg bg-red-800 shadow-lg p-2 rounded-md">
            <div>
              <p>Ataque: {redRobot.attack}</p>
              <p>Defesa: {redRobot.defense}</p>
            </div>

            <div>
              <p>Velocidade: {redRobot.speed}</p>
              <p>HP: {redRobot.hp}</p>
            </div>
          </div>
        </div>
      )}

      {yellowRobot && (
        <div className="absolute right-0 top-0 bottom-0 font-bold flex flex-col items-center rounded-md px-4">
          <img
            className="w-40 h-40 rounded-full"
            src={yellowRobot.imageUrl}
            alt={yellowRobot.name}
          />
          <h3 className="mt-2 text-2xl bg-yellow-600 py-1 px-4 rounded-full shadow-lg capitalize">
            {yellowRobot.name}
          </h3>
          <div className="mt-4 flex justify-between gap-4 text-lg bg-yellow-600 p-2 rounded-md">
            <div>
              <p>Ataque: {yellowRobot.attack}</p>
              <p>Defesa: {yellowRobot.defense}</p>
            </div>

            <div>
              <p>Velocidade: {yellowRobot.speed}</p>
              <p>HP: {yellowRobot.hp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
