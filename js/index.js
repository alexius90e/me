function animateCounterOnView(
  element,
  { targetValue = 10000, duration = 1500, separator = '.' } = {}
) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  function startAnimation() {
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * targetValue);
      el.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(el);
}

animateCounterOnView('.me-elena__title-time-counter', { targetValue: 30 });
animateCounterOnView('.me-elena__description-views', { targetValue: 1000000 });
animateCounterOnView('.me-elena__description-subscribers', { targetValue: 10000 });
animateCounterOnView('.me-elena__description-minutes', { targetValue: 15 });
animateCounterOnView('.me-elena__cases-title-counter', { targetValue: 1000000 });

function startCountdownToEndOfDay() {
  const el = document.querySelector('.me-elena__price-counter');
  if (!el) return;

  function update() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const diff = Math.max(0, Math.floor((endOfDay - now) / 1000));

    const hours = Math.floor(diff / 3600);
    const hoursString = hours.toString().padStart(2, '0');
    const minutes = Math.floor((diff % 3600) / 60);
    const minutesString = minutes.toString().padStart(2, '0');
    const seconds = diff % 60;
    const secondsString = seconds.toString().padStart(2, '0');

    const formatted = `${hoursString} : ${minutesString} : ${secondsString}`;

    el.textContent = formatted;

    if (diff > 0) {
      setTimeout(update, 1000);
    } else {
      el.textContent = '00 : 00 : 00';
    }
  }

  update();
}

startCountdownToEndOfDay();

const casesSlider = document.querySelector('.me-elena__cases-slider .swiper');

if (casesSlider) {
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
    },
  });
}
