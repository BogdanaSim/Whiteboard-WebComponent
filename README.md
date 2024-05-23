# Whiteboard Web Component
## Overview
The Whiteboard Web Component is a component that allows users to draw, erase, upload or saving images, and perform undo/redo operations on a canvas. It provides a simple interface for creating and editing digital sketches, diagrams, and annotations within web applications.

## Features
- **Drawing:** Users can draw on the canvas using a customizable pen color and size.
- **Erasing/Reseting:** Erase parts of the drawing using an eraser tool or reset the whole canvas.
- **Image upload:** Import images to the canvas for annotation, reference or to continue the progress.
- **Undo/Redo:** Perform undo and redo operations to revert or reapply changes made to the canvas.
- **Export:** Export the canvas as JPEG or PNG for saving or sharing purposes.

## Implementation Details
The Whiteboard Component is implemented as a custom HTML element (`<whiteboard-component>`) using JavaScript's Web Components API. It consists of HTML, CSS, and JavaScript code encapsulated within a single file.

### HTML Structure
The component's HTML structure includes a canvas element for drawing, various control buttons for interacting with the canvas, and an input element for uploading images.

### CSS Styling
CSS styles are applied to customize the appearance of the whiteboard and its controls, providing a visually appealing user interface.

### JavaScript Functionality
The JavaScript code defines the behavior of the whiteboard component, including drawing, erasing, uploading images, undoing, redoing, and exporting functionalities. Event listeners are used to handle user interactions and update the canvas accordingly.

## Usage
To use the Whiteboard Component in your web application, follow these steps:
1. Include the `whiteboard.js` file in your project.
2. Use the `<whiteboard-component>` HTML tag wherever you want to embed the whiteboard.
3. Utilize the canvas by interacting with it using the provided controls, such as drawing, erasing, uploading images, and performing undo/redo operations.

## Example
Below is a demonstration of integrating the Whiteboard Web Component into your project:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Whiteboard Demo</title>
  <script src="whiteboard.js" defer></script>
</head>
<body>
  <whiteboard-component></whiteboard-component>
</body>
</html>
```

## Final Notes
The Whiteboard Web Component was designed to offer a convenient solution for integrating a whiteboard functionality into web applications. It provides users with the ability to quickly make notes and sketches without much complexity added to them.
