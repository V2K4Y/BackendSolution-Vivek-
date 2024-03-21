import './App.css'
import Login from './Components/Login'
import { UserContext } from './Components/UserContext'

function App() {
// console.log('App renders!')
  return (
    <>
      <UserContext>
        <Login />
      </UserContext>
    </>
  )
}

export default App
