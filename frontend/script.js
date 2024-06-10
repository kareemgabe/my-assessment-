document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registration-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration successful. Check your email for the verification code.');
            document.getElementById('registration-form').classList.remove('active');
            document.getElementById('verification-form').classList.add('active');
        } else {
            alert('Registration failed. Please try again.');
        }
    });

    document.getElementById('verification-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('verification-email').value;
        const verificationCode = document.getElementById('verification-code').value;

        const response = await fetch('http://localhost:3000/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, verificationCode })
        });

        if (response.ok) {
            alert('Email verified. Complete your registration.');
            document.getElementById('verification-form').classList.remove('active');
            document.getElementById('complete-registration-form').classList.add('active');
        } else {
            alert('Verification failed. Please try again.');
        }
    });

    document.getElementById('complete-registration-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('complete-username').value;
        const email = document.getElementById('complete-email').value;
        const password = document.getElementById('complete-password').value;

        const response = await fetch('http://localhost:3000/api/auth/complete-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration complete. You can now log in.');
        } else {
            alert('Registration completion failed.');
        }
    });

    document.getElementById('registration-form').classList.add('active');
});


