import { useState } from "react";
import TranslatorWidget from "./TranslatorWidget";
import "../styles/translator.css";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-lg fixed w-full z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Existing logo and navigation items */}

					{/* Right side menu */}
					<div className="hidden md:flex items-center space-x-4">
						<TranslatorWidget className="mr-4" />
						<a
							href="/quote"
							className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
						>
							Get a Quote
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
							aria-expanded={isMenuOpen}
						>
							<span className="sr-only">Open main menu</span>
							{/* Add your menu icon here */}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden">
					{/* Add your mobile menu items here */}
					<div className="px-4 pt-2 pb-3 space-y-1">
						<TranslatorWidget className="py-2" />
					</div>
				</div>
			)}
		</nav>
	);
}
