import './App.css'
import { useRoutes } from 'react-router'
import routes from './routes/Routes'
import { useEffect } from 'react'
import useTheme from './Hooks/useTheme'

function App() {
  const { theme } = useTheme()
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("light")
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    }
  })
  const element = useRoutes(routes)
  return <>
    {element}
  </>
}

export default App