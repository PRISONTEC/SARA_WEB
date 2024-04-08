import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './login';
import MisTareas from './misTareas'
import Plataforma from './plataforma';
import PlataformaAdmin from './administrador';
import NotPage from './noPage';

const Page = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="plataforma" element={<Plataforma />} />
                    <Route path="plataformaAdmin" element={<PlataformaAdmin />} />
                    <Route path="ordenes" element={<MisTareas />} />
                    <Route path="*" element={<NotPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Page