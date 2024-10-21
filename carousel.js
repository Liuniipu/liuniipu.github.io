
// 圖片列表
const imageSources = [
  "img/image01.jpg", 
  "img/image02.jpg", 
  "img/image03.jpg", 
  "img/image04.jpg", 
  "img/image05.jpg", 
  "img/image06.jpg", 
  "img/image07.jpg",
  "img/image08.jpg",
  "img/image09.jpg",
  
];

// 獲取圖片和縮略圖容器
const carouselImagesContainer = document.querySelector(".carousel__images");
const carouselThumbnailsContainer = document.querySelector(".carousel__thumbnails");



// 動態生成圖片和縮略圖
imageSources.forEach((src, index) => {
  // 創建 carousel__image 元素
  const imgElement = document.createElement("img");
  imgElement.src = src;
  imgElement.alt = `Image ${index + 1}`;
  imgElement.classList.add("carousel__image");
  if (index === 0) imgElement.classList.add("active"); // 第一張圖片設為活動狀態
  carouselImagesContainer.appendChild(imgElement);

  // 創建 carousel__thumbnail 元素
  const thumbnailElement = document.createElement("img");
  thumbnailElement.src = src;
  thumbnailElement.alt = `Thumbnail ${index + 1}`;
  thumbnailElement.classList.add("carousel__thumbnail");
  carouselThumbnailsContainer.appendChild(thumbnailElement);

  // 添加縮略圖點擊事件來切換圖片
  thumbnailElement.addEventListener("click", () => {
    currentIndex = index;
    showImage(index);
    resetProgressBar();
  });
});

// 初始圖片索引
let currentIndex = 0;
const images = document.querySelectorAll(".carousel__image");
const progressBar = document.querySelector(".carousel__progress-bar");
const thumbnails = document.querySelectorAll(".carousel__thumbnail");

// 顯示圖片函數
function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });

  thumbnails.forEach((thumb, i) => {
    thumb.classList.remove("active");
    if (i === index) {
      thumb.classList.add("active");
    }
  });
  // 更新縮略圖區域的橫向滾動位置
  scrollToThumbnail(index);
}

// 更新縮略圖區域的橫向滾動位置
function scrollToThumbnail(index) {
  const thumbnail = thumbnails[index];
  const thumbnailLeft = thumbnail.offsetLeft; // 獲取縮略圖相對於容器的左側位置
  const thumbnailWidth = thumbnail.offsetWidth;
  const containerWidth = carouselThumbnailsContainer.clientWidth;
  
  // console.log(containerWidth)
  // console.log(thumbnailLeft)
  // 計算需要滾動的距離，使當前的縮略圖位於容器的左側
  const scrollLeftPosition = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);

  // 設置容器的滾動位置
  carouselThumbnailsContainer.scrollTo({
    left: scrollLeftPosition,
    behavior: "smooth" // 平滑滾動效果
  });
}

// 下一張圖片函數
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  resetProgressBar();
}

// 重置播放時間條
function resetProgressBar() {
  progressBar.style.transition = "none"; // 取消過渡效果
  progressBar.style.width = "0%"; // 重設為 0%

  // 等待幾毫秒後，再次啟動過渡效果並設置寬度為80%
  setTimeout(() => {
    progressBar.style.transition = "width 5s linear"; // 重新啟用過渡效果
    progressBar.style.width = "90%"; 
  }, 50); // 延遲50毫秒
}


// 初始播放效果
resetProgressBar();
setInterval(nextImage, 5000); // 每5秒切換