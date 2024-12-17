import {getBackgroundColor, getDisabledBgColor, getTextPrimaryColor, getTextHighlightColor, getTextErrorColor, getBorderNeutralColor, getFocusBorderPrimaryColor, getFocusBorderHighlightColor, getBorderErrorColor, getOutlinePrimaryColor, getOutlineTextColor, getOutlineErrorColor} from './color';

export default function(theme) {
    return {
        labelMiddle: 'absolute left-3 bottom-1/2 translate-y-1/2 transition-transform cursor-text',
        labelMiddleError: `absolute left-10 bottom-1/2 translate-y-1/2 ${getTextErrorColor(theme)} transition-transform cursor-text`,
        labelTopBlur: `px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`,
        labelTopFocus: `px-2 absolute left-1 -top-3 text-sm ${theme === 'dark' ? getTextHighlightColor(theme) : getTextPrimaryColor(theme)} ${getBackgroundColor(theme)} transition-transform cursor-text`,
        labelTopError: `px-2 absolute left-1 -top-3 text-sm ${getTextErrorColor(theme)} ${getBackgroundColor(theme)} transition-transform cursor-text`,
        defaultInput: `w-full px-3 py-2 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${theme === 'dark' ? getFocusBorderHighlightColor(theme) : getFocusBorderPrimaryColor(theme)} ${getDisabledBgColor(theme)} disabled:cursor-not-allowed`,
        defaultInputError: `w-full px-3 py-2 ${getBackgroundColor(theme)} pl-10 border ${getBorderErrorColor(theme)} rounded-md outline-none`,
        pwdInput: `w-full px-3 py-2 pr-10 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${theme === 'dark' ? getFocusBorderHighlightColor(theme) : getFocusBorderPrimaryColor(theme)} ${getDisabledBgColor(theme)} disabled:cursor-not-allowed`,
        pwdInputError: `w-full px-10 py-2 ${getBackgroundColor(theme)} border ${getBorderErrorColor(theme)} rounded-md outline-none`,
        otp: `!w-7 phone:!w-8 phone:!h-10 desktop:!w-10 desktop:!h-12 text-2xl ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} ${theme === 'dark' ? getOutlineTextColor(theme) : getOutlinePrimaryColor(theme)} rounded-md`,
        disabledOtp: `!w-7 phone:!w-8 phone:!h-10 desktop:!w-10 desktop:!h-12 text-2xl ${getBackgroundColor(theme)} ${getDisabledBgColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md cursor-not-allowed`,
        errorOtp: `!w-7 phone:!w-8 phone:!h-10 desktop:!w-10 desktop:!h-12 text-2xl ${getBackgroundColor(theme)} border ${getBorderErrorColor(theme)} ${getOutlineErrorColor(theme)} rounded-md`
    };
};