'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, User, FileCheck } from 'lucide-react';

import { AvailableCar } from '@/types';
import { getDaysBetweenDates } from '@/lib/utils';
import {
	Button,
	Calendar,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Input,
} from '@/components';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuth, useBooking } from '@/context';
import { ApiService } from '@/services';
import { getImageMapper } from '@/assets';
import Link from 'next/link';

const formSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'First name must be at least 2 characters' }),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be at least 2 characters' }),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	phone: z
		.string()
		.min(10, { message: 'Phone number must be at least 10 digits' }),
	drivingLicenseNumber: z
		.string()
		.min(5, { message: 'License number must be at least 5 characters' }),
	drivingLicenseExpiry: z.date({
		required_error: 'Please select the expiry date of your driving license',
	}),
	address: z.string().min(3, {
		message: 'Address must be at least 3 characters',
	}),
});

export const BookingForm = () => {
	const { carId } = useParams();
	const searchParams = useSearchParams();
	const startDateParam = searchParams.get('start');
	const endDateParam = searchParams.get('end');

	const router = useRouter();
	const { toast } = useToast();
	const { isAuthenticated, token, logout } = useAuth();
	const { updateBooking } = useBooking();

	const [selectedCar, setSelectedCar] = useState<AvailableCar | null>(null);
	const [loading, setLoading] = useState(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			drivingLicenseNumber: '',
			address: '',
		},
	});

	useEffect(() => {
		async function fetchCarData() {
			setLoading(true);
			ApiService.getCarById(carId as string, startDateParam!, endDateParam!)
				.then((car) => {
					if (car) {
						setSelectedCar(car);
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
		if (carId && startDateParam && endDateParam) {
			fetchCarData();
		}
	}, [carId, startDateParam, endDateParam]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!startDateParam || !endDateParam || !selectedCar) {
			return;
		}

		// Check if license is valid throughout booking period
		if (values.drivingLicenseExpiry < endDate) {
			toast({
				title: 'Invalid License Expiry',
				description:
					'Your driving license must be valid throughout the booking period.',
				variant: 'destructive',
			});
			return;
		}

		// Show loading toast
		toast({
			title: 'Processing your booking',
			description: 'Please wait while we confirm your reservation...',
		});

		const bookingPayload = {
			carId: selectedCar.id,
			startDate: startDateParam,
			endDate: endDateParam,
			licenseNumber: values.drivingLicenseNumber,
			licenseExpiry: values.drivingLicenseExpiry,
			totalPrice: selectedCar.totalPrice,
			averageDailyPrice: selectedCar.averageDailyPrice,
			customerName: `${values.firstName} ${values.lastName}`,
			customerEmail: values.email,
			customerPhone: values.phone,
			customerAddress: values.address,
		};

		ApiService.bookCar(token!, bookingPayload)
			.then((bookedCar) => {
				toast({
					title: 'Booking Confirmed',
					description: 'Your booking has been successfully confirmed.',
				});

				// Update booking context
				updateBooking({
					...bookingPayload,
					id: bookedCar.id,
					car: selectedCar,
				});

				router.push('/bookings/confirmation');
			})
			.catch((error) => {
				if (error.message === 'Invalid token') {
					logout();
					router.push('/auth/login');
				}
			});
	}

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/auth/login');
		}
	}, [isAuthenticated, router]);

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (!startDateParam || !endDateParam || !selectedCar) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="text-center p-8">
					<h2 className="text-2xl font-semibold mb-4">
						Invalid Booking Parameters
					</h2>
					<p className="mb-6">
						Please select a car and dates before proceeding to booking.
					</p>
					<Link href="/" className="text-blue-600 hover:underline">
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	const startDate = new Date(startDateParam as string);
	const endDate = new Date(endDateParam as string);

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-2xl md:text-3xl font-bold mb-2">
				Complete Your Booking
			</h1>
			<p className="text-gray-600 mb-8">
				Fill out the form below to reserve your car
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
				<div className="col-span-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="bg-white p-6 rounded-lg shadow-md space-y-6">
								<h2 className="text-xl font-semibold flex items-center">
									<User className="mr-2 h-5 w-5" />
									Personal Information
								</h2>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder="John" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder="Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="john.doe@example.com"
														type="email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number</FormLabel>
												<FormControl>
													<Input placeholder="1234567890" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address</FormLabel>
												<FormControl>
													<Input placeholder="123 Main St, City" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md space-y-6">
								<h2 className="text-xl font-semibold flex items-center">
									<FileCheck className="mr-2 h-5 w-5" />
									Driver&apos;s License Information
								</h2>

								<FormField
									control={form.control}
									name="drivingLicenseNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Driver&apos;s License Number</FormLabel>
											<FormControl>
												<Input placeholder="DL12345678" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="drivingLicenseExpiry"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Driver&apos;s License Expiry Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-full pl-3 text-left font-normal',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(field.value, 'PPP')
															) : (
																<span>Select expiry date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) => date < new Date()}
														initialFocus
														className={cn('p-3 pointer-events-auto')}
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Must be valid throughout the entire booking period
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
								size="lg"
							>
								Confirm Booking
							</Button>
						</form>
					</Form>
				</div>

				<div className="col-span-1">
					<div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
						<h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

						<div className="mb-4">
							<Image
								src={getImageMapper(selectedCar)}
								alt={selectedCar.model}
								className="w-full h-40 object-cover rounded-md mb-3"
							/>
							<h3 className="font-semibold text-lg">{selectedCar.brand}</h3>
							<p className="text-gray-600">{selectedCar.model}</p>
						</div>

						<div className="border-t border-gray-200 pt-4 space-y-2">
							<div className="flex justify-between">
								<span className="text-gray-600">Pickup Date:</span>
								<span>{format(startDate, 'MMM d, yyyy')}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Return Date:</span>
								<span>{format(endDate, 'MMM d, yyyy')}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Duration:</span>
								<span>
									{getDaysBetweenDates(startDateParam, endDateParam)} days
								</span>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-4 mt-4">
							<div className="flex justify-between items-center font-semibold">
								<span>Total Price:</span>
								<span className="text-xl text-blue-600">
									${selectedCar.totalPrice}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
