import {forwardRef} from 'react';

const Input = forwardRef(function(props, ref) {
    return (
        <input {...props} ref={ref} autoCapitalize="off" autoComplete="off" spellCheck="false" />
    );
});

Input.displayName = 'Input';

export default Input;