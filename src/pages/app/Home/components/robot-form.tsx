import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { robotService, type IRobot } from '@/services/robot-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const defaultValidationNumber = z.coerce
  .number({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Campo inválido',
  })
  .int({ message: 'O campo deve ser um número inteiro' })
  .min(0, { message: 'Valor mínimo deve ser 0' })
  .max(100, { message: 'Valor máximo deve ser 100' })

const formSchema = z.object({
  imageUrl: z.string({ required_error: 'Campo obrigatório' }),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  attack: defaultValidationNumber,
  defense: defaultValidationNumber,
  speed: defaultValidationNumber,
  hp: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo inválido',
    })
    .int({ message: 'O campo deve ser um número inteiro' })
    .min(0, { message: 'Valor mínimo deve ser 0' })
    .max(200, { message: 'Valor máximo deve ser 100' }),
})

type RobotFormValues = z.infer<typeof formSchema>

interface RobotFormProps {
  handleCloseRobotForm: () => void
  open: boolean
}

export function RobotForm({ open, handleCloseRobotForm }: RobotFormProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: handleAddRobot } = useMutation({
    mutationFn: robotService.create,
    onSuccess(newRobot) {
      form.reset()
      queryClient.setQueryData<IRobot[]>(['robots'], oldData => {
        if (oldData) {
          return [...oldData, newRobot]
        }
      })
      toast.success('Robô adicionado com sucesso!')
      handleCloseRobotForm()
    },
  })

  const form = useForm<RobotFormValues>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: RobotFormValues) {
    await handleAddRobot({
      name: values.name,
      attack: values.attack,
      defense: values.defense,
      speed: values.speed,
      hp: values.hp,
      imageUrl: values.imageUrl,
    })
  }

  function generateRandomRobotImage() {
    const randomString = Math.random().toString(36).substring(7)
    const imageUrl = `https://robohash.org/${randomString}.png`
    form.setValue('imageUrl', imageUrl)
  }

  const imageUrl = form.watch('imageUrl')

  useEffect(() => {
    form.reset()
    generateRandomRobotImage()
    form.clearErrors()
  }, [open])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicione um robô na sua coleção</DialogTitle>
        <DialogDescription>
          Insira as informações do robô que deseja adicionar.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-center justify-center">
                  <img
                    src={imageUrl}
                    className="w-20 h-20 rounded-full"
                    alt="url inválida"
                  />
                </div>

                <FormLabel>Url da Imagem</FormLabel>
                <div className="flex gap-4">
                  <FormControl>
                    <Input placeholder="https://minhaimagem.com" {...field} />
                  </FormControl>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={generateRandomRobotImage}
                  >
                    gerar imagem
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <FormField
              control={form.control}
              name="attack"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Ataque</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Velocidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defense"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Defesa</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hp"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>HP</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2 items-center justify-end">
            <DialogClose>
              <Button
                type="button"
                variant="ghost"
                onClick={handleCloseRobotForm}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
