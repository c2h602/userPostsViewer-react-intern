import { BrowserRouter, Route, Routes} from 'react-router';
import { Layout } from './Components/Layout/Layout';
// import { UsersContextProvider } from './context/UsersContextProvider';
import { MainPage } from './pages/MainPage';
import { UserPage } from './pages/UserPage';

export default function App() {
  return(
    <BrowserRouter>
        <Layout>
          <Routes>
              <Route index element={<MainPage/>} />
              <Route path='/user/:userId' element={<UserPage/>} />
          </Routes>
        </Layout>
    </BrowserRouter>
  )
}