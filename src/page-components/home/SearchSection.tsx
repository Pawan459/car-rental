'use client';

import { useState } from 'react';
import { Calendar, Car, MapPin } from 'lucide-react';
import { SearchForm } from '@/components';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type TabValue = 'car-rental' | 'car-sharing' | 'airport-transfer';

export const SearchSection = () => {
	const [activeTab, setActiveTab] = useState<TabValue>('car-rental');

	const tabs = [
		{
			id: 'car-rental',
			label: 'Car Rental',
			icon: <Car className="w-4 h-4 mr-2" />,
		},
		{
			id: 'car-sharing',
			label: 'Car Sharing',
			icon: <MapPin className="w-4 h-4 mr-2" />,
		},
		{
			id: 'airport-transfer',
			label: 'Airport Transfer',
			icon: <Calendar className="w-4 h-4 mr-2" />,
		},
	];

	return (
		<section className="py-8 md:py-12 relative -mt-16 md:-mt-24">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="bg-white rounded-2xl shadow-xl border border-gray-100  overflow-hidden"
				>
					<div className="flex border-b border-gray-200 ">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as TabValue)}
								className={cn(
									'flex items-center justify-center flex-1 px-4 py-4 text-sm font-medium transition-colors cursor-pointer',
									activeTab === tab.id
										? 'text-blue-600  border-b-2 border-blue-600'
										: 'text-gray-500  hover:text-blue-600'
								)}
							>
								{tab.icon}
								{tab.label}
							</button>
						))}
					</div>

					<div className="p-6 md:p-8">
						<h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
							{activeTab === 'car-rental' && 'When do you need a car?'}
							{activeTab === 'car-sharing' && 'Find a car near you'}
							{activeTab === 'airport-transfer' && 'Book your airport transfer'}
						</h2>

						<SearchForm />

						<div className="mt-6 text-center text-sm text-gray-500">
							<p>
								No credit card fees • Free cancellation • 24/7 customer support
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
