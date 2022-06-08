import { useState, useEffect } from "react"
import { useUsersContext } from "../../context/users.context"

const ManagementTable = ({user, selectUsers}) => {
 
  const {username, email, lastLogin, createdAt = '', status} = user
  const {setUserToUpdate} = useUsersContext()
  const [isUserChecked, setCheckBox] = useState(false)
  const [date, setDate] = useState('')
  const {createdAtFormated, lastLoginFormated} = date
  
  useEffect(() => {
    setCheckBox(selectUsers)
    addUsersToUpdate(selectUsers)
  }, [selectUsers])

  useEffect(() => {
    const createdAtFormated =  createdAt.split('T')[0]
    const lastLoginFormated = lastLogin.split('T')[0]
    setDate({createdAtFormated, lastLoginFormated})
  },[])

  const checkboxHandler = (event) => {
    const isChecked = event.target.checked
    setCheckBox((prevState) => prevState === selectUsers ? isChecked: selectUsers)
    addUsersToUpdate(isChecked)
  }

  const addUsersToUpdate = (isChecked) => {
    if(!isChecked) return removeFromUpdating()
    setUserToUpdate((prevState) => [...new Set([...prevState, user])])
  }  

  const removeFromUpdating = () => {
    return setUserToUpdate((prevState) => prevState.filter(prevUser => prevUser._id !== user._id))
  }

  return (
    <div className="grid gap-4 auto-cols-max py-4 border border-black">
        <input className="col-start-1 col-end-2 my-1 ml-2 checkbox" type="checkbox" onChange={checkboxHandler} checked={isUserChecked} />
         <div className="col-start-2 col-end-3 flex items-center justify-center">
            <div className="w-20">{username}</div>
            <div className="w-32 text-center">{email}</div>
            <div className="w-32 text-center">{lastLoginFormated}</div>
            <div className="w-32 text-center">{createdAtFormated}</div>
            <div className="w-20">{status}</div>
         </div>
    </div>
  )
}

export default ManagementTable

