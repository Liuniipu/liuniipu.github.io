// document.querySelectorAll('.part-card').forEach(card => {
//     const description = card.querySelector('.card-description');
  
//     // 計算進入方向
//     function getMouseDirection(e) {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       const absX = Math.abs(x);
//       const absY = Math.abs(y);
//       if (absX > absY) {
//         return x > 0 ? 'right' : 'left';
//       } else {
//         return y > 0 ? 'bottom' : 'top';
//       }
//     }
  
//     card.addEventListener('mouseenter', (e) => {
//       card.classList.remove('hover-top', 'hover-bottom', 'hover-left', 'hover-right');
//       const direction = getMouseDirection(e);
//       card.classList.add(`hover-${direction}`);
//     });
  
//     card.addEventListener('mouseleave', (e) => {
//       card.classList.remove('hover-top', 'hover-bottom', 'hover-left', 'hover-right');
//       const direction = getMouseDirection(e);
//       card.classList.add(`hover-${direction}`);
//     });
//   });
  

const cards = document.querySelectorAll('.part-card');

cards.forEach(card => {
  const glowBall = card.querySelector('.glow-ball');

  let isMouseIn = false;

  let mouseX = 0;
  let mouseY = 0;


  // 隨機移動光暈球的功能
  function randomMove() {
    if (!isMouseIn) {
      const randomX = Math.random() * 1000 - 350;
      const randomY = Math.random() * 1000  ;
      glowBall.style.transform = `translate(${randomX}%, ${randomY}%)`;
      // console.log(randomX,randomY);
    }
  }

  // // 跟隨鼠標移動
  // function followMouse(e) {
  //   const rect = card.getBoundingClientRect();
  //   const mouseX = e.clientX - rect.left;
  //   const mouseY = e.clientY - rect.top;

  //   glowBall.style.transform = `translate(${mouseX }px, ${mouseY }px)`;
  //   // console.log(mouseX,mouseY);
  // }

  // card.addEventListener('mouseenter', (e) => {
  //   isMouseIn = true;
  //   followMouse(e);
  //   card.addEventListener('mousemove', followMouse);
  // });

// 

// 跟隨鼠標移動
function updateBallPosition() {
  if (isMouseIn) {
    glowBall.style.transform = `translate(${mouseX-20}px, ${mouseY-20}px)`;
  }
  requestAnimationFrame(updateBallPosition); // 持續更新位置
}

// 記錄滑鼠位置
function recordMousePosition(e) {
  const rect = card.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
}

card.addEventListener('mouseenter', (e) => {
  isMouseIn = true;
  recordMousePosition(e);
  requestAnimationFrame(updateBallPosition);
  card.addEventListener('mousemove', recordMousePosition);
});

// 
  card.addEventListener('mouseleave', () => {
    isMouseIn = false;
    card.removeEventListener('mousemove', recordMousePosition);
    randomMove(); // 鼠標離開後恢復隨機移動
  });

  // 初始化隨機位置
  setInterval(randomMove, 2000);
});