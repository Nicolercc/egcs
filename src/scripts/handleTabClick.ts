export function handleTabClick(event: Event) {
	const button = event.currentTarget as HTMLButtonElement;
	const tabId = button.getAttribute("data-tab");

	if (!tabId) return;

	// Remove active class from all buttons and content
	document.querySelectorAll(".tab-button").forEach((btn) => {
		btn.classList.remove("active", "bg-yellow-500", "text-white");
		btn.classList.add("bg-gray-200");
	});

	document.querySelectorAll(".tab-content").forEach((content) => {
		content.classList.add("hidden");
	});

	// Add active class to clicked button and show content
	button.classList.add("active", "bg-yellow-500", "text-white");
	button.classList.remove("bg-gray-200");

	const contentElement = document.getElementById(tabId);
	if (contentElement) {
		contentElement.classList.remove("hidden");
	}
}
