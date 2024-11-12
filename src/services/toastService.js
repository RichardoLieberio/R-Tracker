import {toast} from 'react-toastify';

function setToast(type, msg, show=false) {
    localStorage.setItem('toast', JSON.stringify({type, msg, show, time: Date.now()}));
}

function getToast() {
    const storedToast = JSON.parse(localStorage.getItem('toast'));
    if (storedToast && (storedToast.show || Date.now() - storedToast.time <= +process.env.REQUEST_TIMEOUT)) {
        setTimeout(function() {
            switch (storedToast.type) {
                case 'success':
                    toast.success(storedToast.msg);
                    break;
                case 'error':
                    toast.error(storedToast.msg);
                    break;
                case 'warning':
                    toast.warning(storedToast.msg);
                    break;
            }
        }, 0);
    }
    localStorage.removeItem('toast');
}

export {setToast, getToast};