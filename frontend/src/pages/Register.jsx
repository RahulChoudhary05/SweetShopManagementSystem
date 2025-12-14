import { Register as RegisterComponent } from "../components/auth/Register"
import { Footer } from "../components/common/Footer"
import { Header } from "../components/common/Header"

export const Register = () => {
  return (
    <>
      <Header/>
      <RegisterComponent />
    <Footer/>
    </>
  )
}
