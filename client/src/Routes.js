import React from 'react'
import Main from './pages/Main'
import Auth from './pages/Auth'
import Cab from './pages/Cab'
import Detail from './pages/Detail'
import { Routes, Route, Navigate } from 'react-router-dom'
export const useRoutes = isAunteficated => {
    if (isAunteficated) {
        return (
            <Routes>
                <Route path='/' exact element={<Main />} />
                <Route path='/lk' exact element={<Cab />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path="*" element={<Navigate replace to="/" />}  />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' exact element={<Main />} />
                <Route path='/auth' exact element={<Auth />} />
                <Route path='/detail:id' element={<Detail />} />
                <Route path="*" element={<Navigate replace to="/" />}  />
            </Routes>)
    }

}