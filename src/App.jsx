import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Admin from './hocs/Admin';
import Authenticated from './hocs/Authenticated';
import NotAuthenticated from './hocs/NotAuthenticated';

import Login from './pages/Login';
import Register from './pages/Register';
import ChangeEmail from './pages/ChangeEmail';
import ForgotPwd from './pages/ForgotPwd';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import User from './pages/User';
import ExpenseCategory from './pages/ExpenseCategory';
import NotFound from './pages/NotFound';

import contr from './controllers/hocs';

import 'react-toastify/dist/ReactToastify.css';
import getToastClassName from './css/toast';
import {getOppositeTextColor} from './css/color';

import {ToastContainer} from 'react-toastify';
import Loading from './components/Loading';
import MainLayout from './components/MainLayout';

export default function App() {
    const [loading, setLoading] = useState(true);

    const theme = useSelector((state) => state.theme.color);

    useEffect(function() {
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

    const DashboardWrapper = Authenticated(Dashboard);
    const LoginWrapper = NotAuthenticated(Login);
    const RegisterWrapper = NotAuthenticated(Register);
    const ChangeEmailWrapper = Authenticated(ChangeEmail);
    const ForgotPwdWrapper = NotAuthenticated(ForgotPwd);
    const ExpenseWrapper = Authenticated(Expense);
    const UserWrapper = Admin(User);
    const ExpenseCategoryWrapper = Admin(ExpenseCategory);

    return loading
    ?   <Loading defaultSize theme={theme} />
    :   <BrowserRouter>
            <MainLayout>
                <ToastContainer {...toastConfig} />
                <Routes>
                    <Route path="/" element={<DashboardWrapper />} />
                    <Route path="/login" element={<LoginWrapper />} />
                    <Route path="/register" element={<RegisterWrapper />} />
                    <Route path="/change-email" element={<ChangeEmailWrapper />} />
                    <Route path="/forgot-password" element={<ForgotPwdWrapper />} />
                    <Route path="/expense" element={<ExpenseWrapper />} />
                    <Route path="/admin/user" element={<UserWrapper />} />
                    <Route path="/admin/expense-category" element={<ExpenseCategoryWrapper />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>;
}