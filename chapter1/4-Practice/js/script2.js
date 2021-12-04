'use strict'

{
  //Intersection Observer API

  function inViewcallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }

  function onScrollcallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('scrolled');
        toTop.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled');
        toTop.classList.remove('scrolled')
      }
    })
  }

  const header = document.querySelector('header')
  const toTop = document.getElementById('to_top')

  const inViewobserver = new IntersectionObserver(inViewcallback, {
    threshold: 0.2,
  });

  document.querySelectorAll('.animate').forEach(el => {
    inViewobserver.observe(el);
  });

  const onScrollobserver = new IntersectionObserver(onScrollcallback);

  onScrollobserver.observe(document.getElementById('target'));

  toTop.addEventListener('click', e => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}