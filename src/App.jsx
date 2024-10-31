import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ChangeEmail from './pages/ChangeEmail';
import ResetPwd from './pages/ResetPwd';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import User from './pages/User';
import ExpenseCategory from './pages/ExpenseCategory';

import MainLayout from './components/MainLayout';

export default function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
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