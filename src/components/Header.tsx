import Link from 'next/link';
import React from 'react';

export function Header() {
	return (
		<header className="bg-blue-600 text-white p-4 shadow">
			<nav className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-6">
					<Link href="/" className="font-bold text-xl hover:underline">
						Bolttech Carental
					</Link>
					<Link href="/bookings" className="hover:underline">
						My Bookings
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<Link href="/auth/signin" className="hover:underline">
						Sign In
					</Link>
					<Link href="/auth/register" className="hover:underline">
						Register
					</Link>
				</div>
			</nav>
		</header>
	);
}
