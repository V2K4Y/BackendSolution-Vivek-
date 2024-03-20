import './App.css'
import Login from './Components/Login'
import { UserContext } from './Components/UserContext'
// import RequestList from './RequestList'

function App() {
console.log('App renders!')
  return (
    <>
      <div className='bg-gray-500 text-whit font-serif text-center p-5 mb-3'>
        <h1 className='e font-extrabold text-[40px]'>Customer service request.</h1>
      </div>
      <UserContext>
        <Login />
      </UserContext>
    </>
  )
}

export default App
