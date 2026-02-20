import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";

import Title from "./components/Title";
import ThemeToggle from "./components/ThemeToggle";
import ImageManager from "./components/ImageManager";
import MatrixEditor from "./components/MatrixEditor";
import Settings from "./components/Settings";
import SpritesheetGenerator from "./components/SpritesheetGenerator";

function App() {
  const [matrix, setMatrix] = useState([[""]]);
  const [spriteWidth, setSpriteWidth] = useState(null);
  const [spriteHeight, setSpriteHeight] = useState(null);
  const [padding, setPadding] = useState(null);
  const [images, setImages] = useState([]);
  const [spritesheetURL, setSpritesheetURL] = useState(null);
  const [baseSpritesheet, setBaseSpritesheet] = useState(null);
  const [theme, setTheme] = useState("");

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex`}>
      <ImageManager
        images={images}
        setImages={setImages}
        theme={theme}
      />

      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex-1 p-6 flex flex-col items-center">
        <Title theme={theme} />

        <MatrixEditor
          matrix={matrix}
          setMatrix={setMatrix}
          images={images}
          theme={theme}
        />

        <Settings
          spriteWidth={spriteWidth}
          setSpriteWidth={setSpriteWidth}
          spriteHeight={spriteHeight}
          setSpriteHeight={setSpriteHeight}
          padding={padding}
          setPadding={setPadding}
          baseSpritesheet={baseSpritesheet}
          setBaseSpritesheet={setBaseSpritesheet}
          theme={theme}
        />

        <SpritesheetGenerator
          spriteWidth={spriteWidth}
          spriteHeight={spriteHeight}
          padding={padding}
          spritesheetURL={spritesheetURL}
          setSpritesheetURL={setSpritesheetURL}
          images={images}
          matrix={matrix}
          baseSpritesheet={baseSpritesheet}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;
