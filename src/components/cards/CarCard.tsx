import React from 'react';

interface CarCardProps {
	car: {
		id: string;
		brand: string;
		model: string;
		stock: number;
		totalPrice: number;
		averageDailyPrice: number;
	};
}

export function CarCard({ car }: CarCardProps) {
	return (
		<div className="border rounded p-4 shadow hover:shadow-lg transition-all">
			<h2 className="text-xl font-bold">
				{car.brand} {car.model}
			</h2>
			<p>Stock: {car.stock}</p>
			<p>Total Price: ${car.totalPrice}</p>
			<p>Average Price/Day: ${car.averageDailyPrice}</p>
		</div>
	);
}
