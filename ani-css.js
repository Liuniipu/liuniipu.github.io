// document.addEventListener("DOMContentLoaded", function () {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             const target = entry.target;

//             // 當元素進入視窗時
//             if (entry.isIntersecting) {
//                 target.classList.add('animate__animated', 'animate__fadeIn'); // 加入動畫效果
//             } else {
//                 target.classList.remove('animate__animated', 'animate__fadeIn'); // 移除動畫效果
//             }
//         });
//     });

//     // 監聽要動畫的元素
//     const animateBox = document.querySelector('.animate-box');
//     observer.observe(animateBox);
// });

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;

            // 當元素進入視窗時
            if (entry.isIntersecting) {
                const animationClass = target.getAttribute('data-animate'); 
                // 取得每個元素的動畫類型
                target.classList.add('animate__animated', animationClass); 
                // 加入指定的動畫效果
              
            } else {
                const animationClass = target.getAttribute('data-animate');
                target.classList.remove('animate__animated', animationClass); // 移除動畫效果
           
            }
        });
    });

    // 監聽所有需要動畫的元素
    const animateBoxes = document.querySelectorAll('.animate-box');
    animateBoxes.forEach((box) => {
        observer.observe(box);
    });
});