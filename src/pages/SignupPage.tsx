import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('alex.wright@example.com');
  const [password, setPassword] = useState('SecurePass2026!');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create your account</h2>
        <p className="text-xs text-slate-500 mt-1">Start building ATS-optimized resumes in seconds</p>
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
