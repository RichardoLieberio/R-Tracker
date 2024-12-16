import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Admin from './hocs/Admin';
import Authenticated from './hocs/Authenticated';
import NotAuthenticated from './hocs/NotAuthenticated';

import Expense from './pages/Expense';
import Chart from './pages/Chart';
import EditProfile from './pages/EditProfile';
import User from './pages/User';
import ExpenseCategory from './pages/ExpenseCategory';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPwd from './pages/ForgotPwd';
import NotFound from './pages/NotFound';

import contr from './controllers/hocs';

import 'react-toastify/dist/ReactToastify.css';
import getToastClassName from './css/toast';
import {getOppositeTextColor} from './css/color';

import {ToastContainer} from 'react-toastify';
import Loading from './components/Loading';
import MainLayout from './components/MainLayout';
import SharedLayout from './components/SharedLayout';

export default function App() {
    const [loading, setLoading] = useState(true);

    const theme = useSelector((state) => state.web.theme);

    useEffect(function() {
        contr.themeSetup();
        contr.getInfo(setLoading);
    }, []);

    function toastClassName(context) {
        const className = getToastClassName(theme);
        return `${context.defaultClassName} !${className[context?.type]}`;
    }

    function bodyClassName() {
        const className = getOppositeTextColor(theme);
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

    return loading
    ?   <Loading defaultSize theme={theme} />
    :   <BrowserRouter>
            <MainLayout>
                <ToastContainer {...toastConfig} />
                <Routes>
                    <Route element={<Authenticated />}>
                        <Route element={<SharedLayout />}>
                            <Route path="/" element={<Expense />} />
                            <Route path="/charts" element={<Chart />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route element={<Admin />}>
                                <Route path="/admin/user" element={<User />} />
                                <Route path="/admin/expense-category" element={<ExpenseCategory />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route element={<NotAuthenticated />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPwd />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>;
}