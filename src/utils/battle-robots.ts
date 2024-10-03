import type { IRobot } from '@/services/robot-service'

export function battleRobots(robot1: IRobot, robot2: IRobot): IRobot {
  let attacker: IRobot | null = null
  let defender: IRobot | null = null

  const hasSameAttributes =
    robot1.attack === robot2.attack &&
    robot1.speed === robot2.speed &&
    robot1.defense === robot2.defense &&
    robot1.hp === robot2.hp

  if (
    robot1.speed > robot2.speed ||
    (robot1.speed === robot2.speed && robot1.attack > robot2.attack) ||
    hasSameAttributes
  ) {
    attacker = robot1
    defender = robot2
  } else {
    attacker = robot2
    defender = robot1
  }

  while (attacker.hp > 0 && defender.hp > 0) {
    const damage = Math.max(attacker.attack - defender.defense, 1)

    defender.hp -= damage

    if (defender.hp <= 0) {
      return attacker
    }
    ;[attacker, defender] = [defender, attacker]
  }

  return attacker.hp > 0 ? attacker : defender
}
