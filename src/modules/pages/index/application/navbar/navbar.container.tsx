'use client'

import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Separator } from '../../../../../components/ui/separator'
import { useEffect, useState } from 'react'
import { useAuthentication } from '@/modules/contexts/authentication/application/authentication.context'
import { SignOut } from '@/modules/contexts/authentication/infrastructure/FirebaseAuthentication'
import { useRouter } from 'next/router'

export const NavbarContainer = () => {
  const { userData } = useAuthentication()

  const { push } = useRouter()

  const handleSignOut = async () => {
    await SignOut()
    window.location.reload()
  }

  const handleSignIn = () => {
    push('/auth')
  }

  return (
    <div className="h-[75px] grid grid-cols-2 w-full">
      <div className="h-full col-span-1 hidden md:flex items-center px-4">
        <Label className="text-lg tracking-wide ">Lucas Miranda</Label>
      </div>
      <div className="h-full col-span-2 md:col-span-1 flex justify-end items-center gap-2 px-4">
        {userData ? (
          <Button onClick={handleSignOut}>Sair</Button>
        ) : (
          <Button onClick={handleSignIn}>Entrar</Button>
        )}
      </div>
      <Separator orientation="horizontal" className="col-span-2" />
    </div>
  )
}
