


function showFunction(content) {
    const modal = document.getElementById('modal');
    const functionContent = document.getElementById('function-content');
    
    // functionContent.textContent = content; 
// 三種功能
    if (content === 'formCheckArea') {
        functionContent.innerHTML = `<form id="registrationForm">
    <div class="form-group">
                                <h2>註冊表單示例</h2>
                                <label for="account">帳號:</label>
                                <select id="accountFilter">
                                    <option value="email">信箱</option>
                                    <option value="phone">手機號碼</option>
                                </select><br>
                                <input type="email" id="account" required>
                            </div>
                        
                            <div class="form-group ">
                                <label for="password">密碼:</label>
                                <input type="password" id="password" required >
                                <button type="button" id="togglePassword">顯示密碼</button>
                                <div class="tip-text" id="passwordStrength">請填入</div>
                            </div>
                        
                            <div class="form-group passform">
                                <label for="confirmPassword">確認密碼:</label>
                                <input type="password" id="confirmPassword" required >
                                <div class="tip-text" id="passwordMatch">請填入</div>
                            </div>
                        
                            <div class="form-actions">
                                <button class="form-button btn btn-primary" type="submit">確認</button>
                                <button class="form-button btn btn-primary" type="reset">重置</button>
                                <button  class="form-button btn btn-primary" type="button" id="fillExampleButton">填入示範內容</button>
                            </div>
                            </form>
                            <div class="note">
                                說明：<br>
                                帳號：可以選擇手機或信箱的篩選。<br>
                                密碼：須包含大小寫英文字以及特殊符號且6字元以上。<br>
                                確認：輸入時先進行提示，最後點擊確認是否符合。<br>
                            </div>
   
`;
// 初始化事件監聽器的函數
function initializeEventListeners() {
  document.getElementById('accountFilter').addEventListener('change', applyFilter);
  document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
  document.getElementById('fillExampleButton').addEventListener('click', fillExample);
  document.getElementById('password').addEventListener('input', checkPasswordStrength);
  document.getElementById('confirmPassword').addEventListener('input', function() {
      setTimeout(checkPasswordMatch, 1800);
  });
  
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止默認提交

    const accountInput = document.getElementById('account');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const accountFilter = document.getElementById('accountFilter').value;
    let isValid = true;
    let message = '';

    // 檢查帳號格式
    if (accountFilter === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(accountInput.value)) {
            message += '帳號格式不正確（需為有效的信箱）。<br>';
            isValid = false;
        }
    } else if (accountFilter === 'phone') {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(accountInput.value)) {
            message += '帳號格式不正確（需為有效的手機號碼）。<br>';
            isValid = false;
        }
    }

    // 檢查密碼強度
    const passwordStrengthText = document.getElementById('passwordStrength').textContent;
    if (passwordStrengthText.includes('不符合要求')) {
        message += '密碼強度不符合要求（至少要為"弱"）。<br>';
        isValid = false;
    }

    // 檢查確認密碼是否匹配
    if (passwordInput.value !== confirmPasswordInput.value) {
        message += '確認密碼與密碼不匹配。<br>';
        isValid = false;
    }

    // 根據檢查結果顯示 SweetAlert2
    if (!isValid) {
        Swal.fire({
            icon: 'error',
            title: '表單檢查錯誤',
            html: message,
            confirmButtonText: '知道了'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '很棒！符合格式',
            confirmButtonText: '知道了'
        });
    }
});
}



// 生成表單內容後立即初始化事件監聽器
initializeEventListeners();


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
      matchDisplay.textContent = '密碼不相符';
      matchDisplay.style.color = 'red';
  } else {
      matchDisplay.textContent = '密碼相符';
      matchDisplay.style.color = 'green';

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

function fillExample() {
  const accountFilter = document.getElementById('accountFilter').value;
  const accountInput = document.getElementById('account');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  if (accountFilter === 'email') {
      accountInput.value = 'a1234@56mail.com';
  } else if (accountFilter === 'phone') {
      accountInput.value = '0987654321';
  }

  passwordInput.value = '$Aa1234567890';
  confirmPasswordInput.value = '$Aa1234567890';

  checkPasswordStrength();
  checkPasswordMatch();
}

document.getElementById('confirmPassword').addEventListener('input', function() {
  setTimeout(checkPasswordMatch, 1800);
});

      } else if (content === 'calculatorArea') {
        functionContent.innerHTML = `

                        
                        

                            
                            <h2>袖珍計算機</h2>
                        <div class="calculator">

                            <button class="cal-button" onclick="clearDisplay()">AC</button>
                            
                            <input type="text" class="display" id="display" disabled />
                            <br />
                            <button class="cal-button" onclick="input('7')">7</button>
                            <button class="cal-button" onclick="input('8')">8</button>
                            <button class="cal-button" onclick="input('9')">9</button>
                            <button class="cal-button" onclick="operator('/')">÷</button>
                            <br />
                            <button class="cal-button" onclick="input('4')">4</button>
                            <button class="cal-button" onclick="input('5')">5</button>
                            <button class="cal-button" onclick="input('6')">6</button>
                            <button class="cal-button" onclick="operator('*')">×</button>
                            <br />
                            <button class="cal-button" onclick="input('1')">1</button>
                            <button class="cal-button" onclick="input('2')">2</button>
                            <button class="cal-button" onclick="input('3')">3</button>
                            <button class="cal-button" onclick="operator('-')">−</button>
                            <br />
                            <button class="cal-button" onclick="input('0')">0</button>
                            <button class="cal-button" onclick="input('.')">.</button>
                            <button class="cal-button" onclick="calculate()">=</button>
                            <button class="cal-button" onclick="operator('+')">+</button>
                            <br />
                        </div>
                        <div class="note">
                        說明：<br>
                            簡便的計算機，可進行日常運算。
                        </div>
                    
                `;
      } else if (content === 'dateArea') {
        functionContent.innerHTML = `<div class="container mt-5">
                        <div class="row">
                          <h2>隨時數日子</h2>
                          <div class="col-md-10 dateform">
                          選擇起始日期：
                            <input type="text" class="form-control" id="startDate" placeholder="第一天">
                          </div>
                          <div class="col-md-10 dateform">
                          選擇結束日期：
                            <input type="text" class="form-control" id="endDate" placeholder="最後一天">
                          </div>
                          <div class="col-md-10 dateform">
                            <button class="btn btn-primary" onclick="calculateDateDifference()">過了幾天</button>
                          </div>
                          <div class="col-md-10" id="result"></div>
                        </div>
                        </div>
                         <div class="note">
                         說明：<br>
                                選擇日期起點以及決定日期終點，可計算出經過的天數，包含：年、月、日。<br>
                                可用於生活中多數需要計算日子的場合。
                              </div>
                      <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
                      <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script>
                      `;
                      flatpickr("#startDate", { dateFormat: "Y-m-d" });
                      flatpickr("#endDate", { dateFormat: "Y-m-d" });
      }

    modal.style.display = 'flex'; // 顯示模態框
  }
  
  function closeFunction() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // 隱藏模態框
  }
  

  