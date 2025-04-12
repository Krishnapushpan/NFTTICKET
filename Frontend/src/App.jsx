import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import Booklist from './pages/Booklist';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
              <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<Booklist/>} />

      
  </>
)
)
return (  
 <RouterProvider router={router}/>
)
}
export default App