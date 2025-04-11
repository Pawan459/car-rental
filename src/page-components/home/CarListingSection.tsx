'use client';

import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { AvailableCar } from '@/types';
import {
	Skeleton,
	Slider,
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Input,
	Label,
	CarCard,
} from '@/components';
import { useSearchParams } from 'next/navigation';
import { ApiService } from '@/services';

const formatDate = (date: string): string => {
	return format(date, 'MMM dd, yyyy');
};

const sortOptions = [
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'name-desc', label: 'Name (Z-A)' },
];

const sortCars = (cars: AvailableCar[], sortOption: string) => {
	switch (sortOption) {
		case 'price-asc':
			return [...cars].sort((a, b) => a.totalPrice - b.totalPrice);
		case 'price-desc':
			return [...cars].sort((a, b) => b.totalPrice - a.totalPrice);
		case 'name-asc':
			return [...cars].sort((a, b) => a.model.localeCompare(b.model));
		case 'name-desc':
			return [...cars].sort((a, b) => b.model.localeCompare(a.model));
		default:
			return cars;
	}
};

export const CarListing = () => {
	const searchParams = useSearchParams();
	const startDate = searchParams.get('start');
	const endDate = searchParams.get('end');

	const [cars, setCars] = useState<AvailableCar[]>([]);
	const [loading, setLoading] = useState(true);
	const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOption, setSortOption] = useState('');

	useEffect(() => {
		if (!startDate || !endDate) return;

		setLoading(true);

		ApiService.availableCars(startDate, endDate)
			.then((response) => {
				setCars(response);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [startDate, endDate]);

	const filteredCars = useMemo(() => {
		return cars.filter((car) => {
			const matchesSearchTerm = car.model
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesPriceRange =
				car.averageDailyPrice >= priceRange[0] &&
				car.averageDailyPrice <= priceRange[1];
			return matchesSearchTerm && matchesPriceRange;
		});
	}, [cars, priceRange, searchTerm]);

	const sortedCars = useMemo(() => {
		return sortCars(filteredCars, sortOption);
	}, [filteredCars, sortOption]);

	const handlePriceRangeChange = (value: number[]) => {
		setPriceRange(value);
	};

	return (
		startDate &&
		endDate && (
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-4">Available Cars</h1>
				<p className="text-gray-600 mb-4">
					Showing cars available from {formatDate(startDate)} to{' '}
					{formatDate(endDate)}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{/* Filters Section */}
					<div className="md:col-span-1">
						<Card>
							<CardHeader>
								<CardTitle>Filters</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label htmlFor="price-range">
										Price Range (${priceRange[0]} - ${priceRange[1]})
									</Label>
									<Slider
										id="price-range"
										min={0}
										max={200}
										step={10}
										defaultValue={priceRange}
										onValueChange={handlePriceRangeChange}
									/>
								</div>
								<div>
									<Label htmlFor="search">Search</Label>
									<Input
										type="text"
										id="search"
										placeholder="Search by car name..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
								<div>
									<Label htmlFor="sort">Sort By</Label>
									<select
										id="sort"
										className="w-full border rounded-md py-2 px-3"
										value={sortOption}
										onChange={(e) => setSortOption(e.target.value)}
									>
										<option value="">None</option>
										{sortOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Car Listing Section */}
					<div className="md:col-span-3">
						{loading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{[...Array(6)].map((_, i) => (
									<div key={i} className="space-y-2">
										<Skeleton className="h-40 w-full" />
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
										<Skeleton className="h-8 w-full" />
									</div>
								))}
							</div>
						) : sortedCars.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{sortedCars.map((car) => (
									<CarCard
										key={car.id}
										car={car}
										startDate={startDate || new Date().toISOString()}
										endDate={endDate || new Date().toISOString()}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-10">
								<h2 className="text-xl font-semibold text-gray-700">
									No cars available for the selected dates.
								</h2>
								<p className="text-gray-500">
									Please adjust your search criteria and try again.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	);
};
