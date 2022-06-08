import {useState} from 'react'

import { useCurrentUserContext } from "../../context/currentUser.context";
import FormInput from '../form-input/form-input.component';
import * as api from "../../api/axios-Instance.api"

const defaultFormFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
const [formFields, setFormFields] = useState(defaultFormFields)
const {username, email, password, confirmPassword} = formFields
const {authenticateAndSetUser, setLoading} = useCurrentUserContext()

const register = async () => {
  await api.signUp(formFields)
}
const LogIn = async () => {
  const userAuth = await api.signIn({email: email, password: password})
  localStorage.setItem('token', JSON.stringify(userAuth.data))
}

const authenticate = async () => {
  await api.getUserSession();
  await authenticateAndSetUser()
}

const handleSubmit = async (event) => {
  event.preventDefault();
  if(password !== confirmPassword) return alert("passwords don't match")
  try {
  setLoading(true)
  await register()

  await LogIn()

  await authenticate()

  setFormFields(defaultFormFields)
  setLoading(false)
} catch (error) {
  alert("email already exist")
}
  
}

const handleChange = (event) => {
  const {name, value} = event.target
  setFormFields((prevState) => (
    {...prevState, [name]: value}
  ))
};

  return (
    <section className="w-20vw min-w-min flex-col">
       <form onSubmit={handleSubmit}>
        <FormInput
          label='Username'
          type = 'text'
          name = 'username'
          onChange = {handleChange}
          value = {username}
          required
        />
     
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

        <FormInput
          label='Confirm Password'
          type = 'password'
          name = 'confirmPassword'
          onChange = {handleChange}
          value = {confirmPassword}
          required
        />
          <button className="btn">Sign up</button>
      </form>
    </section>
  )
}

export default SignUp