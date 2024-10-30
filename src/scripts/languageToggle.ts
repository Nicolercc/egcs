document.addEventListener("DOMContentLoaded", () => {
	const langToggle = document.getElementById(
		"langToggle"
	) as HTMLButtonElement | null;
	const enElements = document.querySelectorAll(".lang-en");
	const esElements = document.querySelectorAll(".lang-es");

	if (langToggle) {
		langToggle.addEventListener("click", () => {
			enElements.forEach((el) => el.classList.toggle("hidden"));
			esElements.forEach((el) => el.classList.toggle("hidden"));
		});
	}
});
