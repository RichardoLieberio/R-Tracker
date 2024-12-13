import Cookies from 'js-cookie';

import store from '../redux/store';
import {changeTheme as reduxChangeTheme} from '../redux/webSlice';

function changeTheme(theme) {
    store.dispatch(reduxChangeTheme(theme));
    Cookies.set('theme', theme);
}

export default {changeTheme};