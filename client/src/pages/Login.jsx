import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { login as loginRequest } from '../services/authService';
import { useAuth } from '../hooks/useAuth.js';

const MotionDiv = motion.div;
const MotionButton = motion.button;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await loginRequest({ email, password });
      login({ user: data.user, token: data.token });
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hb-dark via-[#12131a] to-[#09090d] px-4 py-8 sm:py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white/10 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur"
      >
        <h1 className="text-2xl sm:text-3xl font-display text-white font-semibold text-center mb-6">
          Login to Heimage Bot
        </h1>
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white/70 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-hb-primary transition"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              className="block text-sm text-white/70 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-hb-primary transition"
              required
              autoComplete="current-password"
              minLength={6}
            />
          </div>
          <MotionButton
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-full bg-hb-primary text-white text-sm sm:text-base font-medium hover:bg-hb-secondary transition disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </MotionButton>
        </form>
        <p className="text-xs sm:text-sm text-white/60 text-center mt-5 sm:mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-hb-secondary hover:text-white font-medium">
            Sign up
          </Link>
        </p>
      </MotionDiv>
    </div>
  );
};

export default Login;

