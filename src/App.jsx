import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import ChangeEmail from './pages/ChangeEmail';
import ResetPwd from './pages/ResetPwd';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import User from './pages/User';
import ExpenseCategory from './pages/ExpenseCategory';

import 'react-toastify/dist/ReactToastify.css';
import getToastClassName from './css/toast';
import {getTextColor} from './css/color';

import {ToastContainer} from 'react-toastify';
import MainLayout from './components/MainLayout';

export default function App() {
    const theme = useSelector((state) => state.theme.color);

    function toastClassName(context) {
        const className = getToastClassName(theme);
        return `${context.defaultClassName} !${className[context?.type]}`;
    }

    function bodyClassName() {
        const className = getTextColor(theme);
        return `${className} ml-2 flex items-center text-base`;
    }

    const toastConfig = {
        position: 'top-center',
        theme: 'colored',
        autoClose: 3000,
        closeOnClick: true,
        newestOnTop: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        toastClassName,
        bodyClassName
    };

    return (
        <BrowserRouter>
            <MainLayout>
                <ToastContainer {...toastConfig} />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/change-email" element={<ChangeEmail />} />
                    <Route path="/reset-password" element={<ResetPwd />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/admin">
                        <Route path="user" element={<User />} />
                        <Route path="expense-category" element={<ExpenseCategory />} />
                    </Route>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}