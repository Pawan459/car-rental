import {
	Header,
	Footer,
	TooltipProvider,
	Toaster,
	CustomSonner,
} from '@/components';
import React from 'react';
import { AuthProvider } from '@/context';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from '@/constants';

import './globals.css'; // Ensure Tailwind is imported here

export const metadata = {
	title: `Bolttech ${PRODUCT_NAME}`,
	description: PRODUCT_DESCRIPTION,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>{`Bolttech ${PRODUCT_NAME}`}</title>
			</head>
			<body className="min-h-screen flex flex-col bg-gray-50">
				<TooltipProvider>
					<Toaster />
					<CustomSonner />
					<AuthProvider>
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</AuthProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
