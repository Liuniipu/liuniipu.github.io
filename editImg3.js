



var canvas;
var undoStack = [];
var redoStack = [];
var source;

window.onload = function () {
  canvas = new fabric.Canvas(document.getElementById("canvas"), {
    selection: true,
  });

  loadState(); // 恢復保存的狀態

  document.getElementById('addImage').addEventListener('click', function () {
    document.getElementById('uploadImage').click();
  });

  document.getElementById('uploadImage').addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result, function (img) {
        img.set({
          left: 100,
          top: 100,
        });
        canvas.add(img);
        img.setCoords();
        canvas.renderAll();
        saveState(); // 每次更改後保存狀態
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  document.getElementById('saveImage').addEventListener('click', function () {
    Swal.fire({
      title: '確定要儲存圖片嗎？',
      text: "確認後將下載圖片",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        var dataURL = canvas.toDataURL({
          format: 'png',
          quality: 1.0
        });
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas_image.png';
        link.click();

        Swal.fire(
          '已儲存！',
          '您的圖片已經成功下載。',
          'success'
        );
      }
    });
  });

  document.getElementById('undo').addEventListener('click', function () {
    undo();
  });

  document.getElementById('clean').addEventListener('click', function () {
    clearCanvas();
  });

  canvas.on('object:added', saveState);
  canvas.on('object:modified', saveState);
  canvas.on('object:removed', saveState);
};

function saveState() {
  undoStack.push(JSON.stringify(canvas.toJSON()));
  localStorage.setItem('undoStack', JSON.stringify(undoStack));
}

function loadState() {
  const storedUndoStack = localStorage.getItem('undoStack');
  if (storedUndoStack) {
    undoStack = JSON.parse(storedUndoStack);
    if (undoStack.length > 0) {
      var state = undoStack[undoStack.length - 1];
      canvas.loadFromJSON(state, function () {
        canvas.renderAll();
      });
    }
  }
}

function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    var state = undoStack[undoStack.length - 1];
    canvas.loadFromJSON(state, function () {
      canvas.renderAll();
    });
  }
}

function clearCanvas() {
  if (undoStack.length > 0) {
    Swal.fire({
      title: '確定要重做嗎?',
      text: "此操作將清空畫布!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        canvas.clear();
        var state = redoStack.pop();
        undoStack.push(state);
        canvas.loadFromJSON(state, function () {
          canvas.renderAll();
        });
      }
    });
  }
}



  // 編輯

  function allowDrop(event) {
    event.preventDefault();
  }

  function dragElement(event) {
    var tagName = event.target.tagName.toUpperCase();
    if (tagName == "IMG") {
      source = event.target;
    } else {
      source = event.target.querySelector('svg');
      tagName = source.tagName.toUpperCase();
      if (tagName != "SVG") {
        source = undefined;
      }
    }
  }

  function dropElement(event) {
    event.preventDefault();

    if (source == undefined) {
      return;
    }

    if (source.tagName == "IMG") {
      drawImage(event, source);
    } else {
      drawSvg(event, source);
    }
  }

  function drawImage(event, img) {
    var img = new fabric.Image(img, {
      left: event.offsetX,
      top: event.offsetY,
      width: img.width,
      height: img.height
    });
    canvas.add(img);
  }

  function drawSvg(event, svg) {
    var serializer = new XMLSerializer();
    var txt = serializer.serializeToString(svg);
    fabric.loadSVGFromString(txt, function (objects, options) {
      var svgElems = fabric.util.groupSVGElements(objects, options);
      svgElems
        .set({
          left: event.offsetX,
          top: event.offsetY,
          width: svgElems.width,
          height: svgElems.height
        })
        .setCoords();
      canvas.add(svgElems).renderAll();
    });
  }
