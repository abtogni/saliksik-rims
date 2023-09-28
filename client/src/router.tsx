import Home from './routes/home';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import { Routes, Route } from "react-router-dom";
import Error404 from './routes/partials/Error';



const router = () => (
        
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error404/>} />
        </Routes>
        )

export default router;