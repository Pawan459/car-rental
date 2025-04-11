'use client';

import { BookingData } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
	booking: BookingData | null;
	updateBooking: (newBooking: BookingData) => void;
	resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
	const [booking, setBooking] = useState<BookingData | null>(null);

	const resetBooking = () => {
		setBooking(null);
	};

	const updateBooking = (newBooking: BookingData) => {
		setBooking(newBooking);
	};

	return (
		<BookingContext.Provider
			value={{
				booking,
				updateBooking,
				resetBooking,
			}}
		>
			{children}
		</BookingContext.Provider>
	);
};

export const useBooking = () => {
	const context = useContext(BookingContext);
	if (context === undefined) {
		throw new Error('useBooking must be used within an BookingProvider');
	}
	return context;
};
