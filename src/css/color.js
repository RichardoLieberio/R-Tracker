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

function getBgNeutralColor(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-neutral';
        case 'green':
            return '!bg-green-neutral';
        case 'blue':
            return '!bg-blue-neutral';
        case 'yellow':
            return '!bg-yellow-neutral';
        case 'teal':
            return '!bg-teal-neutral';
        case 'dark':
            return '!bg-dark-neutral';
        default:
            return '!bg-purple-neutral';
    }
}

function getBgNeutral10Color(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-neutral/10';
        case 'green':
            return '!bg-green-neutral/10';
        case 'blue':
            return '!bg-blue-neutral/10';
        case 'yellow':
            return '!bg-yellow-neutral/10';
        case 'teal':
            return '!bg-teal-neutral/10';
        case 'dark':
            return '!bg-dark-neutral/10';
        default:
            return '!bg-purple-neutral/10';
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

function getBgHighlight20Color(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-highlight/20';
        case 'green':
            return '!bg-green-highlight/20';
        case 'blue':
            return '!bg-blue-highlight/20';
        case 'yellow':
            return '!bg-yellow-highlight/20';
        case 'teal':
            return '!bg-teal-highlight/20';
        case 'dark':
            return '!bg-dark-highlight/20';
        default:
            return '!bg-purple-highlight/20';
    }
}

function getBgErrorColor(theme) {
    switch (theme) {
        case 'red':
            return '!bg-red-error';
        case 'green':
            return '!bg-green-error';
        case 'blue':
            return '!bg-blue-error';
        case 'yellow':
            return '!bg-yellow-error';
        case 'teal':
            return '!bg-teal-error';
        case 'dark':
            return '!bg-dark-error';
        default:
            return '!bg-purple-error';
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

function getHoverBgPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-primary';
        case 'green':
            return 'hover:!bg-green-primary';
        case 'blue':
            return 'hover:!bg-blue-primary';
        case 'yellow':
            return 'hover:!bg-yellow-primary';
        case 'teal':
            return 'hover:!bg-teal-primary';
        case 'dark':
            return 'hover:!bg-dark-primary';
        default:
            return 'hover:!bg-purple-primary';
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

function getHoverBgError60Color(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!bg-red-error/50';
        case 'green':
            return 'hover:!bg-green-error/50';
        case 'blue':
            return 'hover:!bg-blue-error/50';
        case 'yellow':
            return 'hover:!bg-yellow-error/50';
        case 'teal':
            return 'hover:!bg-teal-error/50';
        case 'dark':
            return 'hover:!bg-dark-error/50';
        default:
            return 'hover:!bg-purple-error/50';
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

function getDisabledBgColor(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!bg-red-disabled';
        case 'green':
            return 'disabled:!bg-green-disabled';
        case 'blue':
            return 'disabled:!bg-blue-disabled';
        case 'yellow':
            return 'disabled:!bg-yellow-disabled';
        case 'teal':
            return 'disabled:!bg-teal-disabled';
        case 'dark':
            return 'disabled:!bg-dark-disabled';
        default:
            return 'disabled:!bg-purple-disabled';
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

function getDisabledBgNeutral30Color(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!bg-red-neutral/30';
        case 'green':
            return 'disabled:!bg-green-neutral/30';
        case 'blue':
            return 'disabled:!bg-blue-neutral/30';
        case 'yellow':
            return 'disabled:!bg-yellow-neutral/30';
        case 'teal':
            return 'disabled:!bg-teal-neutral/30';
        case 'dark':
            return 'disabled:!bg-dark-neutral/30';
        default:
            return 'disabled:!bg-purple-neutral/30';
    }
}

function getDisabledBgHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return 'disabled:!bg-red-highlight';
        case 'green':
            return 'disabled:!bg-green-highlight';
        case 'blue':
            return 'disabled:!bg-blue-highlight';
        case 'yellow':
            return 'disabled:!bg-yellow-highlight';
        case 'teal':
            return 'disabled:!bg-teal-highlight';
        case 'dark':
            return 'disabled:!bg-dark-highlight';
        default:
            return 'disabled:!bg-purple-highlight';
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

function getTextPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-primary';
        case 'green':
            return '!text-green-primary';
        case 'blue':
            return '!text-blue-primary';
        case 'yellow':
            return '!text-yellow-primary';
        case 'teal':
            return '!text-teal-primary';
        case 'dark':
            return '!text-dark-primary';
        default:
            return '!text-purple-primary';
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

function getTextNeutralColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-neutral';
        case 'green':
            return '!text-green-neutral';
        case 'blue':
            return '!text-blue-neutral';
        case 'yellow':
            return '!text-yellow-neutral';
        case 'teal':
            return '!text-teal-neutral';
        case 'dark':
            return '!text-dark-neutral';
        default:
            return '!text-purple-neutral';
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

function getTextLinkColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-link';
        case 'green':
            return '!text-green-link';
        case 'blue':
            return '!text-blue-link';
        case 'yellow':
            return '!text-yellow-link';
        case 'teal':
            return '!text-teal-link';
        case 'dark':
            return '!text-dark-link';
        default:
            return '!text-purple-link';
    }
}

function getTextDisabledColor(theme) {
    switch (theme) {
        case 'red':
            return '!text-red-disabled';
        case 'green':
            return '!text-green-disabled';
        case 'blue':
            return '!text-blue-disabled';
        case 'yellow':
            return '!text-yellow-disabled';
        case 'teal':
            return '!text-teal-disabled';
        case 'dark':
            return '!text-dark-disabled';
        default:
            return '!text-purple-disabled';
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

function getPlaceholderText(theme) {
    switch (theme) {
        case 'red':
            return 'placeholder-red-neutral';
        case 'green':
            return 'placeholder-green-neutral';
        case 'blue':
            return 'placeholder-blue-neutral';
        case 'yellow':
            return 'placeholder-yellow-neutral';
        case 'teal':
            return 'placeholder-teal-neutral';
        case 'dark':
            return 'placeholder-dark-neutral';
        default:
            return 'placeholder-purple-neutral';
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

function getBorderPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-primary';
        case 'green':
            return '!border-green-primary';
        case 'blue':
            return '!border-blue-primary';
        case 'yellow':
            return '!border-yellow-primary';
        case 'teal':
            return '!border-teal-primary';
        case 'dark':
            return '!border-dark-primary';
        default:
            return '!border-purple-primary';
    }
}

function getBorderTextColor(theme) {
    switch (theme) {
        case 'red':
            return '!border-red-text';
        case 'green':
            return '!border-green-text';
        case 'blue':
            return '!border-blue-text';
        case 'yellow':
            return '!border-yellow-text';
        case 'teal':
            return '!border-teal-text';
        case 'dark':
            return '!border-dark-text';
        default:
            return '!border-purple-text';
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

function getHoverBorderHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return 'hover:!border-red-highlight';
        case 'green':
            return 'hover:!border-green-highlight';
        case 'blue':
            return 'hover:!border-blue-highlight';
        case 'yellow':
            return 'hover:!border-yellow-highlight';
        case 'teal':
            return 'hover:!border-teal-highlight';
        case 'dark':
            return 'hover:!border-dark-highlight';
        default:
            return 'hover:!border-purple-highlight';
    }
}

function getFocusBorderPrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return 'focus:!border-red-primary';
        case 'green':
            return 'focus:!border-green-primary';
        case 'blue':
            return 'focus:!border-blue-primary';
        case 'yellow':
            return 'focus:!border-yellow-primary';
        case 'teal':
            return 'focus:!border-teal-primary';
        case 'dark':
            return 'focus:!border-dark-primary';
        default:
            return 'focus:!border-purple-primary';
    }
}

function getFocusBorderHighlightColor(theme) {
    switch (theme) {
        case 'red':
            return 'focus:!border-red-highlight';
        case 'green':
            return 'focus:!border-green-highlight';
        case 'blue':
            return 'focus:!border-blue-highlight';
        case 'yellow':
            return 'focus:!border-yellow-highlight';
        case 'teal':
            return 'focus:!border-teal-highlight';
        case 'dark':
            return 'focus:!border-dark-highlight';
        default:
            return 'focus:!border-purple-highlight';
    }
}

function getOutlinePrimaryColor(theme) {
    switch (theme) {
        case 'red':
            return '!outline-red-primary';
        case 'green':
            return '!outline-green-primary';
        case 'blue':
            return '!outline-blue-primary';
        case 'yellow':
            return '!outline-yellow-primary';
        case 'teal':
            return '!outline-teal-primary';
        case 'dark':
            return '!outline-dark-primary';
        default:
            return '!outline-purple-primary';
    }
}

function getOutlineTextColor(theme) {
    switch (theme) {
        case 'red':
            return '!outline-red-text';
        case 'green':
            return '!outline-green-text';
        case 'blue':
            return '!outline-blue-text';
        case 'yellow':
            return '!outline-yellow-text';
        case 'teal':
            return '!outline-teal-text';
        case 'dark':
            return '!outline-dark-text';
        default:
            return '!outline-purple-text';
    }
}

function getOutlineErrorColor(theme) {
    switch (theme) {
        case 'red':
            return '!outline-red-error';
        case 'green':
            return '!outline-green-error';
        case 'blue':
            return '!outline-blue-error';
        case 'yellow':
            return '!outline-yellow-error';
        case 'teal':
            return '!outline-teal-error';
        case 'dark':
            return '!outline-dark-error';
        default:
            return '!outline-purple-error';
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

function getScrollbarTrackBackground(theme) {
    switch (theme) {
        case 'red':
            return '!scrollbar-track-red-background';
        case 'green':
            return '!scrollbar-track-green-background';
        case 'blue':
            return '!scrollbar-track-blue-background';
        case 'yellow':
            return '!scrollbar-track-yellow-background';
        case 'teal':
            return '!scrollbar-track-teal-background';
        case 'dark':
            return '!scrollbar-track-dark-background';
        default:
            return '!scrollbar-track-purple-background';
    }
}

function getScrollbarThumbText(theme) {
    switch (theme) {
        case 'red':
            return '!scrollbar-thumb-red-text';
        case 'green':
            return '!scrollbar-thumb-green-text';
        case 'blue':
            return '!scrollbar-thumb-blue-text';
        case 'yellow':
            return '!scrollbar-thumb-yellow-text';
        case 'teal':
            return '!scrollbar-thumb-teal-text';
        case 'dark':
            return '!scrollbar-thumb-dark-text';
        default:
            return '!scrollbar-thumb-purple-text';
    }
}

export {
    getBgPrimaryColor, getBgNeutralColor, getBgNeutral10Color, getBgHighlightColor, getBgHighlight20Color, getBgErrorColor, getBackgroundColor,
    getHoverBgPrimaryColor, getHoverBgHighlightColor, getHoverBgErrorColor, getHoverBgError60Color, getHoverBgNeutral50Color,
    getDisabledBgColor, getDisabledBgNeutralColor, getDisabledBgNeutral30Color, getDisabledBgHighlightColor,
    getTextColor, getTextPrimaryColor, getOppositeTextColor, getTextNeutralColor, getTextHighlightColor, getTextLinkColor, getTextDisabledColor, getTextErrorColor,
    getHoverOppositeTextColor, getHoverTextHighlightColor,
    getDisabledOppositeTextColor,
    getPlaceholderText,
    getFromSecondaryColor, getToPrimaryColor,
    getBorderPrimaryColor, getBorderTextColor, getBorderNeutralColor, getBorderErrorColor, getBorderText20Color,
    getHoverBorderHighlightColor,
    getFocusBorderPrimaryColor, getFocusBorderHighlightColor,
    getOutlinePrimaryColor, getOutlineTextColor, getOutlineErrorColor,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
};