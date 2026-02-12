document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const roleSelect = document.getElementById('role');
    const termsCheckbox = document.getElementById('terms');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const roleError = document.getElementById('roleError');
    const termsError = document.getElementById('termsError');
    
    const strengthBars = [
        document.getElementById('strengthBar1'),
        document.getElementById('strengthBar2'),
        document.getElementById('strengthBar3'),
        document.getElementById('strengthBar4')
    ];
    const strengthText = document.getElementById('strengthText');

    // Real-time validation for all fields
    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, roleSelect, termsCheckbox];
    inputs.forEach(element => {
        element.addEventListener('input', validateField);
        element.addEventListener('change', validateField);
        element.addEventListener('blur', validateField);
    });

    // Special handling for password strength
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updatePasswordStrength(this.value);
    });

    // Special handling for confirm password
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isRoleValid = validateRole();
        const isTermsValid = validateTerms();
        
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isRoleValid && isTermsValid) {
            // Form is valid
            console.log('Registration form is valid, submitting...');
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Registration successful! Please check your email to verify your account.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // In a real app, you would redirect to login or dashboard
                // window.location.href = '/Auth/Login';
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Individual validation functions
    function validateField(event) {
        const field = event.target;
        switch(field.id) {
            case 'name': return validateName();
            case 'email': return validateEmail();
            case 'password': return validatePassword();
            case 'confirmPassword': return validateConfirmPassword();
            case 'role': return validateRole();
            case 'terms': return validateTerms();
        }
    }

    function validateName() {
        const name = nameInput.value.trim();
        const namePattern = /^[A-Za-z\s]{2,50}$/;

        if (!name) {
            showError(nameInput, nameError, 'Name is required');
            return false;
        }

        if (!namePattern.test(name)) {
            showError(nameInput, nameError, 'Name must be 2-50 letters only');
            return false;
        }

        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            return false;
        }

        if (!emailPattern.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }

        clearError(emailInput, emailError);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            return false;
        }

        if (password.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters');
            return false;
        }

        if (!passwordPattern.test(password)) {
            showError(passwordInput, passwordError, 'Must include uppercase, lowercase, number, and special character');
            return false;
        }

        clearError(passwordInput, passwordError);
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
            return false;
        }

        if (password !== confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            return false;
        }

        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    }

    function validateRole() {
        const role = roleSelect.value;

        if (!role) {
            showError(roleSelect, roleError, 'Please select a role');
            return false;
        }

        clearError(roleSelect, roleError);
        return true;
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, termsError, 'You must agree to the terms and conditions');
            return false;
        }

        clearError(termsCheckbox, termsError);
        return true;
    }

    // Password strength meter
    function updatePasswordStrength(password) {
        let strength = 0;
        let text = '';
        let color = '';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[@$!%*?&]/.test(password)) strength++;

        // Cap strength at 4
        strength = Math.min(strength, 4);

        // Update bars
        strengthBars.forEach((bar, index) => {
            if (index < strength) {
                if (strength === 1) {
                    bar.style.backgroundColor = '#ef4444';
                } else if (strength === 2) {
                    bar.style.backgroundColor = '#f59e0b';
                } else if (strength === 3) {
                    bar.style.backgroundColor = '#3b82f6';
                } else if (strength === 4) {
                    bar.style.backgroundColor = '#10b981';
                }
            } else {
                bar.style.backgroundColor = '';
            }
        });

        // Update text
        switch(strength) {
            case 0:
                text = 'Very Weak';
                color = 'text-red-600 text-red-400';
                break;
            case 1:
                text = 'Weak';
                color = 'text-red-600 text-red-400';
                break;
            case 2:
                text = 'Fair';
                color = 'text-amber-600 text-amber-400';
                break;
            case 3:
                text = 'Good';
                color = 'text-blue-600 text-blue-400';
                break;
            case 4:
                text = 'Strong';
                color = 'text-emerald-600 text-emerald-400';
                break;
        }

        strengthText.textContent = 'Password strength: ' + text;
        strengthText.className = 'text-xs mt-1 ' + color;
    }

    // Helper functions
    function showError(inputElement, errorElement, message) {
        if (inputElement.type === 'checkbox') {
            inputElement.parentElement.classList.add('border', 'border-red-500', 'p-2', 'rounded');
        } else {
            inputElement.classList.add('border-red-500', 'border-red-500');
            inputElement.classList.remove('border-gray-300', 'border-gray-600');
        }
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function clearError(inputElement, errorElement) {
        if (inputElement.type === 'checkbox') {
            inputElement.parentElement.classList.remove('border', 'border-red-500', 'p-2', 'rounded');
        } else {
            inputElement.classList.remove('border-red-500', 'border-red-500');
            inputElement.classList.add('border-gray-300', 'border-gray-600');
        }
        errorElement.classList.add('hidden');
    }
});
