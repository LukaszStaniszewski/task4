import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {ReactComponent as UnblockIcon} from '../../assets/unblock-icon.svg'

import ManagementTable from "../../components/management-table/management-table.component"
import { useUsersContext } from "../../context/users.context"
import { useCurrentUserContext } from "../../context/currentUser.context"
import Spinner from "../../components/spinner/spinner.comonent"
import * as api from "../../api/axios-Instance.api"

const UserManagement = () => {
  const [isChecked, setCheckBox] = useState(false)
  const {users , updateUserData, usersToUpdate, deleteUsers, setUsers} = useUsersContext()
  const {currentUser, setCurrentUser, setLoading, isLoading} =  useCurrentUserContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(currentUser && !users.length) {
      (async() =>  {
        setLoading(true)
        const users = await api.fetchUsers()
        setUsers(users.data)
        setLoading(false)
      })()
    }
  }, [currentUser])

  if(isLoading) {
    return <Spinner/>
  }

  const selectAllUsers = event => setCheckBox(event.target.checked)
  
  const blockUsersHandler = async () => {
    updateUserData('blocked')
    try {
    const response = await api.updateUsers(usersToUpdate)
    await logOut()
    } catch(error) {
      console.error(error)
    }
  }

  const unblockUsersHandler = async () => {
    updateUserData('active')
    await api.updateUsers(usersToUpdate)
  }

  const deleteUsersHandler = async () => {
    deleteUsers()
    try{
      const repsonse = await api.deleteUsers(usersToUpdate)
      await logOut()
    } catch(error) {
      console.error(error)
    }
  }

  const logOut = async () => {
    const userExist = usersToUpdate.find(user => currentUser.user._id === user._id)
    if(userExist) {
      await api.deleteSession()
      localStorage.removeItem("token");
      setCurrentUser(null)
      navigate('/')
    }
  }

  return (
    <section className = "w-40vw mt-10 w-min-max h-scren h-max-screen mx-auto xl:w-60vw lg:w-80vw sm:w-95vw">
      <div className="flex justify-between items-center pb-3">
        <div className="flex">
          <input className="mx-2 checkbox after:content-['Select_All'] after:ml-10 after:text-black after:absolute text-normal font-medium"type='checkbox' onClick={selectAllUsers}></input>
        </div>
        <button className="btn btn-error btn-sm" onClick={blockUsersHandler}>block</button>
        <div className="cursor-pointer tooltip tooltip-left" data-tip="unblock user" onClick={unblockUsersHandler}><UnblockIcon/></div>
        <div className="mr-2 cursor-pointer tooltip tooltip-left" data-tip="delete user" onClick={async () => await deleteUsersHandler()}>✖</div>
      </div>
        {users.map(user => 
            <ManagementTable key={user._id} user={user} selectUsers={isChecked} />
          )}
    </section>
  )
}

export default UserManagement