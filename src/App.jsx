import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import noThemeRoutes from '../config/noThemeRoutes';

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

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import getToastClassName from './css/toast';
import {getOppositeTextColor} from './css/color';

import {ToastContainer} from 'react-toastify';
import Loading from './components/Loading';
import MainLayout from './components/MainLayout';
import SharedLayout from './components/SharedLayout';

export default function App() {
    const [loading, setLoading] = useState(true);

    const theme = useSelector((state) => state.web.theme);
    const page = useSelector((state) => state.web.page);

    useEffect(function() {
        contr.themeSetup();
        contr.getInfo(setLoading, false);

        const handleDragOver = (e) => e.preventDefault();
        const handleDrop = (e) => e.preventDefault();

        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);

        return function() {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        }
    }, []);

    function toastClassName(context) {
        const className = getToastClassName(noThemeRoutes.includes(page) ? 'purple' : theme);
        return `${context.defaultClassName} !${className[context?.type]}`;
    }

    function bodyClassName() {
        const className = getOppositeTextColor(noThemeRoutes.includes(page) ? 'purple' : theme);
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
                {
                    loading
                    ? <Loading defaultSize />
                    : <>
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
                    </>
                }
            </MainLayout>
        </BrowserRouter>
    );
}