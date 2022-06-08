import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { useCurrentUserContext } from "../../context/currentUser.context"
import FormInput from "../form-input/form-input.component"
import * as api from "../../api/axios-Instance.api"

const defaultUserCredentials = {
  email: '',
  password: '',
}

const SignIn = () => {
const [userCredentials, setUserCredentials] = useState(defaultUserCredentials)
const {email, password} = userCredentials;
const { authenticateAndSetUser, setLoading} = useCurrentUserContext()

const navigate = useNavigate();

  const authorize = async () => {
    const userAuth = await api.signIn(userCredentials)
    localStorage.setItem('token', JSON.stringify(userAuth.data))
  }

  const authenticate = async () => {
    await api.getUserSession();
    await authenticateAndSetUser()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      await authorize()

      await authenticate()

      setUserCredentials(defaultUserCredentials)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if(error.message === "Request failed with status code 406") {
        alert("Account has been blocked")
      } else {
        alert("email or password are not correct")
      }     
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setUserCredentials((prevState) => (
      {...prevState, [name]: value}
    ))
  }
  
  return (
    <section className="w-20vw min-w-min flex flex-col relative">
       <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type = 'email'
          name = 'email'
          onChange = {handleChange}
          value = {email}
          required
        />

        <FormInput
          label='Password'
          type = 'password'
          name = 'password'
          onChange = {handleChange}
          value = {password}
          required
        />
        <button className="btn">Sign in</button>
      </form>
    </section>
  )
}

export default SignIn