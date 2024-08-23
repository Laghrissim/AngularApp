import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  constructor() {}

  ngOnInit() {
    window.scrollTo(0, 0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.addAnimation();
    }
  }
  addAnimation() {
    const scrollers = document.querySelectorAll(
      '.scroller'
    ) as NodeListOf<Element>;
    scrollers.forEach((scroller) => {
      scroller.setAttribute('data-animated', 'true');
      const scrollerInner = scroller.querySelector(
        '.scroller__inner'
      ) as HTMLElement;
      if (scrollerInner) {
        const scrollerContent = Array.from(
          scrollerInner.children
        ) as HTMLElement[];

        scrollerContent.forEach((element) => {
          const duplicated = element.cloneNode(true) as HTMLElement;
          duplicated.setAttribute('aria-hidden', 'true');
          scrollerInner.appendChild(duplicated);
        });
      }
    });
  }
}
