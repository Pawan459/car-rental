'use client';

import { useEffect } from 'react';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Car, Clock } from 'lucide-react';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context';

const BookingConfirmation = () => {
	const router = useRouter();
	const { booking: bookingDetails } = useBooking();

	useEffect(() => {
		// If accessed directly without booking details, redirect to home
		if (!bookingDetails) {
			router.push('/');
		}
	}, [bookingDetails, router]);

	return (
		bookingDetails && (
			<div className="flex-1 container mx-auto px-4 py-12">
				<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
					<div className="bg-green-600 p-6 text-white text-center">
						<CheckCircle className="h-16 w-16 mx-auto mb-4" />
						<h1 className="text-2xl md:text-3xl font-bold">
							Booking Confirmed!
						</h1>
						<p className="mt-2">
							Your car rental has been successfully booked.
						</p>
					</div>

					<div className="p-6 md:p-8">
						<div className="mb-8">
							<h2 className="text-xl font-semibold mb-4">Booking Details</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="flex items-start">
										<Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
										<div>
											<p className="text-sm text-gray-500">Rental Period</p>
											<p className="font-medium">
												{format(
													new Date(bookingDetails.startDate),
													'MMMM d, yyyy'
												)}{' '}
												-{' '}
												{format(
													new Date(bookingDetails.endDate),
													'MMMM d, yyyy'
												)}
											</p>
										</div>
									</div>

									<div className="flex items-start">
										<Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
										<div>
											<p className="text-sm text-gray-500">Duration</p>
											<p className="font-medium">
												{Math.ceil(
													(new Date(bookingDetails.endDate).getTime() -
														new Date(bookingDetails.startDate).getTime()) /
														(1000 * 60 * 60 * 24)
												)}{' '}
												days
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-start">
										<Car className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
										<div>
											<p className="text-sm text-gray-500">Vehicle</p>
											<p className="font-medium">{bookingDetails.car.brand}</p>
											<p className="text-sm text-gray-500">
												{bookingDetails.car.model}
											</p>
										</div>
									</div>

									<div className="flex items-start">
										<svg
											className="h-5 w-5 text-gray-500 mt-0.5 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										<div>
											<p className="text-sm text-gray-500">Total Amount</p>
											<p className="font-medium text-lg text-green-600">
												${bookingDetails.totalPrice}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mb-8">
							<h2 className="text-xl font-semibold mb-4">
								Customer Information
							</h2>
							<p>
								<span className="text-gray-500">Name:</span>{' '}
								{bookingDetails.customerName}
							</p>
							<p>
								<span className="text-gray-500">Email:</span>{' '}
								{bookingDetails.customerEmail}
							</p>
						</div>

						<div className="bg-gray-50 p-4 rounded-md mb-6">
							<p className="text-sm text-gray-600">
								A confirmation email has been sent to your email address with
								all the details of your booking.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button
								className="cursor-pointer"
								onClick={() => router.push('/')}
								variant="outline"
							>
								Return to Home
							</Button>

							{/* This would typically link to a "My Bookings" page in a real app */}
							<Button className="cursor-pointer" onClick={() => window.print()}>
								Print Receipt
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default BookingConfirmation;
