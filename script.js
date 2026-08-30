document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('iconMenu');
  const iconClose = document.getElementById('iconClose');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.hidden = isExpanded;
      iconMenu.style.display = isExpanded ? 'block' : 'none';
      iconClose.style.display = isExpanded ? 'none' : 'block';
    });
  }

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const tiles = Array.from(document.querySelectorAll('[data-open]'));
  let currentIndex = 0;

  function updateLightbox(index) {
    const tile = tiles[index];
    const img = tile.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightboxCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(tiles.length).padStart(2, '0')}`;
    currentIndex = index;
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      updateLightbox(index);
      if (lightbox.showModal) {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', 'true');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox.close) {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + tiles.length) % tiles.length;
      updateLightbox(newIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % tiles.length;
      updateLightbox(newIndex);
    });
  }

  // Keyboard Navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
    if (e.key === 'Escape') lightboxClose.click();
  });
});
    
