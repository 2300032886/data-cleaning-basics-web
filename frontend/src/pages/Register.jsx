import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/register', { name, email, password });
            toast.success("Account created successfully! Please log in.");
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.error || "Registration failed. Try a different email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-4 py-12 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card w-full p-8 flex flex-col"
            >
                <div className="flex items-center gap-3 mb-6 justify-center text-primary">
                    <UserPlus size={28} />
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-muted">Full Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            placeholder="John Doe"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-muted">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-muted">Password</label>
                        <input
                            type="password"
                            required
                            className="input"
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                        {!loading && <ArrowRight size={18} />}
                    </button>

                    <p className="text-center text-sm text-text-muted mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium focus:outline-none">
                            Sign in
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
