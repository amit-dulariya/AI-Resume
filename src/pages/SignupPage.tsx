import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Check, Chrome } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { authenticate } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const { registerWithFirebase, signInWithGoogle } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setGoogleError(null);
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.warn('Google sign-in notice:', err);
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        setGoogleError(err?.message || 'Google sign-in was not completed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerWithFirebase(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      console.warn('Signup note:', err);
      authenticate(email, password);
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create your account</h2>
        <p className="text-xs text-slate-500 mt-1">Start building ATS-optimized resumes in seconds</p>
      </div>

      {/* Google Authentication Option */}
      <button
        type="button"
        id="google-signup-btn"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
        className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <Chrome className="w-4 h-4 text-slate-700" />
        <span>{isGoogleLoading ? 'Connecting with Google...' : 'Continue with Google'}</span>
      </button>

      {googleError && (
        <div className="mt-2.5 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg text-center">
          {googleError}
        </div>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-[11px] uppercase">
          <span className="bg-white px-2.5 text-slate-400 font-medium">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Jane Doe"
          required
          leftIcon={<User className="w-4 h-4" />}
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          leftIcon={<Lock className="w-4 h-4" />}
          hint="Must include at least 8 characters"
        />

        <div className="text-xs text-slate-500 space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-emerald-700">
            <Check className="w-3.5 h-3.5" />
            <span>Free forever tier included</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <Check className="w-3.5 h-3.5" />
            <span>No credit card required</span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Create Free Account
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-slate-900 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};
