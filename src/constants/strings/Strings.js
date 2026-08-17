import { s } from "react-native-size-matters";

export const Strings = {
    onboardingTitle: {
        title1: 'Manage Projects Effortlessly',
        title2: 'Collaborate With Your Team',
        title3: 'Track Progress & Analytics'

    },
    onboardingSubtitle: {
        subtitle1: 'Organize work into projects with smart prioritization and real-time progress tracking.',
        subtitle2: 'Assign tasks, share files, and communicate seamlessly with your team in one place.',
        subtitle3: 'Get powerful insights with charts and reports to keep every project on schedule.'
    },
    buttonText: {
        skip: 'Skip',
        continue: 'Continue → ',
        getStarted: 'Get Started → ',
        signIn: "Sign In",
        createAccount: "Create Account",
        sendResetCode: "Send Reset Code",
        verifyOTP: "Verify OTP",
        google: "Google",
        github: 'GitHub',
        resetPassword: "Reset "
    },

    taskFlow: 'TaskFlow',
    appSlogen: 'Manage, Build, Deliver',

    welcomeBack: 'Welcome back',
    signInTaskflowText: "Sign In to your Taskflow Account",

    forgotPassword: 'Forgot Password?',
    doNotHavaAccount: "Dont have an  account?",
    alreadyHaveAccount: "Already have an account?",
    termsConditionsText: "I agree to the ",
    terms: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    andtext: 'and',
    resetPassword: 'Reset Password',
    resetPasswordInfo: 'Enter your email and we ll send a verification code to reset your password.',
    sendResetCode: 'Send Reset Code',
    backToText: "Back To",
    enterOTPText: 'Enter OTP Code',
    sixDigitCode: 'We sent a 6-digit code to',
    didntReceiveCode: "Didn't receive code?",
    createNewPassword: "Create New Password",
    newPassword: "NEW PASSWORD",
    resetPasswordCondition: 'Must be different from previously used passwords.',
    inputLabel: {
        email: "EMAIL",
        password: "PASSWORD",
        firstName: "FIRST NAME",
        lastName: "LAST NAME",
        phone: 'PHONE',
        company: 'COMPANY',
        cnfmPassword: 'CONFIRM PASSWORD',
        address: 'ADDRESS',
    },

    placeholders: {
        email: 'you@company.com',
        phone: '+1 555 000 0000',
        company: 'Acme Corp',
        password: '••••••••',
        firstName: "Alex",
        lastName: "Chen",

    },
    passwordConditions: {
        lengthValidation: 'At least 8 characters',
        uppercaseCondition: 'One uppercase letter',
        oneNumberOrSymbol: 'One number or symbol',
    },
    passwordValidationRules: {
        required: {
            email: "Email is Required",
            password: "Password Required",
            firstName: "First name is required",
            lastName: 'Last name is required',
            phone: 'Mobile Number is required',
            company: 'Company Name is required',
            termsConditions: 'Please accept terms and conditions',
            passwordNotMatch: 'Passwords do not match'
        },


    },
    successMessages: {
        checkEmail :'Check Your Email',
        resetLinkSent : 'password reset link has been sent',
    },
    errorMessages: {
        error: "ERROR",
        emailRequired : 'Please enter your email address.',
        invalidEmail : 'Invalid Email',
        noAccountFound : 'Account Not Found',
        userNotExist : 'No account exists with this email address.',
        manyAttempts : 'Too Many Attempts',
        manyRequestError : 'Too many requests. Please try again later.',
        tryAgainMessage : 'Something went wrong. Please try again.',
    }
}