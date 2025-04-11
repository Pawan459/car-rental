import React from 'react';
import { BookingProvider } from '@/context';

export default function BookingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <BookingProvider>{children}</BookingProvider>;
}
