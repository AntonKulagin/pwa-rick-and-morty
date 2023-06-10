import { createContext, useContext, FC, PropsWithChildren, useState } from 'react'

export interface IAuth {
  userEmail: string | null
  signin: (newUserEmail: string, callback: () => void) => void
  signout: (callback: () => void) => void
}

const initialValue: IAuth = {
  userEmail: '',
  signin: () => {},
  signout: () => {},
}

const AuthContext = createContext<IAuth>(initialValue)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('userEmail') || null)

  const signin = (newUserEmail: string, callback: () => void): void => {
    setUserEmail(newUserEmail)
    localStorage.setItem('userEmail', newUserEmail)
    callback()
  }

  const signout = (callback: () => void): void => {
    setUserEmail(null)
    localStorage.removeItem('userEmail')
    localStorage.setItem('activePage', '/')
    callback()
  }

  const value = {
    userEmail,
    signin,
    signout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
