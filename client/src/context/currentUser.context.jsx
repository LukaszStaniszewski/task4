import { createContext, useState, useEffect, useContext} from "react";
import * as api from "../api/axios-Instance.api"


const logInUser = async () => {
  try {
    const loggedUser = await api.fetchAuthUser()
    return loggedUser.data
  } catch (error) {
    console.error(error)
  }
}

export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => null,
  authenticateAndSetUser: () => null,
  setLoading: () => null
})

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setLoading] = useState(false)

   const authenticateAndSetUser = async () => {
    let token = localStorage.getItem("token")
    if(!token) return setCurrentUser(null)
    
    const user = await logInUser()
    setCurrentUser(user)
  }
  useEffect(() => {
   
  }, [currentUser])
  const value = {currentUser,setCurrentUser, authenticateAndSetUser, setLoading, isLoading}

  return (
    <CurrentUserContext.Provider value={value} >{children}</CurrentUserContext.Provider>
  )
}

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (context === undefined) {
    throw new Error("useCurrentUserContext was used outside of its Provider");
  }
  return context;
};