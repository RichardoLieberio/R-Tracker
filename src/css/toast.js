function getToastClassName(theme) {
    let toastClassName;

    switch (theme) {
        case 'red':
            toastClassName = {
                success: 'bg-red-success',
                error: 'bg-red-error',
                warning: 'bg-red-warning'
            };
            break;
        case 'green':
            toastClassName = {
                success: 'bg-green-success',
                error: 'bg-green-error',
                warning: 'bg-green-warning'
            };
            break;
        case 'blue':
            toastClassName = {
                success: 'bg-blue-success',
                error: 'bg-blue-error',
                warning: 'bg-blue-warning'
            };
            break;
        case 'yellow':
            toastClassName = {
                success: 'bg-yellow-success',
                error: 'bg-yellow-error',
                warning: 'bg-yellow-warning'
            };
            break;
        case 'teal':
            toastClassName = {
                success: 'bg-teal-success',
                error: 'bg-teal-error',
                warning: 'bg-teal-warning'
            };
            break;
        case 'dark':
            toastClassName = {
                success: 'bg-dark-success',
                error: 'bg-dark-error',
                warning: 'bg-dark-warning'
            };
            break;
        default:
            toastClassName = {
                success: 'bg-purple-success',
                error: 'bg-purple-error',
                warning: 'bg-purple-warning'
            };
            break;
    }

    return toastClassName;
}

function getBodyClassName(theme) {
    let bodyClassName;

    switch (theme) {
        case 'red':
            bodyClassName = 'text-red-oppositeText';
            break;
        case 'green':
            bodyClassName = 'text-green-oppositeText';
            break;
        case 'blue':
            bodyClassName = 'text-blue-oppositeText';
            break;
        case 'yellow':
            bodyClassName = 'text-yellow-oppositeText';
            break;
        case 'teal':
            bodyClassName = 'text-teal-oppositeText';
            break;
        case 'dark':
            bodyClassName = 'text-dark-oppositeText';
            break;
        default:
            bodyClassName = 'text-purple-oppositeText';
            break;
    }

    return bodyClassName;
}

export {getToastClassName, getBodyClassName};