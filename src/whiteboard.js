class Whiteboard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.setAttribute("id", "whiteboard-container");

    const style = document.createElement("style");
    style.textContent = `
        #whiteboard-container {
          width: fit-content;
          height: 600px;
          background-color:	#f2f0f7;
        }

        #whiteboard-container *{
          font-family: 'Garamond', serif;
        }

        canvas {
          border: 1px solid #000;
          background-color: #fff;
          cursor: crosshair;
          vertical-align: bottom;
        }

        #controls {
          width: 600px;
          display: flex;
          align-items: center;
          flex-direction: row;
          gap: 5px;
          border-image-width: 0.7rem 0.7rem 0rem 0.7rem !important;
          border: 1rem solid #aaaaff;
          border-bottom:0px;
          padding-bottom:5px;
          border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #aaaaff 6px, #aaaaff 15px, transparent 16px, transparent 20px) 20/0.7rem;

        }
        #controls input[type="color"], 
        #controls input[type="range"], 
        #controls button {
          display: inline-block;
        }

        #controls button {
          background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
          border-radius: 8px;
          border-style: none;
          box-sizing: border-box;
          color: #FFFFFF;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 16px;
          font-weight: 500;
          padding: 10px;
          text-align: center;
          text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
          transition: all .5s;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          opacity:1;         
        }

        #controls button:hover {
          box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
          transition-duration: .1s;
        }

        #controls button#eraser.active {
          box-shadow: rgba(80, 63, 205, 1) 0 1px 30px;
          background-image: linear-gradient(92.88deg, #30427f 9.16%, #382895 43.89%, #4322a1 64.72%);
          transition-duration: .1s;
        }

        .menu-container {
            position: relative;
            display: inline-block;
        }

        .menu-button {
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .menu {
            min-width: 150px;
            display: none;
            font-size:20px;
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 10px;
            padding: 5px;
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            z-index: 1000;
        }

        .menu a {
            min-width: fit-content;
            text-decoration: none;
            color: #333;
            display: block;
            padding: 5px 10px;
        }

        .menu a:hover {
            background-color: #f0f0f0;
        }

        label {
          background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
          border-radius: 8px;
          border-style: none;
          box-sizing: border-box;
          color: #FFFFFF;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 16px;
          font-weight: 500;
          padding: 10px;
          text-align: center;
          text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
          transition: all .5s;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation; 
       }

       label:hover {
        box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
        transition-duration: .1s;
      }
       
       #uploadImg {
          opacity: 0;
          position: absolute;
          z-index: -1;
       }

       #slider-container{
        display: flex;
        align-items: center;
        width: 50%;
        flex-direction: row;
       }

       .slider {
        -webkit-appearance: none; 
        appearance: none;
        width: 80%; 
        height: 15px; 
        background: #d9d9d9; 
        border: 1px solid grey;
        outline: none; 
        opacity: 0.7; 
        border-radius:20px;
        -webkit-transition: .2s; 
        transition: opacity .2s;
      }

      .slider-value-container{
        border: 3px double grey;
        min-width:30px;
        text-align:right;
        padding-right:1px;
      }

      #slider-value{
        font-size: 30px;
      }
      
      .slider:hover {
        opacity: 1; 
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px; 
        height: 30px; 
        background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
        cursor: pointer; 
        border: 3px solid #5643CC;
        border-radius:8px;
        transition:0.1s ease-in-out;
      }
      
      .slider::-moz-range-thumb {
        width: 20px; 
        height: 30px; 
        background: #62438a; 
        cursor: pointer; 
      }

      #controls button span{
        font-size: 20px;
      }

      .section {
          width:fit-content;
          border: 1rem solid #aaaaff;
          border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #aaaaff 6px, #aaaaff 15px, transparent 16px, transparent 20px) 20/0.7rem;
      }

      #undo:disabled{
        opacity: 0.3;
        cursor: default;
      }

      #redo:disabled{
        opacity: 0.3;
        cursor: default;
      }
      `;

    container.innerHTML = `
        <div id="controls" class="section">
          <button id="undo" title="Undo"><span>&#10554;</span></button>
          <button id="redo" title="Redo"><span>&#10555;</span></button>
          <button id="eraser" title="Eraser"><span>&#8864;</span></button>
          <button id="reset" title="Reset All"><span>&#8634;</span></button>
          <div class="menu-container">
                <button class="menu-button" style="font-size:20px;">Export</button>
                <div class="menu" id="floatingMenu">
                    <a href="#" id = "save-jpeg">Save as JPEG</a>
                    <a href="#" id = "save-png">Save as PNG</a>
                </div>
          </div>
          <label for="uploadImg" style="font-size:20px;">Import</label>
          <input type="file" id="uploadImg" accept="image/*">
          <div id="slider-container">
          <input type="color" id="colorPicker">
          <input type="range" id="penSize" min="1" max="20" class="slider">
          <div class="slider-value-container">
          <span id="slider-value"></span></div>
          </div>
        </div>
        <div class="section">
        <canvas id="canvas" width="600" height="500" ></canvas></div>
        
      `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  connectedCallback() {
    this.canvas = this.shadowRoot.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.colorPicker = this.shadowRoot.getElementById("colorPicker");
    this.penSize = this.shadowRoot.getElementById("penSize");
    this.uploadImgInput = this.shadowRoot.getElementById("uploadImg");
    this.eraserButton = this.shadowRoot.getElementById("eraser");
    this.undoButton = this.shadowRoot.getElementById("undo");
    this.undoButton.disabled = true;
    this.redoButton = this.shadowRoot.getElementById("redo");
    this.redoButton.disabled = true;
    this.isDrawing = false;
    this.reader = new FileReader();
    this.img = new Image();
    this.lastX = 0;
    this.lastY = 0;
    this.undoStack = [];
    this.redoStack = [];

    this.backgroundCanvas = document.createElement("canvas");
    const backgroundContext = this.backgroundCanvas.getContext("2d");
    this.backgroundCanvas.width = this.canvas.width;
    this.backgroundCanvas.height = this.canvas.height;
    backgroundContext.fillStyle = "white";
    backgroundContext.fillRect(
      0,
      0,
      this.backgroundCanvas.width,
      this.backgroundCanvas.height
    );

    this.handleButtonsListeners();
    this.handleMouseActionsListeners();
    this.handleMenuListeners();
    this.changeSliderValue();
  }

  handleMouseActionsListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.stopDrawing());
  }

  handleButtonsListeners() {
    this.uploadImgInput.addEventListener("change", (e) => this.uploadImage(e));
    this.reader.addEventListener("load", (e) => {
      this.img.addEventListener("load", (e) => {
        this.context.drawImage(
          this.img,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      });
      this.img.src = e.target.result;
      this.saveState();
    });
    const buttons = this.shadowRoot.querySelectorAll("#controls button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.id === "eraser") {
          this.toggleEraser(button);
        } else if (button.id === "reset") {
          this.resetCanvas();
        } else if (button.id === "undo") {
          this.undo();
        } else if (button.id === "redo") {
          this.redo();
        }
      });
    });
  }

  handleMenuListeners() {
    const menuButton = this.shadowRoot.querySelector(".menu-button");
    const menu = this.shadowRoot.getElementById("floatingMenu");
    menuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu(menu);
    });
    const options = this.shadowRoot.querySelectorAll("#floatingMenu a");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (option.id === "save-jpeg") {
          this.saveAsFile("image/jpeg", "whiteboard.jpeg");
        } else if (option.id === "save-png") {
          this.saveAsFile("image/png", "whiteboard.png");
        }
        this.closeMenu(menu);
      });
    });

    document.addEventListener("click", (event) => {
      if (!this.shadowRoot.contains(event.target)) {
        this.closeMenu(menu);
      }
    });

    this.penSize.addEventListener("input", (e) => {
      this.changeSliderValue();
    });
  }

  changeSliderValue() {
    const penValue = this.shadowRoot.getElementById("slider-value");
    penValue.innerHTML = this.penSize.value;
  }

  toggleEraser(eraserButton) {
    eraserButton.classList.toggle("active");
  }

  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.uploadImgInput.value = "";
    this.saveState();
  }

  startDrawing(e) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    this.saveState();
  }

  stopDrawing() {
    this.isDrawing = false;
    this.context.beginPath();
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.context.lineWidth = this.penSize.value;
    this.context.lineCap = "round";

    if (this.eraserButton.classList.contains("active")) {
      this.context.strokeStyle = "#fff";
    } else {
      this.context.strokeStyle = this.colorPicker.value;
    }

    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  saveAsFile(fileType, fileName) {
    const compositeCanvas = document.createElement("canvas");
    const compositeContext = compositeCanvas.getContext("2d");
    compositeCanvas.width = this.canvas.width;
    compositeCanvas.height = this.canvas.height;

    compositeContext.drawImage(this.backgroundCanvas, 0, 0);

    compositeContext.drawImage(this.canvas, 0, 0);

    const dataUrl = compositeCanvas.toDataURL(fileType);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  }

  uploadImage(e) {
    const file = e.target.files[0];
    this.reader.readAsDataURL(file);
  }

  toggleMenu(menu) {
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }

  closeMenu(menu) {
    menu.style.display = "none";
  }

  undo() {
    if (this.undoStack.length > 0) {
      const lastState = this.undoStack.pop();
      this.redoStack.push(this.canvas.toDataURL());
      this.redoButton.disabled = false;
      this.restoreState(lastState);
    }

    if (this.undoStack.length === 0) this.undoButton.disabled = true;
  }

  redo() {
    if (this.redoStack.length > 0) {
      const lastState = this.redoStack.pop();
      this.undoStack.push(this.canvas.toDataURL());
      this.undoButton.disabled = false;
      this.restoreState(lastState);
    }
    if (this.redoStack.length === 0) this.redoButton.disabled = true;
  }

  saveState() {
    this.undoStack.push(this.canvas.toDataURL());
    this.undoButton.disabled = false;
    this.redoButton.disabled = true;
    this.redoStack = [];
  }

  restoreState(state) {
    const img = new Image();
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0);
    };
    img.src = state;
  }
}

customElements.define("whiteboard-component", Whiteboard);
