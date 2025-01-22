const slider = document.querySelector('.slider');
const slides = [
  {
    title: 'WELCOME!',
    description: 'This is a personal website produced by Hongyi.',
    imageUrl: 'img/image01.jpg'
  },
  {
    title: '歡迎!',
    description: '這裡是宏義製作的個人網站',
    imageUrl: 'img/image02.jpg'
  },
  {
    title: 'ENJOY IT!',
    description: 'Using HTML, CSS and JavaScript, as well as my photography.',
    imageUrl: 'img/image03.jpg'
  },
  {
    title: '請暢遊',
    description: '運用了HTML、CSS以及JavaScript，以及個人攝影作品',
    imageUrl: 'img/image04.jpg'
  },
  {
    title: 'CONTACT ME',
    description: 'If you have any questions or seek cooperation, please contact:chuanren54@gmail.com',
    imageUrl: 'img/image05.jpg'
  },
  {
    title: '聯絡資訊',
    description: '如果有任何疑問或尋求合作，歡迎聯絡：chuanren54@gmail.com',
    imageUrl: 'img/image06.jpg'
  },
  // 其他6個幻燈片數據
  // { title: 'Title2', description: '...', imageUrl: '...' },
];

slides.forEach(slide => {
  const li = document.createElement('li');
  li.classList.add('c2-item');
  li.style.backgroundImage = `url(${slide.imageUrl})`;
  
  const content = document.createElement('div');
  content.classList.add('c2-content');
  
  const title = document.createElement('h2');
  title.classList.add('c2-title');
  title.textContent = slide.title;

  const description = document.createElement('p');
  description.classList.add('c2-description');
  description.textContent = slide.description;

  // const button = document.createElement('button');
  // button.textContent = 'Read More';

  content.appendChild(title);
  content.appendChild(description);
  // content.appendChild(button);
  li.appendChild(content);
  slider.appendChild(li);
});

// const slider = document.querySelector('.slider');


function activate(e) {
  const items = document.querySelectorAll('.c2-item');  // 每次點擊時更新 items
  if (e.target.matches('.next')) {
    slider.append(items[0]);  // 將第一張幻燈片移到最後
  }
  if (e.target.matches('.prev')) {
    slider.prepend(items[items.length - 1]);  // 將最後一張幻燈片移到最前
  }
}

document.addEventListener('click', activate, false);

const items = document.querySelectorAll('.slider .c2-item');
items.forEach((item, index) => {
   
  item.addEventListener('click', () => {
    goToSlide(index);  // 當點擊時觸發 goToSlide 函數
  });
});

function goToSlide(index) {
  // const items = document.querySelectorAll('.slider .c2-item'); 
  const selectedItem = items[index];  // 被點擊的幻燈片
  const firstItem = slider.querySelector('.c2-item');  // 當前的第一張
  slider.insertBefore(selectedItem, firstItem.nextSibling);  

  // slider.prepend(selectedItem); 
}

// 每五秒自動下一張
const nextButton = document.querySelector('.next');

function autoSlide() {
  nextButton.click();  // 每次模擬點擊 "下一張" 按鈕
}

setInterval(autoSlide, 8000);  // 每8秒執行一次
