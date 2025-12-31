import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentBannerIndex = 0;
  bannerInterval: any;

  ngOnInit(): void {
    this.startBannerCarousel();
  }

  ngOnDestroy(): void {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  /**
   * Starts auto-rotating the banner carousel every 5 seconds
   */
  startBannerCarousel(): void {
    this.bannerInterval = setInterval(() => {
      this.nextBanner();
    }, 5000);
  }

  /**
   * Moves to the next banner
   */
  nextBanner(): void {
    const banners = document.querySelectorAll('.banner');
    const indicators = document.querySelectorAll('.indicator');
    
    if (banners.length > 0) {
      banners[this.currentBannerIndex].classList.remove('active');
      indicators[this.currentBannerIndex].classList.remove('active');
      
      this.currentBannerIndex = (this.currentBannerIndex + 1) % banners.length;
      
      banners[this.currentBannerIndex].classList.add('active');
      indicators[this.currentBannerIndex].classList.add('active');
    }
  }

  /**
   * Moves to a specific banner by index
   */
  goToBanner(index: number): void {
    const banners = document.querySelectorAll('.banner');
    const indicators = document.querySelectorAll('.indicator');
    
    if (banners.length > 0) {
      banners[this.currentBannerIndex].classList.remove('active');
      indicators[this.currentBannerIndex].classList.remove('active');
      
      this.currentBannerIndex = index;
      
      banners[this.currentBannerIndex].classList.add('active');
      indicators[this.currentBannerIndex].classList.add('active');
      
      // Reset the interval
      if (this.bannerInterval) {
        clearInterval(this.bannerInterval);
      }
      this.startBannerCarousel();
    }
  }
}

// Make this function globally accessible for onclick handlers
(window as any).currentBanner = (index: number) => {
  const component = document.querySelector('app-home') as any;
  if (component && component.__ngContext__) {
    const ctx = component.__ngContext__[8];
    if (ctx && ctx.component) {
      ctx.component.goToBanner(index);
    }
  }
};
