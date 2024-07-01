document.addEventListener("DOMContentLoaded", function() {
  const canvasContainer = document.getElementById('canvas-container');
  const colorPalette = document.getElementById('color-palette');
  const gridSizeSelect = document.getElementById('grid-size');
  const createGridBtn = document.getElementById('create-grid');
  const penToolBtn = document.getElementById('pen-tool');
  const eraserToolBtn = document.getElementById('eraser-tool');
  const lineToolBtn = document.getElementById('line-tool');
  const selectToolBtn = document.getElementById('select-tool');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const zoomLevelDisplay = document.getElementById('zoom-level');

  let numRows = 16; // Varsayılan başlangıç değeri
  let numCols = 16; // Varsayılan başlangıç değeri
  let currentTool = 'pen'; // Varsayılan olarak kalem aracı seçili
  let selectedPixels = []; // Seçilen piksellerin listesi
  let offsetX, offsetY; // Taşıma işlemi için ofset değerleri
  let zoomLevel = 1; // Yakınlaştırma düzeyi
  const zoomStep = 0.2; // Her adımda yapılan büyüme/küçülme miktarı
  let mousedown = false; // Fare tıklama durumu

  // Izgara oluştur butonu
  createGridBtn.addEventListener('click', function() {
    const selectedSize = gridSizeSelect.value;
    numRows = selectedSize;
    numCols = selectedSize;
    createGrid();
  });

  // Kalem aracı seçimi
  penToolBtn.addEventListener('click', function() {
    currentTool = 'pen';
    // İleride gerekirse ekstra işlemler eklenebilir
  });

  // Silgi aracı seçimi
  eraserToolBtn.addEventListener('click', function() {
    currentTool = 'eraser';
    // İleride gerekirse ekstra işlemler eklenebilir
  });

  // Çizgi çekme aracı seçimi
  lineToolBtn.addEventListener('click', function() {
    currentTool = 'line';
    // İleride gerekirse ekstra işlemler eklenebilir
  });

  // Seçim aracı seçimi
  selectToolBtn.addEventListener('click', function() {
    currentTool = 'select';
    clearSelection(); // Mevcut seçimi temizle
  });

  // Yakınlaştırma aracı
  zoomInBtn.addEventListener('click', function() {
    zoomLevel += zoomStep;
    applyZoom();
  });

  // Uzaklaştırma aracı
  zoomOutBtn.addEventListener('click', function() {
    if (zoomLevel > zoomStep) {
      zoomLevel -= zoomStep;
      applyZoom();
    }
  });

  // Yakınlaştırma düzeyini uygula
  function applyZoom() {
    canvasContainer.style.transform = `scale(${zoomLevel})`;
    zoomLevelDisplay.textContent = `Yakınlaştırma Düzeyi: ${Math.round(zoomLevel * 100)}%`;
  }

  // Izgara oluşturma fonksiyonu
  function createGrid() {
    canvasContainer.innerHTML = ''; // Önceki ızgarayı temizle

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cellSize = Math.min(screenWidth / numCols, screenHeight / numRows);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = cellSize + 'px';
        pixel.style.height = cellSize + 'px';
        pixel.style.backgroundColor = '#ffffff'; // Varsayılan başlangıç rengi

        // Fare tıklama ve sürükleme işlemleri
        pixel.addEventListener('mousedown', function() {
          mousedown = true;
          handlePixelColor(this);
        });

        pixel.addEventListener('mouseup', function() {
          mousedown = false;
        });

        pixel.addEventListener('mousemove', function() {
          if (mousedown) {
            handlePixelColor(this);
          }
        });

        canvasContainer.appendChild(pixel);
      }
    }
  }

  // Piksel rengini işleme
  function handlePixelColor(pixel) {
    switch (currentTool) {
      case 'pen':
        pixel.style.backgroundColor = '#000000'; // Kalem rengi
        break;
      case 'eraser':
        pixel.style.backgroundColor = '#ffffff'; // Silgi rengi
        break;
      case 'line':
        // İleride gerekirse çizgi çizme işlemi eklenebilir
        break;
      case 'select':
        // İleride gerekirse seçim işlemi eklenebilir
        break;
    }
  }

  // Piksel seçimini işleme
  function handleSelection(pixel, row, col) {
    if (!selectedPixels.includes(pixel)) {
      pixel.classList.add('selected');
      selectedPixels.push(pixel);
    } else {
      pixel.classList.remove('selected');
      selectedPixels = selectedPixels.filter(item => item !== pixel);
    }
  }

  // Mevcut seçimi temizle
  function clearSelection() {
    selectedPixels.forEach(pixel => {
      pixel.classList.remove('selected');
    });
    selectedPixels = [];
  }

});
