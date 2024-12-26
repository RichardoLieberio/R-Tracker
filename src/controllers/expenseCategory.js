import css from '../css/expenseCategory';

function inputErrorHandler(theme, error, value, setLabelClass, setInputClass, color=false) {
    if (error) {
        setLabelClass(value ? css(theme).labelTopError : css(theme).labelMiddleError);
        setInputClass(color ? css(theme).colorInputError : css(theme).defaultInputError);
    } else {
        setLabelClass(value ? css(theme).labelTopBlur : css(theme).labelMiddle);
        setInputClass(color ? css(theme).colorInput : css(theme).defaultInput);
    }
}

export default {inputErrorHandler};