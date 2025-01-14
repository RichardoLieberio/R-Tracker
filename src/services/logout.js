import store from '../redux/store';
import {logout as authLogout} from '../redux/authSlice';
import {logout as dataLogout} from '../redux/dataSlice';
import {logout as expensePageLogout} from '../redux/expensePageSlice';
import {logout as chartPageLogout} from '../redux/chartPageSlice';
import {logout as userPageLogout} from '../redux/userPageSlice';
import {logout as categoryPageLogout} from '../redux/categoryPageSlice';

function logout() {
    store.dispatch(authLogout());
    store.dispatch(dataLogout());
    store.dispatch(expensePageLogout());
    store.dispatch(chartPageLogout());
    store.dispatch(userPageLogout());
    store.dispatch(categoryPageLogout());
}

export default logout;