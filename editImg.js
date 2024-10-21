
/*
var canvas;
var undoStack = [];
var redoStack = [];





window.onload = function () {
  canvas = new fabric.Canvas(document.getElementById("canvas"));
  
  // 初始化時保存畫布狀態
  saveState();

  // 綁定文件上傳事件
  document.getElementById('uploadImage').addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result, function (img) {
        img.set({ left: 100, top: 100 });
        canvas.add(img);
        canvas.renderAll();
        saveState(); // 每次更改後保存狀態
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  // 綁定儲存圖片事件
  document.getElementById('saveImage').addEventListener('click', function () {
    var dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0
    });

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas_image.png';
    link.click();
  });

  // 綁定上一步事件
  document.getElementById('undo').addEventListener('click', function () {
    undo();
  });

  // 綁定重做事件
  document.getElementById('redo').addEventListener('click', function () {
    redo();
  });

  // 當畫布內容變化時保存狀態
  canvas.on('object:added', saveState);
  canvas.on('object:modified', saveState);
  canvas.on('object:removed', saveState);
};

// 保存當前狀態
function saveState() {
  undoStack.push(JSON.stringify(canvas));
  redoStack = []; // 當有新操作時，清空重做堆疊
}

// 上一步功能
function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    var state = undoStack[undoStack.length - 1];
    canvas.loadFromJSON(state, function () {
      canvas.renderAll();
    });
  }
}

// 重做功能
function redo() {
  if (redoStack.length > 0) {
    var state = redoStack.pop();
    undoStack.push(state);
    canvas.loadFromJSON(state, function () {
      canvas.renderAll();
    });
  }
}

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

*/


var canvas;
  var undoStack = [];
  var redoStack = [];

  // 新增的 視窗互動
  // window.onload = function () {
  //   var canvasElement = document.getElementById("canvas");
  //   canvasElement.width = window.innerWidth;
  //   canvasElement.height = window.innerHeight;
  
  //   canvas = new fabric.Canvas(canvasElement);
  //   saveState();
  // };

  window.onload = function () {

    // var canvasElement = document.getElementById("canvas");
    // var container = document.getElementById("canvasContainer");
    // canvasElement.width = window.innerWidth;
    // canvasElement.height = window.innerHeight;
// canvasElement.width = container.offsetWidth;
    // canvasElement.height = container.offsetHeight;

  
    // canvas = new fabric.Canvas(canvasElement);

    canvas = new fabric.Canvas(document.getElementById("canvas"));

    // 初始化時保存畫布狀態
    saveState();

    // 綁定文件上傳事件
    document.getElementById('uploadImage').addEventListener('change', function (event) {
      var reader = new FileReader();
      reader.onload = function (e) {
        fabric.Image.fromURL(e.target.result, function (img) {
          img.set({ left: 10, top: 10 });
          canvas.add(img);
          canvas.renderAll();
          saveState(); // 每次更改後保存狀態
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    });

    // 綁定儲存圖片事件
    document.getElementById('saveImage').addEventListener('click', function () {
      var dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
      });

      var link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas_image.png';
      link.click();
    });

    // 綁定上一步事件
    document.getElementById('undo').addEventListener('click', function () {
      undo();
    });

    // 綁定重做事件
    document.getElementById('redo').addEventListener('click', function () {
      redo();
    });

    // 當畫布內容變化時保存狀態
    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);
  };

  // 保存當前狀態
  function saveState() {
    undoStack.push(JSON.stringify(canvas));
    redoStack = []; 
    // 當有新操作時，清空重做堆疊
  }

  // 上一步功能
  function undo() {
    if (undoStack.length > 1) {
      redoStack.push(undoStack.pop());
      var state = undoStack[undoStack.length - 1];
      canvas.loadFromJSON(state, function () {
        canvas.renderAll();
      });
    }
  }

  // 重做功能
  function redo() {
    if (undoStack.length > 0) {
      // 使用 SweetAlert2 彈出確認框
      Swal.fire({
        title: '確定要重做嗎?',
        text: "此操作將還原到最近一次上一步的狀態!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          canvas.clear(); // 清空畫布
          var state = redoStack.pop();
          undoStack.push(state);
          canvas.loadFromJSON(state, function () {
            canvas.renderAll();
          });
        }
      });
    }
  }

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
