const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const profileImage = document.getElementById('profileImage');
const profileFallback = document.getElementById('profileFallback');
const profileUpload = document.getElementById('profileUpload');

if (profileImage && profileImage.src) {
  profileImage.classList.add('visible');
  if (profileFallback) profileFallback.classList.add('hidden');
}

if (profileUpload) {
  profileUpload.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (typeof loadEvent.target?.result === 'string') {
        profileImage.src = loadEvent.target.result;
        profileImage.classList.add('visible');
        profileFallback.classList.add('hidden');
      }
    };
    reader.readAsDataURL(file);
  });
}

const projectImageModal = document.getElementById('projectImageModal');
const projectImagePreview = document.getElementById('projectImagePreview');
const projectImageCaption = document.getElementById('projectImageCaption');
const certificateModal = document.getElementById('certificateModal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

function openProjectImage(image, title) {
  if (!projectImageModal || !projectImagePreview || !projectImageCaption) return;

  projectImagePreview.src = image;
  projectImagePreview.alt = title;
  projectImageCaption.textContent = title;
  projectImageModal.classList.add('open');
  projectImageModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (projectImageModal) {
    projectImageModal.classList.remove('open');
    projectImageModal.setAttribute('aria-hidden', 'true');
  }

  if (certificateModal) {
    certificateModal.classList.remove('open');
    certificateModal.setAttribute('aria-hidden', 'true');
  }

  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-image-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    openProjectImage(button.dataset.image, button.dataset.title);
  });
});

document.querySelectorAll('.project-link-button').forEach((button) => {
  button.addEventListener('click', () => {
    const status = button.closest('.project-actions')?.querySelector('.project-status');
    if (status) status.textContent = 'Project link coming soon.';
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

projectImageModal?.addEventListener('click', (event) => {
  if (event.target === projectImageModal) closeModal();
});

const certificateModalBody = document.getElementById('certificateModalBody');
const certificateUpload = document.getElementById('certificateUpload');

if (certificateUpload) {
  certificateUpload.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (typeof loadEvent.target?.result === 'string') {
        const certificateImage = document.querySelector('.certificate-image');
        if (certificateImage) {
          certificateImage.style.background = `url(${loadEvent.target.result}) center/cover no-repeat`;
          certificateImage.style.border = '1px solid rgba(96, 165, 250, 0.2)';
          certificateImage.style.position = 'relative';
          certificateImage.style.filter = 'drop-shadow(0 0 18px rgba(59, 130, 246, 0.4))';
          certificateImage.setAttribute('data-custom', 'true');
        }
      }
    };
    reader.readAsDataURL(file);
  });
}

document.querySelectorAll('.certificate-open').forEach((button) => {
  button.addEventListener('click', () => {
    if (!certificateModal || !certificateModalBody) return;

    const certificateImage = document.querySelector('.certificate-image');
    const source = certificateImage && certificateImage.dataset.custom === 'true'
      ? certificateImage.style.backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
      : '';

    certificateModalBody.innerHTML = `
      <div class="certificate-modal-visual" style="${source ? `background: url(${source}) center/cover no-repeat, linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(15, 23, 42, 0.75));` : ''}"></div>
      <h3>Hour of AI</h3>
      <p>Hour of AI Certificate / Achievement</p>
      <p>This certificate can be replaced or expanded with additional certification uploads as they become available.</p>
    `;

    certificateModal.classList.add('open');
    certificateModal.setAttribute('aria-hidden', 'false');
  });
});

certificateModal?.addEventListener('click', (event) => {
  if (event.target === certificateModal) closeModal();
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'MESSAGE READY FOR FUTURE BACKEND';
      submitButton.disabled = true;
    }

    const alertText = document.createElement('p');
    alertText.textContent = 'This contact form is ready for future backend integration.';
    alertText.style.color = '#60a5fa';
    alertText.style.marginTop = '0.6rem';
    contactForm.appendChild(alertText);
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
