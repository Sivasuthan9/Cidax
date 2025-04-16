import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'

const SyncUser = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('User not found!')
  }

  const user = await clerkClient.users.getUser(userId)
  const email = user.emailAddresses[0]?.emailAddress
  if (!email) {
    return notFound()
  }

  await db.user.upsert({
    where: {
      emailAddress: email,
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      emailAddress: email,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  return redirect('/dashboard')
}

export default SyncUser
