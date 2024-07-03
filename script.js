document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.querySelector(".canvas");
  const penButton = document.getElementById("pen");
  const eraserButton = document.getElementById("eraser");
  const lineButton = document.getElementById("line");
  const squareButton = document.getElementById("square");
  const colorPicker = document.getElementById("color-picker");
  const saveButton = document.getElementById("save");
  const gridSizeInput = document.getElementById("grid-size");

  let isDrawing = false;
  let currentTool = 'pen';

  // Default grid size
  let gridSize = parseInt(gridSizeInput.value);

  // Initial grid creation
  createGrid(gridSize);

  // Grid creation function
  function createGrid(size) {
    canvas.innerHTML = ""; // Clear previous grid
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const pixel = document.createElement("div");
      pixel.addEventListener("mousedown", activatePixel);
      pixel.addEventListener("mouseover", drawPixel);
      canvas.appendChild(pixel);
    }
  }

  // Activate pixel
  function activatePixel() {
    if (currentTool === 'pen' && isDrawing) {
      this.classList.add("active");
    } else if (currentTool === 'eraser' && isDrawing) {
      this.classList.remove("active");
    } else if (currentTool === 'square' && isDrawing) {
      drawSquare(this);
    }
  }

  // Draw pixel
  function drawPixel() {
    if (currentTool === 'pen' && isDrawing) {
      this.classList.add("active");
    } else if (currentTool === 'eraser' && isDrawing) {
      this.classList.remove("active");
    }
  }

  // Draw square
  function drawSquare(pixel) {
    pixel.classList.add("active");
  }

  // Mouse events
  canvas.addEventListener("mousedown", function() {
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", function() {
    isDrawing = false;
  });

  // Tool buttons
  penButton.addEventListener("click", function() {
    currentTool = 'pen';
  });

  eraserButton.addEventListener("click", function() {
    currentTool = 'eraser';
  });

  squareButton.addEventListener("click", function() {
    currentTool = 'square';
  });

  // Color picker
  colorPicker.addEventListener("input", function() {
    let color = colorPicker.value;
    canvas.querySelectorAll(".active").forEach(pixel => {
      pixel.style.backgroundColor = color;
    });
  });

  // Save button
  saveButton.addEventListener("click", function() {
    const canvasElement = document.querySelector('.canvas');
    const ctx = canvasElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);

    const link = document.createElement('a');
    link.download = 'pixel_art.png';
    link.href = canvasElement.toDataURL();
    link.click();
  });

  // Grid size input change
  gridSizeInput.addEventListener("change", function() {
    gridSize = parseInt(gridSizeInput.value);
    createGrid(gridSize);
  });
});
