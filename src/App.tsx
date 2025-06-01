
import Login from './pages/Login'

function App() {
  let userId = localStorage.getItem('userId')

  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem('userId', userId)
  }

  return (
    <>
    <Login />
    </>
  );
}

export default App;
