import SignUp from '../../components/sign-up-form/sign-up-form.component'
import SignIn from "../../components/sign-in-form/sign-in-form.component"
import { useUsersContext } from "../../context/users.context"
import Spinner from "../../components/spinner/spinner.comonent"
const Authentication = () => {
  const {isLoading} = useUsersContext()
  if(isLoading) {
    return <Spinner/>
  }
  
  return (
    <div className="flex justify-evenly mx-20vw my-10">
      <SignUp/>
      <SignIn/>
    </div>
  )
}

export default Authentication