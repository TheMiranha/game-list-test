import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface IFormViewProps {
  email: string
  password: string
  confirmPassword: string
  setEmail: (e: string) => void
  setPassword: (e: string) => void
  setConfirmPassword: (e: string) => void
  handleCreateAccount: () => void
  handleSignIn: () => void
}

export const FormView = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSignIn,
  handleCreateAccount
}: IFormViewProps) => {
  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center">
      <Tabs defaultValue="signin" className="w-3/4 md:w-[480px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>
                Insira suas credenciais para entrar
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-end">
              <Button onClick={() => handleSignIn()}>Entrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>
                Insira suas credenciais para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-end">
              <Button onClick={() => handleCreateAccount()}>Criar conta</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
