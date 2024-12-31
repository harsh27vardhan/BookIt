import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import Places from './pages/Places'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = process.env.BACKEND_BASEURL;
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            {/* <Route path="/account/:subpage?" element={<ProfilePage />} /> */}
            {/* The ? at the end of subpage will make the / route as undefined and rest of the routes will be consired according to the subpage */}
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<BookingPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
