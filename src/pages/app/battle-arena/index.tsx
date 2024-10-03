import { Button } from '@/components/ui/button'
import { robotService, type IRobot } from '@/services/robot-service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'
import { RobotCard } from '../home/components/robot-card'
import { battleRobots } from '@/utils/battle-robots'
import { BattleArenaBox } from './components/battle-arena-box'
import { WinnerRobotInfo } from './components/winner-robot-info'

export function BattleArena() {
  const { data: robots = [] } = useQuery({
    queryKey: ['robots'],
    queryFn: robotService.list,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const [redRobot, setRedRobot] = useState<IRobot | null>(null)
  const [yellowRobot, setYellowRobot] = useState<IRobot | null>(null)
  const [winnerRobot, setWinnerRobot] = useState<IRobot | null>(null)

  const [isSelectingRedRobot, setIsSelectingRedRobot] = useState<boolean>(false)
  const [isSelectingYellowRobot, setIsSelectingYellowRobot] =
    useState<boolean>(false)

  function handleToggleRobotCheckBox(
    type: 'red' | 'yellow',
    value: Checkbox.CheckedState
  ) {
    if (type === 'red') {
      setIsSelectingYellowRobot(false)
      setIsSelectingRedRobot(value === 'indeterminate' ? false : value)
    }

    if (type === 'yellow') {
      setIsSelectingRedRobot(false)
      setIsSelectingYellowRobot(value === 'indeterminate' ? false : value)
    }
  }

  const isSelectingRobot = isSelectingRedRobot || isSelectingYellowRobot

  function handleSelectRobot(robotId: string) {
    const robotSelected = robots.find(robot => robot.id === robotId)
    if (!robotSelected) return

    if (isSelectingRedRobot) {
      setRedRobot(robotSelected)
      setIsSelectingRedRobot(false)
    }

    if (isSelectingYellowRobot) {
      setYellowRobot(robotSelected)
      setIsSelectingYellowRobot(false)
    }
  }

  const robotsAvailable = robots.filter(robot => {
    return robot.id !== redRobot?.id && robot.id !== yellowRobot?.id
  })

  const shouldStartBattle = !!redRobot && !!yellowRobot

  function handleBattle() {
    if (!shouldStartBattle) return

    const winnerRobot = battleRobots(redRobot, yellowRobot)
    setWinnerRobot(winnerRobot)
  }

  function handleResetBattle() {
    setRedRobot(null)
    setYellowRobot(null)
    setWinnerRobot(null)
  }

  return (
    <div className="space-y-4">
      <BattleArenaBox redRobot={redRobot} yellowRobot={yellowRobot} />

      <div className="grid grid-cols-3">
        <Checkbox.Root
          checked={isSelectingRedRobot}
          onCheckedChange={value => handleToggleRobotCheckBox('red', value)}
          asChild
        >
          <Button
            disabled={!!winnerRobot}
            className={cn(
              'mr-auto text-foreground text-md font-medium h-14 rounded-full',
              {
                'bg-red-800/20 hover:bg-red-800/40': !isSelectingRedRobot,
                'bg-red-800/80 hover:bg-red-800': isSelectingRedRobot,
              }
            )}
          >
            <Checkbox.Indicator className="absolute w-full h-full flex items-center justify-center" />

            <strong className="font-bold">
              {isSelectingRedRobot
                ? 'Selecionando'
                : redRobot
                  ? 'Trocar'
                  : 'Selecionar'}{' '}
              oponente vermelho
            </strong>
          </Button>
        </Checkbox.Root>

        <Button
          disabled={!shouldStartBattle || !!winnerRobot}
          onClick={handleBattle}
          className="h-14 bg-gradient-to-r from-red-500 to-yellow-400  hover:bg-gradient-to-l shadow-2xl rounded-full font-bold text-2xl"
        >
          Começar batalha
        </Button>

        <Checkbox.Root
          checked={isSelectingYellowRobot}
          onCheckedChange={value => handleToggleRobotCheckBox('yellow', value)}
          asChild
        >
          <Button
            disabled={!!winnerRobot}
            className={cn(
              'ml-auto text-foreground text-md font-medium h-14 rounded-full',
              {
                'bg-yellow-800/20 hover:bg-yellow-800/40':
                  !isSelectingYellowRobot,
                'bg-yellow-800/80 hover:bg-yellow-800': isSelectingYellowRobot,
              }
            )}
          >
            <Checkbox.Indicator className="absolute w-full h-full flex items-center justify-center" />

            <strong className="font-bold">
              {isSelectingYellowRobot
                ? 'Selecionando'
                : yellowRobot
                  ? 'Trocar'
                  : 'Selecionar'}{' '}
              oponente amarelo
            </strong>
          </Button>
        </Checkbox.Root>
      </div>

      {isSelectingRobot && (
        <div className="mt-4 grid grid-cols-4 gap-8">
          {robotsAvailable.map(robot => (
            <RobotCard
              key={robot.id}
              onClick={() => handleSelectRobot(robot.id)}
              robot={robot}
            />
          ))}
        </div>
      )}

      {winnerRobot && (
        <WinnerRobotInfo
          winnerRobot={winnerRobot}
          handleResetBattle={handleResetBattle}
        />
      )}
    </div>
  )
}
