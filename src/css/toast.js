export default function getToastClassName(theme) {
    switch (theme) {
        case 'red':
            return {
                success: 'bg-red-success',
                error: 'bg-red-error',
                warning: 'bg-red-warning'
            };
        case 'green':
            return {
                success: 'bg-green-success',
                error: 'bg-green-error',
                warning: 'bg-green-warning'
            };
        case 'blue':
            return {
                success: 'bg-blue-success',
                error: 'bg-blue-error',
                warning: 'bg-blue-warning'
            };
        case 'yellow':
            return {
                success: 'bg-yellow-success',
                error: 'bg-yellow-error',
                warning: 'bg-yellow-warning'
            };
        case 'teal':
            return {
                success: 'bg-teal-success',
                error: 'bg-teal-error',
                warning: 'bg-teal-warning'
            };
        case 'dark':
            return {
                success: 'bg-dark-success',
                error: 'bg-dark-error',
                warning: 'bg-dark-warning'
            };
        default:
            return {
                success: 'bg-purple-success',
                error: 'bg-purple-error',
                warning: 'bg-purple-warning'
            };
    }
}