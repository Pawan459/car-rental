import { HeroSection, SearchSection, CarListing } from '@/page-components';
import React, { Suspense } from 'react';

export default function HomePage() {
	return (
		<div>
			<HeroSection />
			<SearchSection />
			<Suspense fallback={<div>Loading...</div>}>
				<CarListing />
			</Suspense>
		</div>
	);
}
