import { testLogin } from './api/test'
import './App.css'
import Background from './components/Background'

function App() {

  testLogin()
  return (
    <Background>
    </Background>
  )
}

export default App
