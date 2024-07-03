document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.querySelector(".canvas");
  const penButton = document.getElementById("pen");
  const eraserButton = document.getElementById("eraser");
  const lineButton = document.getElementById("line");
  const squareButton = document.getElementById("square");
  const colorPicker = document.getElementById("color-picker");
  const saveButton = document.getElementById("save");
  const gridInput = document.getElementById("grid-size");

  let isDrawing = false;

  // Varsayılan ızgara oluşturma
  createGrid(20);

  // İzgara oluşturma fonksiyonu
  function createGrid(size) {
    canvas.innerHTML = ""; // Önceki izgarayı temizle

    for (let i = 0; i < size * size; i++) {
      const pixel = document.createElement("div");
      pixel.addEventListener("mousedown", activatePixel);
      pixel.addEventListener("mouseover", drawPixel);
      canvas.appendChild(pixel);
    }
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  }

  // Piksel etkinleştirme
  function activatePixel() {
    this.classList.toggle("active");
    if (isDrawing) {
      this.classList.add("active");
    }
  }

  // Piksel çizme işlevi
  function drawPixel() {
    if (isDrawing) {
      this.classList.add("active");
    }
  }

  // Fare olayları dinleyicileri
  canvas.addEventListener("mousedown", function() {
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", function() {
    isDrawing = false;
  });

  // Araç butonları olayları
  penButton.addEventListener("click", function() {
    isDrawing = true;
  });

  eraserButton.addEventListener("click", function() {
    isDrawing = true;
    colorPicker.value = "#ffffff"; // Beyaz rengi silgi olarak ayarla
  });

  lineButton.addEventListener("click", function() {
    isDrawing = true;
    canvas.addEventListener("click", drawLine);
  });

  squareButton.addEventListener("click", function() {
    isDrawing = true;
    canvas.addEventListener("click", drawSquare);
  });

  // Çizgi çizme işlevi
  function drawLine(event) {
    const startX = event.pageX - canvas.offsetLeft;
    const startY = event.pageY - canvas.offsetTop;

    canvas.removeEventListener("click", drawLine);

    canvas.addEventListener("click", function drawEndLine(event) {
      const endX = event.pageX - canvas.offsetLeft;
      const endY = event.pageY - canvas.offsetTop;

      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = colorPicker.value;
      ctx.stroke();

      canvas.removeEventListener("click", drawEndLine);
    });
  }

  // Kare çizme işlevi
  function drawSquare(event) {
    const startX = event.pageX - canvas.offsetLeft;
    const startY = event.pageY - canvas.offsetTop;
    const squareSize = 30; // Kare boyutu

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(startX, startY, squareSize, squareSize);
  }

  // Renk seçici olayı
  colorPicker.addEventListener("input", function() {
    let color = colorPicker.value;
    canvas.querySelectorAll(".active").forEach(pixel => {
      pixel.style.backgroundColor = color;
    });
  });

  // Kaydetme işlevi
  saveButton.addEventListener("click", function() {
    const canvasElement = document.querySelector('.canvas');
    const ctx = canvasElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);

    // Kaydetme işlemi
    const link = document.createElement('a');
    link.download = 'pixel_art.png';
    link.href = canvasElement.toDataURL();
    link.click();
  });

  // İzgara boyutu değiştirme işlevi
  gridInput.addEventListener("change", function() {
    let gridSize = parseInt(gridInput.value);
    createGrid(gridSize);
  });
});
