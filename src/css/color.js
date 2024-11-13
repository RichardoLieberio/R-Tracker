

function getTextColor(theme) {
    switch (theme) {
        case 'red':
            return 'text-red-oppositeText';
        case 'green':
            return 'text-green-oppositeText';
        case 'blue':
            return 'text-blue-oppositeText';
        case 'yellow':
            return 'text-yellow-oppositeText';
        case 'teal':
            return 'text-teal-oppositeText';
        case 'dark':
            return 'text-dark-oppositeText';
        default:
            return 'text-purple-oppositeText';
    }
}

export {getTextColor};