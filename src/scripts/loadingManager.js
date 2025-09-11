// Enhanced Loading Manager for Images and Text Content
// This script ensures the loading spinner only disappears when all content is fully loaded

class LoadingManager {
	constructor() {
		this.loadedImages = new Set();
		this.totalImages = 0;
		this.textContentLoaded = false;
		this.minimumLoadTime = 500;
		this.startTime = Date.now();

		this.init();
	}

	init() {
		// Wait for DOM to be ready
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => this.setupLoading());
		} else {
			this.setupLoading();
		}
	}

	setupLoading() {
		// Count all images on the page
		this.countImages();

		// Set up image load listeners
		this.setupImageListeners();

		// Set up text content loading detection
		this.setupTextContentDetection();

		// Set up fallback timeout (max 10 seconds)
		this.setupFallbackTimeout();

		// Check if everything is already loaded
		this.checkLoadingComplete();
	}

	countImages() {
		const images = document.querySelectorAll("img");
		this.totalImages = images.length;

		// If no images, mark images as loaded
		if (this.totalImages === 0) {
			this.loadedImages.add("no-images");
		}
	}

	setupImageListeners() {
		const images = document.querySelectorAll("img");

		images.forEach((img, index) => {
			// Add loading optimization classes
			img.classList.add("loading-optimized");

			// Handle already loaded images
			if (img.complete && img.naturalHeight !== 0) {
				this.loadedImages.add(`img-${index}`);
				return;
			}

			// Handle loading images
			img.addEventListener("load", () => {
				this.loadedImages.add(`img-${index}`);
				this.checkLoadingComplete();
			});

			// Handle image load errors
			img.addEventListener("error", () => {
				this.loadedImages.add(`img-${index}`);
				this.checkLoadingComplete();
			});

			// Handle lazy loading images
			if (img.loading === "lazy") {
				img.addEventListener("load", () => {
					this.loadedImages.add(`img-${index}`);
					this.checkLoadingComplete();
				});
			}
		});

		// Also check for background images in CSS
		this.checkBackgroundImages();
	}

	checkBackgroundImages() {
		const elements = document.querySelectorAll("*");
		let backgroundImageCount = 0;

		elements.forEach((element, index) => {
			const computedStyle = window.getComputedStyle(element);
			const backgroundImage = computedStyle.backgroundImage;

			if (backgroundImage && backgroundImage !== "none") {
				backgroundImageCount++;
				// For background images, we'll assume they load with the page
				// In a more sophisticated implementation, you could preload these
				this.loadedImages.add(`bg-img-${index}`);
			}
		});
	}

	setupTextContentDetection() {
		// Use requestAnimationFrame to ensure text content is rendered
		requestAnimationFrame(() => {
			// Small delay to ensure text content is fully rendered
			setTimeout(() => {
				this.textContentLoaded = true;
				this.checkLoadingComplete();
			}, 100);
		});

		// Also check for font loading on mobile
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(() => {
				this.textContentLoaded = true;
				this.checkLoadingComplete();
			});
		}
	}

	setupFallbackTimeout() {
		// Fallback timeout to ensure loading doesn't last forever
		// Shorter timeout on mobile for better UX
		const isMobile = window.innerWidth <= 768;
		const timeoutDuration = isMobile ? 4000 : 5000;

		setTimeout(() => {
			console.log("Loading fallback timeout reached");
			this.hideLoader();
		}, timeoutDuration);
	}

	checkLoadingComplete() {
		const allImagesLoaded =
			this.loadedImages.size >= this.totalImages || this.totalImages === 0;
		const minimumTimeElapsed =
			Date.now() - this.startTime >= this.minimumLoadTime;

		if (allImagesLoaded && this.textContentLoaded && minimumTimeElapsed) {
			this.hideLoader();
		}
	}

	hideLoader() {
		const loader = document.getElementById("global-loader");
		const mainContent = document.querySelector("main");
		const body = document.body;

		if (loader) {
			// Add fade out class
			loader.classList.add("fade-out");

			// Remove loader from DOM after animation
			setTimeout(() => {
				loader.style.display = "none";
				loader.remove();
			}, 500);
		}

		if (mainContent) {
			// Show main content with fade in
			mainContent.classList.remove("content-loading");
			mainContent.classList.add("content-loaded");
		}

		// Show body content
		if (body) {
			body.classList.add("loaded");
		}

		// Add loading optimized class for better performance
		if (mainContent) {
			mainContent.classList.add("loading-optimized");
		}
	}
}

// Initialize loading manager when script loads
new LoadingManager();

// Export for potential use in other scripts
if (typeof module !== "undefined" && module.exports) {
	module.exports = LoadingManager;
}
