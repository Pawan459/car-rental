'use client';

import { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Label } from '@/components';
import { useToast } from '@/hooks';
import Link from 'next/link';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const { login, isLoading, isAuthenticated } = useAuth();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast({
				title: 'Error',
				description: 'Please fill in all fields',
				variant: 'destructive',
			});
			return;
		}

		login(email, password).then(() => {
			toast({
				title: 'Success!',
				description: 'You have successfully logged in',
			});
		});
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/'); // Redirect to home if already authenticated
		}
	}, [isAuthenticated, router]);

	return (
		<div className="w-full max-w-md">
			<div className="bg-white rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
					<p className="text-gray-600 mt-2">Login to manage your bookings</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="h-5 w-5 text-gray-400" />
							</div>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="pl-10"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="pl-10 pr-10"
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5 text-gray-400" />
								) : (
									<Eye className="h-5 w-5 text-gray-400" />
								)}
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-700"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-blue-600 hover:text-blue-500"
							>
								Forgot password?
							</a>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
						disabled={isLoading}
					>
						{isLoading ? 'Logging in...' : 'Log in'}
					</Button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Don&apos;t have an account?{' '}
						<Link
							href="/auth/register"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
