/* global html2canvas domtoimage */

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FFFF33",
  "#FF33FF",
  "#33FFFF",
  "#FFFFFF",
  "#FF00FF",
  "#FF0000",
  "#5F9EA0",
  "#00FF00",
  
];
let currentColorIndex = 0;
const target = document.querySelector("#target");
const screenshotButton = document.querySelector("#screenshotButton");
const widgetsContainer = document.querySelector("#widgets");

// Change background color on click
function changeBackgroundColor(event) {
  if (
    event.target === screenshotButton ||
    (widgetsContainer && widgetsContainer.contains(event.target))
  ) {
    return;
  }
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  target.style.backgroundColor = colors[currentColorIndex];
}

document.body.addEventListener("click", changeBackgroundColor);

// Screenshot button functionality
function takeScreenshot() {
  domtoimage.toJpeg(target, { quality: 0.95 }).then((dataUrl) => {
    const link = document.createElement("a");
    link.download = "my-image-name.jpeg";
    link.href = dataUrl;
    link.click();
  });
}

screenshotButton.addEventListener("click", takeScreenshot);

// New image upload feature
const imageInput = document.querySelector("#imageInput");
const takePictureButton = document.querySelector("#takePictureButton");
const uploadedImageContainer = document.createElement("img");
uploadedImageContainer.id = "uploadedImage";
target.appendChild(uploadedImageContainer);

// Handle image selection
imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageContainer.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Trigger file input when "Take a Picture" button is clicked
takePictureButton.addEventListener("click", function () {
  imageInput.click();
});

// Function to resize text in contenteditable containers
function resizeTextToFit(container) {
  const maxWidth = container.offsetWidth;
  const maxHeight = container.offsetHeight;
  const content = container.innerText;
  let fontSize = 66; // Start with a large font size
  const minFontSize = 12; // Minimum font size
  const maxFontSize = 66; // Maximum font size

  // Function to adjust font size to fit the container's width and height
  function adjustFontSize() {
    container.style.fontSize = fontSize + "px";
    const textWidth = container.scrollWidth;
    const textHeight = container.scrollHeight;

    // If text is overflowing the container, reduce font size
    if (textWidth > maxWidth || textHeight > maxHeight) {
      fontSize -= 2; // Decrease font size
      if (fontSize >= minFontSize) {
        adjustFontSize(); // Recursively adjust until text fits
      }
    }
  }

  adjustFontSize();
}

// Attach the resizeTextToFit function to all editable elements
const editableContainers = document.querySelectorAll('.editable');
editableContainers.forEach(container => {
  container.addEventListener('input', () => resizeTextToFit(container)); // Adjust font size on user input
  resizeTextToFit(container); // Initial adjustment
});

function goToPage1() {
        // Länka till den första sidan
        window.location.href = "https://www.simongrey.se/";
      }
