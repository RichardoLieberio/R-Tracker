import {forwardRef} from 'react';

const Input = forwardRef(function(props, ref) {
    return (
        <input {...props} ref={ref} autoCapitalize="off" autoCorrect="off" autoComplete="off" />
    );
});

Input.displayName = 'Input';

export default Input;