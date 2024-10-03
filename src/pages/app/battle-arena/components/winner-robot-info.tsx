import { Button } from '@/components/ui/button'
import type { IRobot } from '@/services/robot-service'

interface WinnerRobotInfoProps {
  winnerRobot: IRobot
  handleResetBattle: () => void
}

export function WinnerRobotInfo({
  winnerRobot,
  handleResetBattle,
}: WinnerRobotInfoProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <img
        className="w-40 h-40"
        src={winnerRobot.imageUrl}
        alt={winnerRobot.name}
      />
      <h2 className="text-2xl font-bold">
        🎉 O vencedor é {winnerRobot.name} 🎉
      </h2>

      <Button
        variant="secondary"
        className="font-bold"
        onClick={handleResetBattle}
      >
        Nova batalha
      </Button>
    </div>
  )
}
