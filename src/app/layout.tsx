import { Header, Footer } from '@/components';
import React from 'react';
import './globals.css'; // Ensure Tailwind is imported here

export const metadata = {
	title: 'Bolttech Carental',
	description: 'A Modern Car Rental MVP',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>Bolttech Carental</title>
			</head>
			<body className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow container mx-auto p-4">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
