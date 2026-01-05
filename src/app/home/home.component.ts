import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlideIndex = 0;
  sliderInterval: any;
  totalSlides = 3;

  ngOnInit(): void {
    this.startAutoSlide();
    this.setupSliderEventListeners();
  }

  ngOnDestroy(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  /**
   * Start auto-rotating slides every 5 seconds
   */
  startAutoSlide(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  /**
   * Move to the next slide
   */
  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
    this.updateSlider();
  }

  /**
   * Move to the previous slide
   */
  previousSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  /**
   * Go to a specific slide
   */
  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.updateSlider();
  }

  /**
   * Update the slider display
   */
  private updateSlider(): void {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide: any, index: number) => {
      slide.classList.remove('active');
      if (index === this.currentSlideIndex) {
        slide.classList.add('active');
      }
    });

    indicators.forEach((indicator: any, index: number) => {
      indicator.classList.remove('active');
      if (index === this.currentSlideIndex) {
        indicator.classList.add('active');
      }
    });

    // Reset auto-slide timer
    clearInterval(this.sliderInterval);
    this.startAutoSlide();
  }

  /**
   * Setup event listeners for slider controls
   */
  private setupSliderEventListeners(): void {
    setTimeout(() => {
      const nextBtn = document.querySelector('.hero-arrow.next') as HTMLElement;
      const prevBtn = document.querySelector('.hero-arrow.prev') as HTMLElement;
      const indicators = document.querySelectorAll('.indicator') as NodeListOf<HTMLElement>;

      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextSlide());
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => this.previousSlide());
      }

      indicators.forEach((indicator: any, index: number) => {
        indicator.addEventListener('click', () => this.goToSlide(index));
      });
    }, 100);
  }
}
