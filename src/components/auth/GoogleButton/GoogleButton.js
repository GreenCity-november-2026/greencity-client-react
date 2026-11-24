import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from '../../../services/translation/TranslationService';
import './GoogleButton.scss';

const GoogleButton = ({ onSuccess, onError }) => {
  const { signInWithGoogle } = useAuth();
  const { currentLanguage } = useTranslation();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('Google Sign-In successful:', credentialResponse);

      const token = credentialResponse.credential;
      const userData = await signInWithGoogle(token, currentLanguage);

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(userData);
      }
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    }
  };

  const handleError = (error) => {
    console.error('Google Sign-In error:', error);
    if (onError && typeof onError === 'function') {
      onError(error);
    }
  };

  return (
    <div className="google-button-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
};

export default GoogleButton;
