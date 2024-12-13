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

function getHoverBgSecondaryColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-secondary';
        case 'green':
            return 'hover:!bg-green-secondary';
        case 'blue':
            return 'hover:!bg-blue-secondary';
        case 'yellow':
            return 'hover:!bg-yellow-secondary';
        case 'teal':
            return 'hover:!bg-teal-secondary';
        case 'dark':
            return 'hover:!bg-dark-secondary';
        default:
            return 'hover:!bg-purple-secondary';
    }
}

function getHoverBgNeutral50Color(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-neutral/50';
        case 'green':
            return 'hover:!bg-green-neutral/50';
        case 'blue':
            return 'hover:!bg-blue-neutral/50';
        case 'yellow':
            return 'hover:!bg-yellow-neutral/50';
        case 'teal':
            return 'hover:!bg-teal-neutral/50';
        case 'dark':
            return 'hover:!bg-dark-neutral/50';
        default:
            return 'hover:!bg-purple-neutral/50';
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

function getHoverTextHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!text-red-highlight';
        case 'green':
            return 'hover:!text-green-highlight';
        case 'blue':
            return 'hover:!text-blue-highlight';
        case 'yellow':
            return 'hover:!text-yellow-highlight';
        case 'teal':
            return 'hover:!text-teal-highlight';
        case 'dark':
            return 'hover:!text-dark-highlight';
        default:
            return 'hover:!text-purple-highlight';
    }
}

function getFromSecondaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!from-red-secondary';
        case 'green':
            return '!from-green-secondary';
        case 'blue':
            return '!from-blue-secondary';
        case 'yellow':
            return '!from-yellow-secondary';
        case 'teal':
            return '!from-teal-secondary';
        case 'dark':
            return '!from-dark-secondary';
        default:
            return '!from-purple-secondary';
    }
}

function getToPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!to-red-primary';
        case 'green':
            return '!to-green-primary';
        case 'blue':
            return '!to-blue-primary';
        case 'yellow':
            return '!to-yellow-primary';
        case 'teal':
            return '!to-teal-primary';
        case 'dark':
            return '!to-dark-primary';
        default:
            return '!to-purple-primary';
    }
}

function getBorderText5Color(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-text/5';
        case 'green':
            return '!border-green-text/5';
        case 'blue':
            return '!border-blue-text/5';
        case 'yellow':
            return '!border-yellow-text/5';
        case 'teal':
            return '!border-teal-text/5';
        case 'dark':
            return '!border-dark-text/5';
        default:
            return '!border-purple-text/5';
    }
}

export {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgSecondaryColor, getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextColor, getOppositeTextColor, getTextHighlightColor,
    getHoverTextHighlightColor,
    getFromSecondaryColor, getToPrimaryColor,
    getBorderText5Color
};