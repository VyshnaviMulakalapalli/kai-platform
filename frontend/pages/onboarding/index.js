import React, { useState } from 'react';
import WelcomeScreen from '../../components/Onboarding/WelcomeScreen';
import ProfileSetup from '../../components/Onboarding/ProfileSetup';

const OnboardingPage = () => {
    const [step, setStep] = useState('welcome');

    const handleStart = () => {
        setStep('profileSetup');
    };

    const handleNext = () => {
        console.log('Profile setup complete');
    };

    return (
        <>
            {step === 'welcome' && <WelcomeScreen onStart={handleStart} />}
            {step === 'profileSetup' && <ProfileSetup onNext={handleNext} />}
        </>
    );
};

export default OnboardingPage;
