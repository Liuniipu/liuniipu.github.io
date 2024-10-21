const optionList = document.getElementById('option-list');
const addButton = document.getElementById('add-option');
const spinButton = document.getElementById('spin-button');
const wheel = document.getElementById('wheel');
let isSpinning = false; // 追蹤是否正在轉動

// 產生 HSL 顏色
function generateColors(numOptions) {
    const colors = [];
    const step = 360 / numOptions;
    for (let i = 0; i < numOptions; i++) {
        const hue = i * step;
        colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
}

function updateWheel() {
    const options = Array.from(optionList.querySelectorAll('input')).map(input => input.value);
    const numOptions = options.length;
    const colorSlice = 360 / numOptions;
    const colors = generateColors(numOptions);

    let gradientStops = options.map((option, index) => {
        const color = colors[index]; 

        const input = optionList.querySelectorAll('input')[index];
        // 刪除鈕顏色
        const removeButton = optionList.querySelectorAll('.remove-btn')[index];

         // 更新 input 和刪除按鈕的背景色
        //  input.style.backgroundColor = color;
         removeButton.style.backgroundColor = color;
         input.style.borderColor = color;

        return `${color} ${index * colorSlice}deg ${((index + 1) * colorSlice)}deg`;
    }).join(', ');

    // 動態更新輪盤的背景色
    wheel.style.backgroundImage = `conic-gradient(${gradientStops})`;

    // 檢查選項數量，當剩下一個選項時，禁用刪除按鈕
    const removeButtons = optionList.querySelectorAll('.remove-btn');
    if (numOptions <= 1) {
        removeButtons.forEach(button => button.disabled = true);
    } else {
        removeButtons.forEach(button => button.disabled = false);
    }
}

// 新增選項
function addOption() {
    const newOption = document.createElement('li');
    newOption.innerHTML = `<input type="text" value="新選項" /><button class="remove-btn">                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
</button>`;
    optionList.appendChild(newOption);
    updateWheel();
    attachRemoveEvents();
}

function removeOption(event) {
    // const li = event.target.parentNode;
    const li = event.target.closest('li');
    li.remove();
    updateWheel();
}

// 綁定刪除事件到按鈕
function attachRemoveEvents() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.removeEventListener('click', removeOption); // 避免重複綁定
        button.addEventListener('click', removeOption);
    });
}








spinButton.addEventListener('click', function() {
    if (isSpinning) {
        // 停止轉動
        wheel.style.transition = 'none';
        const computedStyle = window.getComputedStyle(wheel);
        const transform = computedStyle.getPropertyValue('transform');
        const matrix = new DOMMatrixReadOnly(transform);
        const currentDegree = Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI);
        wheel.style.transform = `rotate(${currentDegree}deg)`;
        
        isSpinning = false;
        spinButton.textContent = '再次開始';
      
        wheel.style.transform = 'none'; // 重置 transition

        // showResult(currentDegree);
    } else {
        // 開始轉動
        const randomDegree = Math.floor(Math.random() * 360) + 360 * 3;
        wheel.style.transition = 'transform 5s cubic-bezier(0.1, 0.6, 0.4, 1)';
        wheel.style.transform = `rotate(${randomDegree}deg)`;

        isSpinning = true;
        spinButton.textContent = '先等一下';

        setTimeout(() => {
            if (isSpinning) {
                isSpinning = false;
                spinButton.textContent = '再次開始';
                showResult(randomDegree);

            }
        }, 5000);
    }
});

function showResult(degree) {
    const options = Array.from(optionList.querySelectorAll('input')).map(input => input.value);
    const numOptions = options.length;
    const resultIndex = Math.floor((360 - (degree % 360)) / (360 / numOptions));
    const result = options[resultIndex];
    
    Swal.fire({
        title: '結果',
        text: `結果：${result}`,
        icon: 'success',
        confirmButtonText: '確定'
    });
    wheel.style.transform = 'none'; // 重置 transition

}


// 綁定新增按鈕的點擊事件
addButton.addEventListener('click', addOption);

// 初始綁定刪除事件及更新輪盤
attachRemoveEvents();
updateWheel();
