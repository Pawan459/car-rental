'use client';

import { getImageMapper } from '@/assets';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components';
import { useAuth } from '@/context';
import { getBookingStatus, getDaysBetweenDates } from '@/lib/utils';
import { ApiService } from '@/services';
import { BookingData } from '@/types';
import { format } from 'date-fns';
import { Car, Calendar, Clock, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyBookings = () => {
	const [bookings, setBookings] = useState<BookingData[]>([]);
	const router = useRouter();
	const { token, isAuthenticated, logout } = useAuth();

	useEffect(() => {
		ApiService.myBookings(token!)
			.then((response) => {
				setBookings(response);
			})
			.catch((error) => {
				if (error.message === 'Invalid token') {
					logout();
					router.push('/auth/login');
				}
			});
	}, [logout, router, token]);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/auth/login');
		}
	}, [isAuthenticated, router]);

	return (
		<div className="flex-1 container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
				<p className="text-gray-600 mt-2">
					View and manage your car rental bookings
				</p>
			</div>

			{bookings.length === 0 ? (
				<div className="text-center py-12">
					<div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
						<Car className="h-12 w-12 text-gray-400" />
					</div>
					<h2 className="text-xl font-medium text-gray-900 mb-2">
						No bookings yet
					</h2>
					<p className="text-gray-600 mb-6 max-w-md mx-auto">
						You haven&apos;t made any car bookings yet. Start exploring our
						available cars and plan your next trip!
					</p>
					<Button asChild>
						<Link href="/">Find a car</Link>
					</Button>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{bookings.map((booking) => (
						<Card key={booking.id} className="overflow-hidden">
							<div className="h-48 bg-gray-200 relative">
								<Image
									src={getImageMapper(booking.car)}
									alt={booking.car.model}
									width={300}
									height={200}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
									{getBookingStatus(booking.startDate, booking.endDate)}
								</div>
							</div>

							<CardHeader>
								<CardTitle>{booking.car.model}</CardTitle>
								<CardDescription>
									{booking.car.model} • {5} seats
								</CardDescription>
							</CardHeader>

							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center text-sm">
										<Calendar className="h-4 w-4 mr-2 text-gray-500" />
										<span>
											{format(booking.startDate, 'MMM d, yyyy')} -{' '}
											{format(booking.endDate, 'MMM d, yyyy')}
										</span>
									</div>
									<div className="flex items-center text-sm">
										<Clock className="h-4 w-4 mr-2 text-gray-500" />
										<span>
											{getDaysBetweenDates(booking.startDate, booking.endDate)}{' '}
											days
										</span>
									</div>
									<div className="flex items-center text-sm">
										<CreditCard className="h-4 w-4 mr-2 text-gray-500" />
										<span>Total price: ${booking.totalPrice}</span>
									</div>
								</div>
							</CardContent>

							<CardFooter className="border-t bg-gray-50 px-6 py-4">
								<div className="flex gap-3 w-full">
									{getBookingStatus(booking.startDate, booking.endDate) ===
										'upcoming' && (
										<Button variant="destructive" className="w-full">
											Cancel
										</Button>
									)}
									<Button className="w-full" variant="outline">
										View Details
									</Button>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default MyBookings;
