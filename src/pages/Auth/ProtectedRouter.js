import React from 'react'
import {Navigate} from 'react-router-dom'
import { UserAuth } from './AuthContext/AuthContext'
export const ProtectedRouter = ({children}) => {
    const {user} = UserAuth()
    if(!user) {
        return (<Navigate to ='/auth/sign-in' />)
    }
  return children
}
