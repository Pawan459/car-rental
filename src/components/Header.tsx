'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Car, Home, LogIn, UserPlus } from 'lucide-react';
import { PRODUCT_NAME } from '@/constants';
import { useAuth } from '@/context';

export function Header() {
	const pathname = usePathname();
	const { isAuthenticated } = useAuth();

	return (
		<header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
			<div className="container mx-auto px-4 flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-2">
					<Car className="h-6 w-6 text-blue-600" />
					<span className="text-xl font-bold text-blue-600">
						{PRODUCT_NAME}
					</span>
				</Link>

				<nav className="flex items-center space-x-6">
					<Link
						href="/"
						className={`flex items-center space-x-1 cursor-pointer ${
							pathname === '/'
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition-colors'
						}`}
					>
						<Home className="h-5 w-5" />
						<span>Home</span>
					</Link>

					<Link
						href="/bookings"
						className={`flex items-center space-x-1 cursor-pointer ${
							pathname === '/bookings'
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition-colors'
						}`}
					>
						<Car className="h-5 w-5" />
						<span>My Bookings</span>
					</Link>

					{!isAuthenticated && (
						<div className="flex items-center space-x-6">
							<div className="border-l border-gray-300 h-6 mx-2"></div>

							<Link
								href="/auth/login"
								className={`flex items-center space-x-1 cursor-pointer ${
									pathname === '/login'
										? 'text-blue-600 font-medium'
										: 'text-gray-600 hover:text-blue-600 transition-colors'
								}`}
							>
								<LogIn className="h-5 w-5" />
								<span>Login</span>
							</Link>

							<Link
								href="/auth/register"
								className={`flex items-center space-x-1 cursor-pointer ${
									pathname === '/register'
										? 'text-blue-600 font-medium'
										: 'text-gray-600 hover:text-blue-600 transition-colors'
								}`}
							>
								<UserPlus className="h-5 w-5" />
								<span>Register</span>
							</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
