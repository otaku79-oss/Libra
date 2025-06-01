// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Toggle Password Visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Show Error Message
function showError(input, message) {
    const formGroup = input.parentElement.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
}

// Clear Error Message
function clearError(input) {
    const formGroup = input.parentElement.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

// Input Event Listeners
emailInput.addEventListener('input', () => {
    clearError(emailInput);
});

passwordInput.addEventListener('input', () => {
    clearError(passwordInput);
});

// Form Submit Handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate Email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Password
    if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate login (in a real application, this would be an API call)
        const user = {
            email: emailInput.value,
            name: 'John Doe', // This would come from the server
            role: 'student'
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'dashboard.html';
    }
}); 