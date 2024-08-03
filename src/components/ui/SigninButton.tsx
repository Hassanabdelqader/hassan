'use client'

import { useRouter } from 'next/navigation';

const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <button 
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
    onClick={handleSignIn}>
      Sign in
    </button>
  );
};

export default SignInButton;