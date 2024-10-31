import PropTypes from 'prop-types';
import {useState} from 'react';

import {IoArrowBack} from 'react-icons/io5';
import OtpInput from 'react-otp-input';

export default function VerifyEmail(props) {
    const {
        email,
        stepHandler
    } = props;
    const [otp, setOtp] = useState('');

    function back() {
        stepHandler('register');
    }

    return (
        <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-full mx-auto py-8 flex flex-col gap-12">
            <section onClick={back} className="w-fit cursor-pointer">
                <IoArrowBack className="text-2xl text-purple-text" />
            </section>
            <section className="flex flex-col gap-8">
                <img src="/Email Verification.png" alt="Email Verification" className="w-40 phone:w-48 tablet:w-56 desktop:w-64 mx-auto" />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl text-purple-text font-semibold">Verify your email</h1>
                    <p className="text-base text-purple-text">Check your email {email} for the OTP and enter it below to continue</p>
                </div>
                <div className="w-fit mx-auto flex flex-col gap-8">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        inputType="tel"
                        placeholder={'-' * +process.env.OTP_LENGTH}
                        numInputs={+process.env.OTP_LENGTH}
                        shouldAutoFocus={true}
                        renderInput={(props) => <input {...props} />}
                        containerStyle="gap-1 phone:gap-2"
                        inputStyle="!w-8 !h-10 tablet:!w-10 tablet:!h-12 text-2xl text-purple-text border border-purple-neutral outline-purple-primary rounded-md"
                    />
                    <button className="w-full py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Submit</button>
                </div>
            </section>
        </section>
    );
}

VerifyEmail.propTypes = {
    email: PropTypes.string,
    stepHandler: PropTypes.func
};