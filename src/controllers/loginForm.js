import css from '../css/registerForm';

function inputErrorHandler(error, value, label, input, pwd=false) {
    if (error) {
        label.current.className = value ? css.labelTopError : css.labelMiddleError;
        input.current.className = pwd ? css.pwdInputError : css.defaultInputError;
    } else {
        label.current.className = value ? css.labelTopBlur : css.labelMiddle;
        input.current.className = pwd ? css.pwdInput : css.defaultInput;
    }
}

export default {inputErrorHandler};