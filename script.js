class Slider {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Set up navigation buttons
        document.querySelector('.prev').addEventListener('click', () => this.prev());
        document.querySelector('.next').addEventListener('click', () => this.next());

        // Set up touch events
        const sliderWrapper = document.getElementById('sliderWrapper');
        sliderWrapper.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        sliderWrapper.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        sliderWrapper.addEventListener('touchend', () => this.handleTouchEnd());

        // Create dots
        this.createDots();

        // Set initial state
        this.updateSlides();
    }

    createDots() {
        const dotsContainer = document.querySelector('.slider-dots');
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                slide.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                slide.classList.add('next');
            }
        });

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.totalSlides;
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateSlides();
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd() {
        const touchDiff = this.touchStartX - this.touchEndX;
        const minSwipeDistance = 50;

        if (Math.abs(touchDiff) > minSwipeDistance) {
            if (touchDiff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});