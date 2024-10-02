import { useEffect, useState } from 'react'

interface IMonster {
  name: string
  attack: number
  defense: number
  speed: number
  hp: number
  image_url: string
}

export function Home() {
  const [monsters, setMonsters] = useState<IMonster[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/monsters')
      const data = await response.json()
      setMonsters([...data, ...data, ...data])
    })()
  }, [])

  return (
    <div>
      <h1 className="text-6xl">Home</h1>

      <section>
        <h2 className="text-2xl">Lista de robôs</h2>
        <ul className="flex flex-wrap gap-8">
          {monsters.map((monster, i) => (
            <li
              key={i}
              className="flex flex-col items-center shadow-lg rounded-2xl p-4"
            >
              <img
                className="w-20 h-20"
                src={monster.image_url}
                alt={monster.name}
              />
              <h3>{monster.name}</h3>
              <div className="flex justify-between gap-4 text-sm">
                <div>
                  <p>Ataque: {monster.attack}</p>
                  <p>Defesa: {monster.defense}</p>
                </div>

                <div>
                  <p>Velocidade: {monster.speed}</p>
                  <p>HP: {monster.hp}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
