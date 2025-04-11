'use client';

import { useState } from 'react';
import {
	Users,
	Fuel,
	GaugeCircle,
	Heart,
	Star,
	Calendar,
	ArrowRight,
} from 'lucide-react';
import { AvailableCar } from '@/types';
import { Button, Card, CardContent, CardFooter } from '@/components';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getImageMapper } from '@/assets';
import {
	getRandomFuelType,
	getRandomRating,
	getRandomReviewsNumber,
	getRandomSeats,
	getRandomTransmission,
} from '@/lib/car-utils';

interface CarCardProps {
	car: AvailableCar;
	startDate: string;
	endDate: string;
}

export const CarCard = ({ car, startDate, endDate }: CarCardProps) => {
	const router = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);

	const handleBookNow = () => {
		router.push(`/bookings/create/${car.id}?start=${startDate}&end=${endDate}`);
	};

	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			whileHover={{ y: -5 }}
		>
			<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
				<div className="h-48 overflow-hidden relative group">
					<Image
						src={getImageMapper(car)}
						alt={car.model}
						width={300}
						height={200}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<button
						onClick={toggleFavorite}
						className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
					>
						<Heart
							className={cn(
								'h-5 w-5 transition-colors',
								isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
							)}
						/>
					</button>
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
						<div className="flex items-center">
							<div className="bg-yellow-400 text-yellow-800 flex items-center px-2 py-1 rounded text-xs font-medium">
								<Star className="h-3 w-3 mr-1" />
								{getRandomRating()}
							</div>
							<span className="text-white text-xs ml-2">
								({getRandomReviewsNumber()} reviews)
							</span>
						</div>
					</div>
				</div>

				<CardContent className="pt-4 flex-grow">
					<div className="flex justify-between items-start mb-3">
						<div>
							<h3 className="text-lg font-semibold">{car.brand}</h3>
							<p className="text-sm text-gray-500">{car.model}</p>
						</div>
						<div className="text-right">
							<p className="text-xl font-bold text-blue-600">
								${car.totalPrice}
							</p>
							<p className="text-sm text-gray-500">
								${car.averageDailyPrice}/day avg
							</p>
						</div>
					</div>

					<div className="flex items-center text-sm text-gray-600 mb-3">
						<Calendar className="h-4 w-4 mr-1 text-gray-400" />
						<span className="text-xs">Free cancellation</span>
					</div>

					<div className="grid grid-cols-3 gap-2 my-3">
						<div className="flex items-center text-sm text-gray-600">
							<Users className="h-4 w-4 mr-1 text-gray-400" />
							<span>{getRandomSeats()} seats</span>
						</div>
						<div className="flex items-center text-sm text-gray-600">
							<GaugeCircle className="h-4 w-4 mr-1 text-gray-400" />
							<span>{getRandomTransmission()}</span>
						</div>
						<div className="flex items-center text-sm text-gray-600">
							<Fuel className="h-4 w-4 mr-1 text-gray-400" />
							<span>{getRandomFuelType()}</span>
						</div>
					</div>
				</CardContent>

				<CardFooter className="pt-0 mt-auto">
					<Button
						onClick={handleBookNow}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer group"
					>
						Book Now
						<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
					</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
};
