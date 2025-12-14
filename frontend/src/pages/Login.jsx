import { Login as LoginComponent } from "../components/auth/Login"
import { Footer } from "../components/common/Footer"
import { Header } from "../components/common/Header"

export const Login = () => {
  return (
    <>
      <Header />
      <LoginComponent />
      <Footer />
    </>
  )
}
