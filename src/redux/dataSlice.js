import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        expenses: null,
        expenseCategories: null,
        users: null
    },
    reducers: {
        setExpenses: function(state, action) {
            const expenses = {};
            action.payload.forEach(expense => {
                const date = new Date(expense.expense_date).toLocaleDateString();
                if (!expenses[date]) expenses[date] = [];
                expenses[date].push(expense);
            });
            state.expenses = expenses;
        },
        addExpense: function(state, action) {
            const expenses = {...(state.expenses || {})};
            const date = new Date(action.payload.expense_date).toLocaleDateString();
            if (!expenses[date]) expenses[date] = [];
            expenses[date].push(action.payload);
            state.expenses = expenses;
        },
        updateExpense: function(state, action) {
            const newExpenses = {};

            Object.entries({...(state.expenses || {})}).map(([key, expenses]) => expenses.map(expense => {
                if (expense._id !== action.payload._id) {
                    if (!newExpenses[key]) newExpenses[key] = [];
                    newExpenses[key].push(expense);
                }
            }));

            const date = new Date(action.payload.expense_date).toLocaleDateString();
            if (!newExpenses[date]) newExpenses[date] = [];
            newExpenses[date].push({...action.payload, category_id: action.payload.category_id._id});
            state.expenses = newExpenses;
        },
        removeExpense: function(state, action) {
            const newExpenses = {};
            Object.entries(state.expenses).forEach(([date, expenses]) => {
                const newDateExpense = expenses.filter(expense => expense._id !== action.payload);
                if (newDateExpense.length) newExpenses[date] = newDateExpense;
            });
            state.expenses = newExpenses;
        },
        setExpenseCategories: function(state, action) {
            state.expenseCategories = action.payload;
        },
        addExpenseCategory: function(state, action) {
            const {data, name} = action.payload;
            state.expenseCategories = [{...data, created_by: {_id: data.created_by, name}}, ...state.expenseCategories];
        },
        updateExpenseCategory: function(state, action) {
            state.expenseCategories = state.expenseCategories.map(category => category._id === action.payload._id ? action.payload : category);
        },
        deleteExpenseCategory: function(state, action) {
            state.expenseCategories = state.expenseCategories.filter(category => category._id !== action.payload);
        },
        setUsers: function(state, action) {
            state.users = action.payload;
        },
        changeInfo: function(state, action) {
            const {_id, ...props} = action.payload;
            state.users = state.users.map(user => {
                if (user._id !== _id) return user;
                return {...user, ...props};
            });
        },
        removeBlacklist: function(state, action) {
            state.users = state.users.map(user => {
                if (user._id === action.payload) {
                    delete user.blacklisted;
                    delete user.blacklist_reason;
                    delete user.blacklisted_by;
                    delete user.blacklisted_at;
                }
                return user;
            });
        },
        deleteUser: function(state, action) {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        logout: function(state) {
            state.expenses = null;
            state.expenseCategories = null;
            state.users = null;
        }
    }
});

export const {setExpenses, addExpense, updateExpense, removeExpense, setExpenseCategories, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory, setUsers, changeInfo, removeBlacklist, deleteUser, logout} = dataSlice.actions;

export default dataSlice.reducer;