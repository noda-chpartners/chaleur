import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector<HTMLElement>('[data-header]');
const drawer = document.querySelector<HTMLElement>('[data-drawer]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuLinks = document.querySelectorAll('[data-menu-link]');

const lenis = new Lenis({
	autoRaf: false,
	duration: 1.15,
});

(window as Window & { __lenis?: Lenis }).__lenis = lenis;

const setMenu = (open: boolean) => {
	drawer?.classList.toggle('is-open', open);
	toggle?.setAttribute('aria-expanded', String(open));
	if (open) {
		lenis.stop();
	} else {
		lenis.start();
	}
};

toggle?.addEventListener('click', () => {
	setMenu(!drawer?.classList.contains('is-open'));
});

drawer?.addEventListener('click', (event) => {
	if (event.target === drawer) setMenu(false);
});

menuLinks.forEach((link) => {
	link.addEventListener('click', () => setMenu(false));
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (event) => {
		const id = link.getAttribute('href');
		if (!id || id === '#') return;
		const target = document.querySelector<HTMLElement>(id);
		if (!target) return;
		event.preventDefault();
		setMenu(false);
		lockHeader = true;
		header?.classList.remove('is-hidden');
		lenis.scrollTo(target, {
			offset: -72,
			onComplete: () => {
				lockHeader = false;
				lastY = lenis.scroll;
			},
		});
	});
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

let lastY = 0;
let lockHeader = false;

lenis.on('scroll', ({ scroll }: { scroll: number }) => {
	if (!header) return;
	header.classList.toggle('is-scrolled', scroll > 24);
	header.classList.toggle('is-hidden', !lockHeader && scroll > lastY && scroll > 140);
	lastY = scroll;
});

const reveal = document.querySelectorAll<HTMLElement>('[data-reveal]');

reveal.forEach((el) => {
	gsap.from(el, {
		y: 42,
		opacity: 0,
		duration: 1.15,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: el,
			start: 'top 86%',
		},
	});
});

const parallax = document.querySelectorAll<HTMLElement>('[data-parallax]');

parallax.forEach((el) => {
	const media = el.querySelector('img');
	if (!media) return;

	gsap.fromTo(
		media,
		{ yPercent: -4, scale: 1.04 },
		{
			yPercent: 4,
			scale: 1.04,
			ease: 'none',
			scrollTrigger: {
				trigger: el,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		},
	);
});
