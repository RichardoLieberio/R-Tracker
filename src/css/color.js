function getBgPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return 'bg-red-primary';
        case 'green':
            return 'bg-green-primary';
        case 'blue':
            return 'bg-blue-primary';
        case 'yellow':
            return 'bg-yellow-primary';
        case 'teal':
            return 'bg-teal-primary';
        case 'dark':
            return 'bg-dark-primary';
        default:
            return 'bg-purple-primary';
    }
}

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

function getTextColor(theme) {
    switch (theme) {
        case 'red':
            return 'text-red-text';
        case 'green':
            return 'text-green-text';
        case 'blue':
            return 'text-blue-text';
        case 'yellow':
            return 'text-yellow-text';
        case 'teal':
            return 'text-teal-text';
        case 'dark':
            return 'text-dark-text';
        default:
            return 'text-purple-text';
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

export {getBgPrimaryColor, getBackgroundColor, getTextColor, getOppositeTextColor};