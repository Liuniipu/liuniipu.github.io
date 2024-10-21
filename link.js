document.querySelectorAll('.resource a').forEach(link => {
    link.addEventListener('click', function (event) {
      // 檢查連結是否為外部網站
      const url = new URL(link.href);
      const currentDomain = window.location.hostname;

      if (url.hostname !== currentDomain) {
        event.preventDefault(); // 防止立即跳轉
        Swal.fire({
          title: '即將前往外部網站',
          text: "您即將離開此頁面，是否繼續?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '前往',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = link.href; // 確認後跳轉
          }
        });
      }
    });
  });