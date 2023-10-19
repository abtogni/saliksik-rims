import Index from '../pages';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import { Routes, Route } from "react-router-dom";
import Error404 from '../pages/partials/Error';
import AdminRoutes from './auth/adminRouter';
import PersonnelRoutes from './auth/personnelRouter';



const router = () => (
        <Routes>
            <Route index element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/personnel/*' element={<PersonnelRoutes />} />
            <Route path="*" element={<Error404/>} />
        </Routes>
        )

export default router;