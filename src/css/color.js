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

function getBgHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-highlight';
        case 'green':
            return '!bg-green-highlight';
        case 'blue':
            return '!bg-blue-highlight';
        case 'yellow':
            return '!bg-yellow-highlight';
        case 'teal':
            return '!bg-teal-highlight';
        case 'dark':
            return '!bg-dark-highlight';
        default:
            return '!bg-purple-highlight';
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

function getHoverBgErrorColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-error';
        case 'green':
            return 'hover:!bg-green-error';
        case 'blue':
            return 'hover:!bg-blue-error';
        case 'yellow':
            return 'hover:!bg-yellow-error';
        case 'teal':
            return 'hover:!bg-teal-error';
        case 'dark':
            return 'hover:!bg-dark-error';
        default:
            return 'hover:!bg-purple-error';
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

function getDisabledBgNeutralColor(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!bg-red-neutral';
        case 'green':
            return 'disabled:!bg-green-neutral';
        case 'blue':
            return 'disabled:!bg-blue-neutral';
        case 'yellow':
            return 'disabled:!bg-yellow-neutral';
        case 'teal':
            return 'disabled:!bg-teal-neutral';
        case 'dark':
            return 'disabled:!bg-dark-neutral';
        default:
            return 'disabled:!bg-purple-neutral';
    }
}

function getDisabledBgError60Color(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!bg-red-error/60';
        case 'green':
            return 'disabled:!bg-green-error/60';
        case 'blue':
            return 'disabled:!bg-blue-error/60';
        case 'yellow':
            return 'disabled:!bg-yellow-error/60';
        case 'teal':
            return 'disabled:!bg-teal-error/60';
        case 'dark':
            return 'disabled:!bg-dark-error/60';
        default:
            return 'disabled:!bg-purple-error/60';
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

function getTextErrorColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-error';
        case 'green':
            return '!text-green-error';
        case 'blue':
            return '!text-blue-error';
        case 'yellow':
            return '!text-yellow-error';
        case 'teal':
            return '!text-teal-error';
        case 'dark':
            return '!text-dark-error';
        default:
            return '!text-purple-error';
    }
}

function getHoverOppositeTextColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!text-red-oppositeText';
        case 'green':
            return 'hover:!text-green-oppositeText';
        case 'blue':
            return 'hover:!text-blue-oppositeText';
        case 'yellow':
            return 'hover:!text-yellow-oppositeText';
        case 'teal':
            return 'hover:!text-teal-oppositeText';
        case 'dark':
            return 'hover:!text-dark-oppositeText';
        default:
            return 'hover:!text-purple-oppositeText';
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

function getDisabledOppositeTextColor(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!text-red-oppositeText';
        case 'green':
            return 'disabled:!text-green-oppositeText';
        case 'blue':
            return 'disabled:!text-blue-oppositeText';
        case 'yellow':
            return 'disabled:!text-yellow-oppositeText';
        case 'teal':
            return 'disabled:!text-teal-oppositeText';
        case 'dark':
            return 'disabled:!text-dark-oppositeText';
        default:
            return 'disabled:!text-purple-oppositeText';
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

function getBorderNeutralColor(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-neutral';
        case 'green':
            return '!border-green-neutral';
        case 'blue':
            return '!border-blue-neutral';
        case 'yellow':
            return '!border-yellow-neutral';
        case 'teal':
            return '!border-teal-neutral';
        case 'dark':
            return '!border-dark-neutral';
        default:
            return '!border-purple-neutral';
    }
}

function getBorderErrorColor(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-error';
        case 'green':
            return '!border-green-error';
        case 'blue':
            return '!border-blue-error';
        case 'yellow':
            return '!border-yellow-error';
        case 'teal':
            return '!border-teal-error';
        case 'dark':
            return '!border-dark-error';
        default:
            return '!border-purple-error';
    }
}

function getBorderText20Color(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-text/20';
        case 'green':
            return '!border-green-text/20';
        case 'blue':
            return '!border-blue-text/20';
        case 'yellow':
            return '!border-yellow-text/20';
        case 'teal':
            return '!border-teal-text/20';
        case 'dark':
            return '!border-dark-text/20';
        default:
            return '!border-purple-text/20';
    }
}

function getShadowColor(theme) {
    switch (theme) {
        case 'red':
            return '!shadow-red-shadow/20';
        case 'green':
            return '!shadow-green-shadow/20';
        case 'blue':
            return '!shadow-blue-shadow/20';
        case 'yellow':
            return '!shadow-yellow-shadow/20';
        case 'teal':
            return '!shadow-teal-shadow/20';
        case 'dark':
            return '!shadow-dark-shadow/20';
        default:
            return '!shadow-purple-shadow/20';
    }
}

export {
    getBgPrimaryColor, getBgHighlightColor, getBackgroundColor,
    getHoverBgHighlightColor, getHoverBgErrorColor, getHoverBgNeutral50Color,
    getDisabledBgNeutralColor, getDisabledBgError60Color,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverOppositeTextColor, getHoverTextHighlightColor,
    getDisabledOppositeTextColor,
    getFromSecondaryColor, getToPrimaryColor,
    getBorderNeutralColor, getBorderErrorColor, getBorderText20Color,
    getShadowColor
};