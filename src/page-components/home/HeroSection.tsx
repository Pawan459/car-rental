import { ArrowRight } from 'lucide-react';
import { Button } from '@/components';

export const HeroSection = () => {
	return (
		<section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
						Find Your Perfect Rental Car
					</h1>
					<p className="text-lg md:text-xl mb-8 text-blue-100">
						Browse our selection of quality rental cars at competitive prices.
						Easy booking, no hidden fees.
					</p>
					<Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
						Explore Cars <ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	);
};
