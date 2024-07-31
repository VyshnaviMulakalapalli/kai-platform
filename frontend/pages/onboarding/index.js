import React, { useState } from 'react';

import ProfileSetup from '../../components/Onboarding/ProfileSetup';
import WelcomeScreen from '../../components/Onboarding/WelcomeScreen';

const OnboardingPage = () => {
  const [step, setStep] = useState('welcome');

  const handleStart = () => {
    setStep('profileSetup');
  };

  const handleNext = () => {
    // eslint-disable-next-line no-console
    console.log('Profile setup complete');
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      {step === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {step === 'profileSetup' && <ProfileSetup onNext={handleNext} />}
    </>
  );
};

export default OnboardingPage;
