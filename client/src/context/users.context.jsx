import { createContext, useState, useContext} from "react";

const updateUsersStatus = (users, usersToUpdate, value) => {
  if(!usersToUpdate) return
  for(let i = 0; i < users.length; i++) {
    for(let j = 0; j< usersToUpdate.length; j++) {
      if(users[i]._id === usersToUpdate[j]._id) {
         users[i]['status'] = value
      }
    }
  }
  return new Array(...users)
}
 
const deleteUser = (users, usersToDelete) => {
  if(!users) throw new Error ("there are no users")

  return users.filter(user => {
    return !usersToDelete.some(userToDelete => {
      return user._id === userToDelete._id;
    });
  });
}

export const UsersContext = createContext({
  users: [],
  updateUserData: () => {},
  setUserToUpdate: () => {},
  isLoading: false,
  setLoading:() => null,
  setUsers: () => {},
})

export const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [usersToUpdate, setUserToUpdate] = useState([]);
  const [isLoading, setLoading] = useState(false)

  const updateUserData  = (value) => {
    setUsers(updateUsersStatus(users, usersToUpdate, value))
  }

  const deleteUsers = () => {
    setUsers(deleteUser(users, usersToUpdate))
  }

  const value = {updateUserData, users, setUserToUpdate, usersToUpdate, deleteUsers, isLoading, setLoading, setUsers}

  return (
    <UsersContext.Provider value={value} >{children}</UsersContext.Provider>
  )
}

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("useUsersContext was used outside of its Provider");
  }

  return context;
};