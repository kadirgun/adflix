import Guest from '@/middleware/Guest'
import React from 'react'

const AuthLayout = ({children}: any) => {
  Guest();
  return (
    <>
      <h1>Auth</h1>
      {children}
    </>
  )
}

export default AuthLayout