import { NextResponse } from 'next/server'
import { getUserFromRequest, verifyPassword, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const user = await getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  return NextResponse.json({ user })
}

export async function PUT(request: Request) {
  const user = await getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, phone, currentPassword, newPassword } = body

    // Alterar senha
    if (currentPassword && newPassword) {
      const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { passwordHash: true },
      })

      if (!fullUser) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
      }

      const validPassword = await verifyPassword(currentPassword, fullUser.passwordHash)
      if (!validPassword) {
        return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'A nova senha deve ter pelo menos 6 caracteres' }, { status: 400 })
      }

      const newHash = await hashPassword(newPassword)
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      })

      return NextResponse.json({ message: 'Senha alterada com sucesso' })
    }

    // Atualizar perfil
    const updateData: Record<string, string> = {}
    if (name) updateData.name = name
    if (phone !== undefined) updateData.phone = phone

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, role: true, verified: true },
    })

    return NextResponse.json({ user: updated })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
