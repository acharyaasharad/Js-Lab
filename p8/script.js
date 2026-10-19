const registrationForm = document.querySelector('#registration-form');
const successMessage = document.querySelector('#success-message');

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = 'Gym Admission Successful!';
});
