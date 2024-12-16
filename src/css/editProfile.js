import store from '../redux/store';

import {getBackgroundColor, getDisabledBgColor, getTextHighlightColor, getTextErrorColor, getBorderNeutralColor, getFocusBorderHighlightColor, getBorderErrorColor} from './color';

const theme = store.getState().web.theme;

export default {
    labelMiddle: 'absolute left-3 bottom-1/2 translate-y-1/2 transition-transform cursor-text',
    labelMiddleError: `absolute left-10 bottom-1/2 translate-y-1/2 ${getTextErrorColor(theme)} transition-transform cursor-text`,
    labelTopBlur: `px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`,
    labelTopFocus: `px-2 absolute left-1 -top-3 text-sm ${getTextHighlightColor(theme)} ${getBackgroundColor(theme)} transition-transform cursor-text`,
    labelTopError: `px-2 absolute left-1 -top-3 text-sm ${getTextErrorColor(theme)} ${getBackgroundColor(theme)} transition-transform cursor-text`,
    defaultInput: `w-full px-3 py-2 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${getFocusBorderHighlightColor(theme)} ${getDisabledBgColor(theme)} disabled:cursor-not-allowed`,
    defaultInputError: `w-full px-3 py-2 ${getBackgroundColor(theme)} pl-10 border ${getBorderErrorColor(theme)} rounded-md outline-none`,
    pwdInput: `w-full px-3 py-2 pr-10 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${getFocusBorderHighlightColor(theme)} ${getDisabledBgColor(theme)} disabled:cursor-not-allowed`,
    pwdInputError: `w-full px-10 py-2 ${getBackgroundColor(theme)} border ${getBorderErrorColor(theme)} rounded-md outline-none`
};