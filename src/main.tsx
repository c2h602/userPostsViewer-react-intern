import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import CardUser from './Components/CardUser/CardUser.tsx';
import ContainerPost from './Components/ContainerPost/ContainerPost.tsx';
import Comments from './Components/Comments/Comments.tsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} errorElement={<ErrorPage />} />

        <Route path='/user/:id' element={<CardUser />} >

          <Route path='posts' element={<ContainerPost  />}>

            <Route path=':postId/comments' element={<Comments  />} />

          </Route>

        </Route>

      </Routes>
      
    </BrowserRouter>

  </StrictMode>
);

