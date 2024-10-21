const stage = new Konva.Stage({
    container: 'konva-container',
    width: 700,
    height: 400
});

let layer = new Konva.Layer();
stage.add(layer);

// let imageNode;
let history = [];

// 上傳圖片
document.getElementById('addImage').addEventListener('click', function () {
    document.getElementById('upload').click();
  });


  document.getElementById('upload').addEventListener('change', function (event) {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                const imageNode = new Konva.Image({
                    image: img,
                    x: 20,
                    y: 20,
                    draggable: true
                });
                layer.add(imageNode);
                layer.draw();
                saveHistory();
                addTransformer(imageNode); // 將圖片加入變形功能
            };
        };
        reader.readAsDataURL(file);
        // console.log(stage);
        // console.log(layer);
    });
});

// 保存畫布狀態至 localStorage
function saveHistory() {
    const json = stage.toJSON();
    history.push(json);
    localStorage.setItem('imageHistory', JSON.stringify(history));
    // console.log(history);
}

// 添加Transformer功能
function addTransformer(imageNode) {
    const transformer = new Konva.Transformer({
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        rotateEnabled: true,
        boundBoxFunc: function (oldBox, newBox) {
            if (newBox.width < 20 || newBox.height < 20) {
                return oldBox;
            }
            return newBox;
        }
    });

    layer.add(transformer);

    imageNode.on('click', () => {
        transformer.nodes([imageNode]); // 使用tr.nodes()而不是tr.attachTo()
        layer.draw();
    });

    imageNode.on('dragend', saveHistory); // 當圖片移動後，保存歷史
    imageNode.on('transformend', saveHistory); // 當圖片縮放或旋轉後，保存歷史

    stage.on('click', (e) => {
        if (e.target === stage) {
            transformer.nodes([]); // 取消選擇所有節點
            layer.draw();
        }
    });
}

// 上一步功能
// document.getElementById('undo').addEventListener('click', function () {
//     if (history.length > 1) {
//         history.pop();
//         const lastState = history[history.length - 1];

//         // 測試
//         // try {
//         //     const parsedState = JSON.parse(lastState);
//         //     console.log('Parsed State:', parsedState);
        
//         //     const testLayer = Konva.Node.create(parsedState, 'konva-container');
//         //     console.log('Test Layer:', testLayer);
//         // } catch (error) {
//         //     console.error('Error parsing or creating Konva node:', error);
//         // }

//          // 將 lastState 的 JSON 字串解析為物件
//          const parsedState = JSON.parse(lastState);

//         // 清空現有的圖層內容，而不是銷毀整個 stage
//         layer.destroyChildren(); 

//         // 從 JSON 中重新創建圖層
//         const newLayer = Konva.Node.create(parsedState, 'konva-container').getChildren()[0];
        
//         // 清空 layer 並重新加入新 layer 的所有節點
//         layer.add(...newLayer.getChildren());

//         // 如果有 Transformer，也需要重新附加
//         layer.getChildren().forEach((child) => {
//             if (child instanceof Konva.Image) {
//                 addTransformer(child);
//             }
//         });

//         layer.draw(); // 繪製新的內容
//         // console.log(history);
//         // console.log('Stage children:', stage.getChildren());

//         console.log('New Layer after undo:', stage);
//         console.log('New Layer after undo:', layer);
//         console.log(typeof(parsedState));
//     }
// });

// 清空畫布
document.getElementById('clear').addEventListener('click', function () {
    // 使用 SweetAlert2 顯示確認對話框
    Swal.fire({
        title: '確認清空畫布嗎？',
        text: '此操作將刪除所有圖片，且無法恢復。',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的，清空',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.isConfirmed) {
            // 如果點擊了"是的，清空"，執行清空操作
            layer.destroyChildren(); 
            layer.draw();
            localStorage.removeItem('imageHistory');
            history = []; // 清空歷史記錄
            Swal.fire('畫布已清空!', '', 'success');
        }
    });
});

 // 儲存圖片

document.getElementById('saveImage').addEventListener('click', function () {
    // 移除所有Transformer，確保圖片在儲存時沒有顯示節點
    const transformers = stage.find('Transformer');
    transformers.forEach(transformer => transformer.nodes([]));
    layer.draw();

    // 使用 SweetAlert2 顯示確認對話框
    Swal.fire({
        title: '確認儲存圖片嗎？',
        text: '確定要儲存目前的圖片嗎？',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '是的，儲存',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.isConfirmed) {
            // 如果點擊了"是的，儲存"，執行圖片儲存
            const dataURL = stage.toDataURL({
                mimeType: 'image/png',
                quality: 1.0
            });

            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'edited-image.png';
            link.click();

            Swal.fire('圖片已儲存!', '', 'success');
        }
    });
});