const btn = document.querySelector('.success-btn');
const modal = document.querySelector('.modal');
const close = document.querySelector('.img-1');

btn.addEventListener('click', () => {
  console.log('hello');
  modal.classList.add('display', 'modal-show');
  modal.classList.remove('modal-hide');
});

close.addEventListener('click', () => {
  console.log('bye');
  modal.classList.add('modal-hide');
  modal.classList.remove('modal-show');
  // Use a timeout to wait for the animation to finish before setting display to none
  setTimeout(() => {
    modal.classList.remove('display');
  }, 500); // This should match the duration of the animation (0.5s)
});