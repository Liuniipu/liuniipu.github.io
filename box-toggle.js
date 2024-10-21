// 取得所有方塊容器
const boxes = document.querySelectorAll('.box-container');

// 讓所有方塊進行翻轉或恢復原狀
// document.getElementById('toggleFlip').addEventListener('click', () => {
//   boxes.forEach(box => {
//     // console.log('Button clicked');
//     // 這裡可以根據每個方塊的狀態設置不同的翻轉
//     if (box.classList.contains('flipped-to-right')) {
//       box.classList.toggle('flipped-to-right');
//     } else if (box.classList.contains('flipped-to-left')) {
//       box.classList.toggle('flipped-to-left');
//     } else if (box.classList.contains('flipped-to-top')) {
//       box.classList.toggle('flipped-to-top');
//     } else if (box.classList.contains('flipped-to-bottom')) {
//       box.classList.toggle('flipped-to-bottom');
//     }
//   });
// });

// 為每個方塊添加點擊事件，單獨控制翻轉
// boxes.forEach(box => {
//   box.addEventListener('click', () => {
//     console.log('cool');
//     // 根據每個方塊的特定狀態設置翻轉方向
//     if (box.classList.contains(' box-to-right')) {
//       box.classList.toggle('flipped-to-right');
//     } else if (box.classList.contains('flipped-to-left')) {
//       box.classList.toggle('flipped-to-left');
//     } else if (box.classList.contains('flipped-to-top')) {
//       box.classList.toggle('flipped-to-top');
//     } else if (box.classList.contains('flipped-to-bottom')) {
//       box.classList.toggle('flipped-to-bottom');
//     }
//   });
// });

// const boxes = document.querySelectorAll('.box-container');

// 點擊按鈕時翻轉/恢復所有方塊
// document.getElementById('toggleFlip').addEventListener('click', () => {
//   boxes.forEach(box => {
//     console.log('toggle');
//     // 判斷目前方塊是否已翻轉，根據情況來切換狀態
//     if (box.classList.contains('flipped-to-right') ||
//         box.classList.contains('flipped-to-left') ||
//         box.classList.contains('flipped-to-top') ||
//         box.classList.contains('flipped-to-bottom')) {
//       // 如果已經翻轉，移除所有翻轉類名以恢復
//       box.classList.remove('flipped-to-right', 'flipped-to-left', 'flipped-to-top', 'flipped-to-bottom');
//     } else {
//       // 如果未翻轉，設置翻轉方向（這裡可以根據需求設置默認翻轉方向）
//       box.classList.add('flipped-to-right');  // 例如默認右翻轉
//     }
//   });
// });

// // 點擊單個方塊時，單獨翻轉該方塊
// boxes.forEach(box => {
//   box.addEventListener('click', () => {
//     console.log('box!');
//     if (box.classList.contains('flipped-to-right')) {
//       box.classList.remove('flipped-to-right');
//     } else if (box.classList.contains('flipped-to-left')) {
//       box.classList.remove('flipped-to-left');
//     } else if (box.classList.contains('flipped-to-top')) {
//       box.classList.remove('flipped-to-top');
//     } else if (box.classList.contains('flipped-to-bottom')) {
//       box.classList.remove('flipped-to-bottom');
//     } else {
//       // 點擊時可根據需求設置翻轉方向
//       box.classList.add('flipped-to-right'); // 默認右翻轉
//     }
//   });
// });

// 

// 根據每個 box 的 data-flip-direction 進行翻轉
boxes.forEach(box => {
    box.addEventListener('click', () => {
      const flipDirection = box.getAttribute('data-flip-direction');
      
      // 根據不同方向進行翻轉
      if (box.classList.contains(`flipped-to-${flipDirection}`)) {
        box.classList.remove(`flipped-to-${flipDirection}`);
      } else {
        box.classList.add(`flipped-to-${flipDirection}`);
      }
    });
  });
  
  // 點擊按鈕時統一翻轉或還原所有方塊
  document.getElementById('toggleFlip').addEventListener('click', () => {
    let allFlipped = true;
  
    // 檢查是否所有的方塊都已經翻轉
    boxes.forEach(box => {
      const flipDirection = box.getAttribute('data-flip-direction');
      if (!box.classList.contains(`flipped-to-${flipDirection}`)) {
        allFlipped = false;
      }
    });
  
    // 如果所有方塊都翻轉了，就關閉所有方塊；否則翻轉所有方塊
    boxes.forEach(box => {
      const flipDirection = box.getAttribute('data-flip-direction');
      if (allFlipped) {
        box.classList.remove(`flipped-to-${flipDirection}`);
      } else {
        box.classList.add(`flipped-to-${flipDirection}`);
      }
    });
  });