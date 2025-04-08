import React from 'react';

interface BookingCardProps {
	booking: {
		id: string;
		carId: string;
		startDate: string;
		endDate: string;
		totalPrice: number;
		averageDailyPrice: number;
	};
}

export function BookingCard({ booking }: BookingCardProps) {
	return (
		<div className="border rounded p-4 shadow hover:shadow-lg transition-all">
			<h2 className="text-xl font-bold">Booking ID: {booking.id}</h2>
			<p>Car ID: {booking.carId}</p>
			<p>
				Duration: {new Date(booking.startDate).toLocaleDateString()} -{' '}
				{new Date(booking.endDate).toLocaleDateString()}
			</p>
			<p>Total Price: ${booking.totalPrice}</p>
			<p>Average Daily Price: ${booking.averageDailyPrice}</p>
		</div>
	);
}
