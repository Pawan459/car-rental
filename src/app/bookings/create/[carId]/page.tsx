import { BookingForm } from '@/page-components';
import { Suspense } from 'react';

export default function CreateBookingPage() {
	return (
		<div>
			<Suspense>
				<BookingForm />
			</Suspense>
		</div>
	);
}
