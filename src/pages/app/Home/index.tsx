import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { RobotForm } from './components/robot-form'
import { robotService } from '@/services/robot-service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { RobotCard } from './components/robot-card'

export function Home() {
  const [openRobotForm, setOpenRobotForm] = useState(false)

  const { data: robots = [], isLoading: isLoadingRobots } = useQuery({
    queryKey: ['robots'],
    queryFn: robotService.list,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  function handleCloseRobotForm() {
    setOpenRobotForm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex">
        <h2>Filtros</h2>

        <Dialog open={openRobotForm} onOpenChange={setOpenRobotForm}>
          <DialogTrigger asChild>
            <Button className="ml-auto" size="sm">
              Novo robô
            </Button>
          </DialogTrigger>

          <RobotForm
            open={openRobotForm}
            handleCloseRobotForm={handleCloseRobotForm}
          />
        </Dialog>
      </div>

      <section className="space-y-2">
        <h2 className="text-2xl">Lista de robôs</h2>

        <ul className="grid grid-cols-4 gap-8">
          {robots.map(robot => (
            <li key={robot.id}>
              <RobotCard robot={robot} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
