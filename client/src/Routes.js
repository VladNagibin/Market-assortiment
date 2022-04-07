import React from 'react'
import Main from './pages/Main'
import Auth from './pages/Auth'
import Cab from './pages/Cab'
import Detail from './pages/Detail'
import Catalog from './pages/Catalog'
import { Routes, Route, Navigate } from 'react-router-dom'
import Cart from './pages/Cart'
import Finder from './pages/Finder'
export const useRoutes = isAunteficated => {
    if (isAunteficated) {
        return (
            <Routes>
                <Route path='/' exact element={<Main />} />
                <Route path='/auth' exact element={<Cab />} />
                <Route path='/cart' exact element={<Cart />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/catalog/:id' element={<Catalog />} />
                <Route path='/finder/:text' element={<Finder />} />
                <Route path="*" element={<Navigate replace to="/" />}  />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' exact element={<Main />} />
                <Route path='/auth' exact element={<Auth />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/catalog/:id' element={<Catalog />} />
                <Route path='/finder/:text' element={<Finder />} />
                <Route path="*" element={<Navigate replace to="/" />}  />
            </Routes>)
    }

}