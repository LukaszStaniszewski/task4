import { useEffect } from "react"
import { Fragment } from "react"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { useCurrentUserContext } from "../../context/currentUser.context"
import { useUsersContext } from "../../context/users.context"
import * as api from "../../api/axios-Instance.api"

const Navbar = () => {
  const {currentUser, setCurrentUser, authenticateAndSetUser} = useCurrentUserContext()
  const {setUsers} = useUsersContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    (async ()=> await authenticateAndSetUser())()
  }, [])

  const logOut = async () => {
    try{
    await api.deleteSession()
    localStorage.removeItem("token");
    setCurrentUser(null)
    setUsers([])
    navigate('/')
    } catch(error) {
      console.error(error)
    }
  }

  const toLogInHandler = () => navigate('/')

  return (
    <Fragment>
      <div className="navbar bg-base-200 flex justify-between">
        {currentUser 
          ? <a className="font-bold text-xl">HI {currentUser.user.username.toUpperCase()}</a>
          : <a className="btn btn-ghost normal-case text-xl"></a>
        }
        {currentUser && location.pathname === '/' && <Link className="btn btn-ghost normal-case text-xl" to="/users">To Managament Page</Link>}
        {location.pathname === '/users' && <Link className="btn btn-ghost normal-case text-xl" to="/">To Home Page</Link>}
        {currentUser  ? <a className="btn btn-ghost normal-case text-xl" onClick={logOut}>Log out</a>
        : <a className="btn btn-ghost normal-case text-xl" onClick={toLogInHandler}>Log in</a>
        }
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navbar