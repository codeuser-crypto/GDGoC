import React, { useState } from 'react';
import chroma from 'chroma-js';

const ColorPaletteGenerator = () => {
  const [baseColors, setBaseColors] = useState(['#ff5733', '#33ff57']);  // Default colors
  const [generatedPalette, setGeneratedPalette] = useState([]);

  // Generate palette based on base colors
  const generatePalette = () => {
    const newPalette = baseColors.map(color => 
      chroma.scale([color, chroma(color).set('hsl.h', '+0.5')])  // Use chroma.scale for a palette
        .mode('lab')  // Optionally, you can set color mode
        .colors(5)   // Get 5 color variations
    ).flat();
    setGeneratedPalette(newPalette);
  };

  // Handle color input change
  const handleColorChange = (index, color) => {
    const newColors = [...baseColors];
    newColors[index] = color;
    setBaseColors(newColors);
  };

  // Handle copying color to clipboard
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color)
      .then(() => alert(`${color} copied to clipboard!`));
  };

  return (
    <div className="color-palette-container">
      <div className="color-inputs">
        {baseColors.map((color, index) => (
          <input
            key={index}
            type="color"
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
        ))}
        <button onClick={generatePalette}>Generate Palette</button>
      </div>

      <div className="palette-display">
        {generatedPalette.map((color, index) => (
          <div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
          >
            <span>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
