function textChangeListener(evt) {
  let id = evt.target.id;
  let text = evt.target.value;

  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.font = "30px Impact";
  ctx.textAlign = "center";
  ctx.lineWidth = 3;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  if (topLine != null) {
    ctx.strokeText(topLine, canvas.width / 2, 40);
    ctx.fillText(topLine, canvas.width / 2, 40);
  }
  if (bottomLine != null) {
    ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
    ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
  }
}

function saveFile() {
  window.open(document.querySelector("canvas").toDataURL());
}

function handleFileSelect(e) {
  let canvasWidth = 500;
  let canvasHeight = 500;
  let file = e.target.files[0];

  let reader = new FileReader();
  reader.onload = function (fileObject) {
    let data = fileObject.target.result;

    let image = new Image();
    image.onload = function () {
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    };

    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file);
}

window.topLineText = "";
window.bottomLineText = "";
let inputTop = document.getElementById("topLineText");
let inputBottom = document.getElementById("bottomLineText");
inputTop.oninput = textChangeListener;
inputBottom.oninput = textChangeListener;
document.getElementById("file").addEventListener("change", handleFileSelect, false);
document.querySelector("button").addEventListener("click", saveFile, false);
