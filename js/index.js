const animationDuration = 1500;

function animateSubscribers(targetValue = 10000, duration = animationDuration) {
  const el = document.querySelector('.me-elena__title-subscribers');
  if (!el) return;

  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * targetValue);

    el.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

animateSubscribers();

function animateTimeCounter(startValue = 1, targetValue = 31, duration = animationDuration) {
  const el = document.querySelector('.me-elena__title-time-counter');
  if (!el) return;

  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(startValue + progress * (targetValue - startValue));

    el.textContent = value.toString().padStart(2, '0');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

animateTimeCounter();

function startCountdownToEndOfDay() {
  const el = document.querySelector('.me-elena__price-counter');
  if (!el) return;

  function update() {
    const now = new Date();
    // конец дня = 23:59:59
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const diff = Math.max(0, Math.floor((endOfDay - now) / 1000)); // разница в секундах

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    const formatted =
      h.toString().padStart(2, '0') +
      ' : ' +
      m.toString().padStart(2, '0') +
      ' : ' +
      s.toString().padStart(2, '0');

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
