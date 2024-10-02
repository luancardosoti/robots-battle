import { Button } from '@/components/ui/button'
import { robotService } from '@/services/robot-service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'
import { RobotCard } from '../home/components/robot-card'

export function BattleArena() {
  const { data: robots = [] } = useQuery({
    queryKey: ['robots'],
    queryFn: robotService.list,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const [redRobotOpponentId, setRedRobotOpponentId] = useState<string | null>(
    null
  )
  const [yellowRobotOpponentId, setYellowRobotOpponentId] = useState<
    string | null
  >(null)
  const [isSelectingRedOpponent, setIsSelectingRedOpponent] =
    useState<boolean>(false)
  const [isSelectingYellowOpponent, setIsSelectingYellowOpponent] =
    useState<boolean>(false)

  function handleToggleRedOpponentCheckBox(value: Checkbox.CheckedState) {
    setIsSelectingYellowOpponent(false)
    setIsSelectingRedOpponent(value === 'indeterminate' ? false : value)
  }

  function handleToggleYellowOpponentCheckBox(value: Checkbox.CheckedState) {
    setIsSelectingRedOpponent(false)
    setIsSelectingYellowOpponent(value === 'indeterminate' ? false : value)
  }

  const redRobot = robots.find(robot => robot.id === redRobotOpponentId)
  const yellowRobot = robots.find(robot => robot.id === yellowRobotOpponentId)

  const isSelectingOpponent =
    isSelectingRedOpponent || isSelectingYellowOpponent

  function handleSelectOpponent(robotId: string) {
    if (isSelectingRedOpponent) {
      setRedRobotOpponentId(robotId)
      setIsSelectingRedOpponent(false)
    }

    if (isSelectingYellowOpponent) {
      setYellowRobotOpponentId(robotId)
      setIsSelectingYellowOpponent(false)
    }
  }

  const robotsAvailable = robots.filter(robot => {
    return robot.id !== redRobotOpponentId && robot.id !== yellowRobotOpponentId
  })

  const shouldStartBattle = redRobot && yellowRobot

  return (
    <div className="space-y-4">
      <div className="border rounded-md flex h-96 bg-battle-versus bg-cover bg-center relative">
        {redRobot && (
          <div className="absolute left-0 top-0 bottom-0 font-robot font-bold flex flex-col items-center rounded-md px-4">
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
          <div className="absolute right-0 top-0 bottom-0 font-robot font-bold flex flex-col items-center rounded-md px-4">
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

      <div className="grid grid-cols-3">
        <Checkbox.Root
          checked={isSelectingRedOpponent}
          onCheckedChange={handleToggleRedOpponentCheckBox}
          asChild
        >
          <Button
            size="lg"
            variant="outline"
            className={cn(
              'mr-auto text-foreground text-md font-medium h-14 rounded-full',
              {
                'bg-red-800/20 hover:bg-red-800/40': !isSelectingRedOpponent,
                'bg-red-800/80 hover:bg-red-800': isSelectingRedOpponent,
              }
            )}
          >
            <Checkbox.Indicator className="absolute w-full h-full flex items-center justify-center" />

            <strong>
              {isSelectingRedOpponent
                ? 'Selecionando'
                : redRobot
                  ? 'Trocar'
                  : 'Selecionar'}{' '}
              oponente vermelho
            </strong>
          </Button>
        </Checkbox.Root>

        <Button
          disabled={!shouldStartBattle}
          className="h-14 bg-gradient-to-r from-red-500 to-yellow-400  hover:bg-gradient-to-l shadow-2xl rounded-full font-bold font-robot text-2xl"
        >
          Começar batalha
        </Button>

        <Checkbox.Root
          checked={isSelectingYellowOpponent}
          onCheckedChange={handleToggleYellowOpponentCheckBox}
          asChild
        >
          <Button
            size="lg"
            variant="outline"
            className={cn(
              'ml-auto text-foreground text-md font-medium h-14 rounded-full',
              {
                'bg-yellow-800/20 hover:bg-yellow-800/40':
                  !isSelectingYellowOpponent,
                'bg-yellow-800/80 hover:bg-yellow-800':
                  isSelectingYellowOpponent,
              }
            )}
          >
            <Checkbox.Indicator className="absolute w-full h-full flex items-center justify-center" />

            <strong>
              {isSelectingYellowOpponent
                ? 'Selecionando'
                : yellowRobot
                  ? 'Trocar'
                  : 'Selecionar'}{' '}
              oponente amarelo
            </strong>
          </Button>
        </Checkbox.Root>
      </div>

      {isSelectingOpponent && (
        <div className="mt-4 grid grid-cols-4 gap-8">
          {robotsAvailable.map(robot => (
            <RobotCard
              key={robot.id}
              onClick={() => handleSelectOpponent(robot.id)}
              robot={robot}
            />
          ))}
        </div>
      )}
    </div>
  )
}
