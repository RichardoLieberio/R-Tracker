function getBgPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-primary';
        case 'green':
            return '!bg-green-primary';
        case 'blue':
            return '!bg-blue-primary';
        case 'yellow':
            return '!bg-yellow-primary';
        case 'teal':
            return '!bg-teal-primary';
        case 'dark':
            return '!bg-dark-primary';
        default:
            return '!bg-purple-primary';
    }
}

function getBackgroundColor(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-background';
        case 'green':
            return '!bg-green-background';
        case 'blue':
            return '!bg-blue-background';
        case 'yellow':
            return '!bg-yellow-background';
        case 'teal':
            return '!bg-teal-background';
        case 'dark':
            return '!bg-dark-background';
        default:
            return '!bg-purple-background';
    }
}

function getHoverBgHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-highlight';
        case 'green':
            return 'hover:!bg-green-highlight';
        case 'blue':
            return 'hover:!bg-blue-highlight';
        case 'yellow':
            return 'hover:!bg-yellow-highlight';
        case 'teal':
            return 'hover:!bg-teal-highlight';
        case 'dark':
            return 'hover:!bg-dark-highlight';
        default:
            return 'hover:!bg-purple-highlight';
    }
}

function getTextColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-text';
        case 'green':
            return '!text-green-text';
        case 'blue':
            return '!text-blue-text';
        case 'yellow':
            return '!text-yellow-text';
        case 'teal':
            return '!text-teal-text';
        case 'dark':
            return '!text-dark-text';
        default:
            return '!text-purple-text';
    }
}

function getOppositeTextColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-oppositeText';
        case 'green':
            return '!text-green-oppositeText';
        case 'blue':
            return '!text-blue-oppositeText';
        case 'yellow':
            return '!text-yellow-oppositeText';
        case 'teal':
            return '!text-teal-oppositeText';
        case 'dark':
            return '!text-dark-oppositeText';
        default:
            return '!text-purple-oppositeText';
    }
}

function getTextHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-highlight';
        case 'green':
            return '!text-green-highlight';
        case 'blue':
            return '!text-blue-highlight';
        case 'yellow':
            return '!text-yellow-highlight';
        case 'teal':
            return '!text-teal-highlight';
        case 'dark':
            return '!text-dark-highlight';
        default:
            return '!text-purple-highlight';
    }
}

export {getBgPrimaryColor, getBackgroundColor, getHoverBgHighlightColor, getTextColor, getOppositeTextColor, getTextHighlightColor};