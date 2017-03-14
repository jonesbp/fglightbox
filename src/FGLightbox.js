function FGLightbox(selector, options = {}) {
  this.lightbox = grabLightbox();

  this.selector = selector;

  this.triggers = document.querySelectorAll(selector);
  this.triggers.forEach(trigger => {
    trigger.addEventListener('click', handleLightboxClick.bind(this));
  });


  function buildLightbox() {
    const body = document.getElementsByTagName('body')[0];

    const lightbox = document.createElement('div');
    lightbox.setAttribute('class', 'fg-lightbox-backdrop');
    lightbox.addEventListener('click', handleLightboxClose);

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'fg-lightbox-wrapper');

    const content = document.createElement('div');
    content.classList.add('fg-lightbox-contents');

    wrapper.appendChild(content);
    lightbox.appendChild(wrapper);
    body.appendChild(lightbox);

    return lightbox;
  }

  function clearContents() {
    const lightbox = grabLightbox();
    const content = grabContentsForLightbox(lightbox);

    content.classList.remove('image');
    content.classList.remove('iframe');

    content.innerHTML = '';
  }

  function fillWithImage(imageUrl) {
    const image = new Image();
    image.src = imageUrl;

    image.addEventListener('load', function(e) {
      const lightbox = grabLightbox();
      const content = grabContentsForLightbox(lightbox);

      content.classList.add('image');

      const imageEl = document.createElement('img');
      imageEl.src = e.target.src;

      content.appendChild(imageEl);
    });
  }

  function fillWithIFrame(url) {
    const lightbox = grabLightbox();
    const content = grabContentsForLightbox(lightbox);

    content.classList.add('iframe');

    const iframe = document.createElement('iframe');
    iframe.src = url;

    content.appendChild(iframe);
  }

  function getTypeForClickTarget(target) {
    const classList = target.classList;

    if (classList.contains('fg-lightbox-image')) {
      return 'image';
    } else if (classList.contains('fg-lightbox-iframe')) {
      return 'iframe';
    }

    return '';
  }

  function grabContentsForLightbox(lightbox) {
    return lightbox.querySelector('.fg-lightbox-contents');
  }

  function grabLightbox() {
    if (document.querySelectorAll('.fg-lightbox-backdrop').length > 0) {
      return document.querySelector('.fg-lightbox-backdrop');
    } else {
      return buildLightbox();
    }
  }

  function handleLightboxClick(e) {
    const target = e.target;

    e.preventDefault();

    this.lightbox.style.display = 'block';

    clearContents();

    switch (getTypeForClickTarget(e.target)) {
      case 'image':
        fillWithImage(target.href);
        break;
      case 'iframe':
        fillWithIFrame(target.href);
        break;
    }
  }

  function handleLightboxClose(e) {
    const lightbox = grabLightbox();

    e.preventDefault();

    lightbox.style.display = 'none';
  }

}
