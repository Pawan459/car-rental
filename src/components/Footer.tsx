import React from 'react';

export function Footer() {
	return (
		<footer className="bg-gray-200 text-gray-700 p-4 mt-8">
			<div className="container mx-auto text-center">
				© {new Date().getFullYear()} Bolttech Carental. All rights reserved.
			</div>
		</footer>
	);
}
