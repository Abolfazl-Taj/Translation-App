import ManagmentDashboard from "../pages/ManagmentDashboard"
import TranslationView from "../pages/TranslationView"
import Words from "../Pages/Words"

const routes = [
    { path: '/', element: <TranslationView /> },
    { path: '/words-managment', element: <ManagmentDashboard /> },
    { path: '/words', element: <Words /> }
]

export default routes