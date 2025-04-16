'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in</div>

  return <div>Welcome, {user.firstName}!</div>
}

export default DashboardPage
