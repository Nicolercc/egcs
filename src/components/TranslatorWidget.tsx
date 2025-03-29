import { useEffect, useRef } from "react";

interface Props {
	className?: string;
}

type GoogleTranslate = {
	TranslateElement: {
		new (
			options: {
				pageLanguage: string;
				includedLanguages: string;
				layout: any;
				autoDisplay: boolean;
			},
			element: HTMLElement | null
		): void;
		InlineLayout: {
			SIMPLE: any;
		};
	};
};

type Google = {
	translate?: GoogleTranslate;
};

declare global {
	interface Window {
		google?: Google;
		googleTranslateElementInit?: () => void;
	}
}

export default function TranslatorWidget({ className = "" }: Props) {
	const translatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initTranslate = () => {
			if (!window.google?.translate?.TranslateElement) return;

			new window.google.translate.TranslateElement(
				{
					pageLanguage: "en",
					includedLanguages: "en,es,fr,it,pt",
					layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
					autoDisplay: false,
				},
				translatorRef.current
			);
		};

		// Add the Google Translate script
		const script = document.createElement("script");
		script.src =
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
		script.async = true;

		// Initialize when the script loads
		window.googleTranslateElementInit = initTranslate;
		document.head.appendChild(script);

		return () => {
			// Cleanup
			window.googleTranslateElementInit = undefined;
			script.remove();
		};
	}, []);

	return (
		<div className={`translator-widget ${className}`}>
			<div
				ref={translatorRef}
				className="goog-te-gadget custom-translator"
				aria-label="Language Translator"
				role="region"
			/>
		</div>
	);
}
