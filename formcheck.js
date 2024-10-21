function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthDisplay = document.getElementById('passwordStrength');
    const strengthLevels = {
        weak: '弱',
        medium: '中',
        strong: '強'
    };

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        strengthDisplay.textContent = '密碼強度: 不符合要求';
        strengthDisplay.style.color = 'red';
    } else if (password.length <= 8) {
        strengthDisplay.textContent = `密碼強度: ${strengthLevels.weak}`;
        strengthDisplay.style.color = 'orange';
    } else if (password.length <= 12) {
        strengthDisplay.textContent = `密碼強度: ${strengthLevels.medium}`;
        strengthDisplay.style.color = 'yellow';
    } else {
        strengthDisplay.textContent = `密碼強度: ${strengthLevels.strong}`;
        strengthDisplay.style.color = 'green';
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchDisplay = document.getElementById('passwordMatch');

    if (password && confirmPassword && password !== confirmPassword) {
        matchDisplay.textContent = '密碼不匹配';
    } else {
        matchDisplay.textContent = '';
    }
}

function applyFilter() {
    const accountFilter = document.getElementById('accountFilter').value;
    const accountInput = document.getElementById('account');
    accountInput.value = '';

    if (accountFilter === 'email') {
        accountInput.setAttribute('type', 'email');
        accountInput.setAttribute('placeholder', '請輸入信箱');
    } else if (accountFilter === 'phone') {
        accountInput.setAttribute('type', 'tel');
        accountInput.setAttribute('placeholder', '請輸入手機號碼');
        accountInput.setAttribute('pattern', '[0-9]{10}');
    }
}

document.getElementById('confirmPassword').addEventListener('input', function() {
    setTimeout(checkPasswordMatch, 1800);
});