function getBackgroundColor(theme) {
    switch (theme) {
        case 'red':
            return 'bg-red-background';
        case 'green':
            return 'bg-green-background';
        case 'blue':
            return 'bg-blue-background';
        case 'yellow':
            return 'bg-yellow-background';
        case 'teal':
            return 'bg-teal-background';
        case 'dark':
            return 'bg-dark-background';
        default:
            return 'bg-purple-background';
    }
}

function getOppositeTextColor(theme) {
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

export {getBackgroundColor, getOppositeTextColor};