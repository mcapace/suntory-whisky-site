// this listener crops the top of the mobile header image, as it was too tall
document.addEventListener("DOMContentLoaded", () => {
	const container = document.querySelector(".header-img-container");
	const img = container.querySelector("img");
	const cropTopPercent = 0.15; // 15% crop top

	//function that affects container and header img
	function adjustContainerAndCrop() {
		// ignore if desktop
		if (window.innerWidth > 767) {
			container.style.height = '';
			img.style.position = '';
			img.style.top = '';
			return;
		}
		//get dimensions and aspect ratio, then calculate respective width and height 
		const naturalWidth = img.naturalWidth;
		const naturalHeight = img.naturalHeight;
		if (!naturalWidth || !naturalHeight) return;

		const aspectRatio = naturalHeight / naturalWidth;
		const containerWidth = container.clientWidth;
		const containerHeight = (1 - cropTopPercent) * containerWidth * aspectRatio;

		//assign correct height and positioning
		container.style.height = `${containerHeight}px`;
		img.style.position = "relative";
		img.style.top = `-${cropTopPercent * 100}%`;
	}
	if (img.complete) {
		adjustContainerAndCrop();
	} else {
		img.addEventListener("load", adjustContainerAndCrop);
	}
	//for screen size changes
	window.addEventListener("resize", adjustContainerAndCrop);

	// --- Parallax: translate banner images inside fixed-height containers on desktop ---
	(function () {
		const BREAKPOINT = 768; // desktop when parallax active
		const MOTION_INTENSITY = 1; // 0-1, lower = subtler movement (reduce to show more of image)
		const containers = Array.from(document.querySelectorAll('.parallax-container'));
		if (!containers.length) return;
	
		let ticking = false;
	
		function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
	
		function updateOne(container) {
			if (window.innerWidth < BREAKPOINT) return; // disabled on mobile
	
			const img = container.querySelector('.banner-img');
			if (!img) return;
	
			const crect = container.getBoundingClientRect();
			const viewportCenter = window.innerHeight / 2;
			const elementCenter = crect.top + crect.height / 2;
	
			// normalized distance [-1,1] (container center relative to viewport center)
			const denom = (window.innerHeight / 2) + (crect.height / 2);
			let relative = (viewportCenter - elementCenter) / denom;
			relative = clamp(relative, -1, 1);
	
			const imgRect = img.getBoundingClientRect();
			const imgHeight = imgRect.height;
			const containerHeight = crect.height;
			const maxTranslate = Math.max(0, (imgHeight - containerHeight) / 2);
	
			// reduce amplitude with MOTION_INTENSITY so the effect is more slight
			const translate = relative * maxTranslate * MOTION_INTENSITY; // px
	
			// preserve horizontal centering (translateX(-50%)) and shift vertically
			img.style.transform = `translate(-50%, calc(-50% + ${translate}px))`;
		}
	
		function updateAll() {
			containers.forEach(updateOne);
			ticking = false;
		}
	
		function onScrollOrResize() {
			if (!ticking) {
				window.requestAnimationFrame(updateAll);
				ticking = true;
			}
		}
	
		// run after images load (some images may already be loaded)
		window.addEventListener('load', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize, { passive: true });
		window.addEventListener('scroll', onScrollOrResize, { passive: true });
	
		// initial run
		onScrollOrResize();
	})();
	
});
