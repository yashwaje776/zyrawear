import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import ListProduct from './pages/ListProduct'
import Orders from './pages/Orders'
import { Admincontext } from './context/admincontext'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

const App = () => {
    const {token}=useContext(Admincontext)
    console.log(token)
    return (
      token === "" ? (
        <>
        <ToastContainer></ToastContainer>
        <Login />
        </>
      ) : (
        <>
        <ToastContainer></ToastContainer> 
        <div className=''>
          <Navbar />
          <hr className='border-gray-300' />
          <div className='w-full flex'>
            <Sidebar />
            <div className='w-[70%] mx-auto my-8'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddProduct />} />
                <Route path='/list' element={<ListProduct />} />
                <Route path='/orders' element={<Orders />} />
              </Routes>
            </div>
          </div>
        </div>
        </>
      )
    )    
}

export default App
