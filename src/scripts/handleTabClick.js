// src/scripts/handleTabClick.js
export function handleTabClick(e) {
	e.preventDefault();

	const targetTabId = e.currentTarget.getAttribute("data-tab");

	// Hide all tab contents
	document.querySelectorAll(".tab-content").forEach((tabContent) => {
		tabContent.classList.add("hidden");
	});

	// Show the selected tab content
	const targetTabContent = document.getElementById(targetTabId);
	if (targetTabContent) {
		targetTabContent.classList.remove("hidden");
	}

	// Remove active class from all tab buttons
	document.querySelectorAll(".tab-button").forEach((tabButton) => {
		tabButton.classList.remove("bg-gray-300");
		tabButton.classList.add("bg-gray-200");
	});

	// Add active class to the clicked tab button
	e.currentTarget.classList.remove("bg-gray-200");
	e.currentTarget.classList.add("bg-gray-300");
}

// Add event listeners to all tab buttons
document.querySelectorAll(".tab-button").forEach((tabButton) => {
	tabButton.addEventListener("click", handleTabClick);
});

// Activate the first tab by default
document.querySelector(".tab-button").click();
