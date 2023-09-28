import Home from '../pages/home';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import { Routes, Route } from "react-router-dom";
import Error404 from '../pages/partials/Error';



const router = () => (
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error404/>} />
        </Routes>
        )

export default router;