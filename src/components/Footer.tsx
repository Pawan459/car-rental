import { Car, Github } from 'lucide-react';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from '@/constants';
import React from 'react';
import Link from 'next/link';

export function Footer() {
	return (
		<footer className="bg-gray-800 text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<Car className="h-6 w-6 text-blue-400" />
							<span className="text-xl font-bold">{PRODUCT_NAME}</span>
						</div>
						<p className="text-gray-400 mb-4">{PRODUCT_DESCRIPTION}</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									></path>
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<Github className="h-5 w-5" />
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/cars"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Browse Cars
								</Link>
							</li>
							<li>
								<Link
									href="/bookings"
									className="text-gray-400 hover:text-white transition-colors"
								>
									My Bookings
								</Link>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Car Categories</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Economy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Compact
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									SUV
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Luxury
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Convertible
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Contact Us</h3>
						<ul className="space-y-2">
							<li className="flex items-start">
								<svg
									className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									></path>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									></path>
								</svg>
								<span className="text-gray-400">
									123 Rental Street, City, Country
								</span>
							</li>
							<li className="flex items-center">
								<svg
									className="h-5 w-5 text-gray-400 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
								<a
									href="mailto:info@carrental.com"
									className="text-gray-400 hover:text-white transition-colors"
								>
									info@carrental.com
								</a>
							</li>
							<li className="flex items-center">
								<svg
									className="h-5 w-5 text-gray-400 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									></path>
								</svg>
								<a
									href="tel:+1234567890"
									className="text-gray-400 hover:text-white transition-colors"
								>
									+1 (234) 567-890
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
					<p>
						© {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
