import React, { useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const SpritesheetGenerator = ({
  spriteWidth,
  spriteHeight,
  padding,
  spritesheetURL,
  setSpritesheetURL,
  images,
  matrix,
  baseSpritesheet,
  theme
}) => {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // useEffect to scroll the screen to the bottom when the spritesheet is generated
  useEffect(() => {
    if (spritesheetURL) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [spritesheetURL]);

  const generateSpritesheet = async () => {
    const imageData = {};
    for (const { file, name } of images) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      imageData[name] = base64;
    }

    const baseSpritesheetDataUrl = baseSpritesheet
      ? await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(baseSpritesheet);
        })
      : null;

    try {
      const response = await axios.post(`${API}/generate-spritesheet`, {
        matrix,
        images: imageData,
        sprite_width: spriteWidth,
        sprite_height: spriteHeight,
        padding,
        base_spritesheet: baseSpritesheetDataUrl,
      });

      if (baseSpritesheet && !response.data.appended) {
        console.warn(
          "Base spritesheet was selected, but backend did not append. " +
            "This usually means the backend server wasn't restarted / is running old code, " +
            "or the request didn't include base_spritesheet."
        );
      }

      setSpritesheetURL(response.data.spritesheet);
    } catch (error) {
      console.error("Error generating spritesheet:", error);
    }
  };

  return (
    <>
      {/* Generate Button */}
      <button
        onClick={generateSpritesheet}
        className={`${theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"
          } text-white px-6 py-3 rounded-lg disabled:opacity-50`}
        disabled={!spriteWidth || !spriteHeight || padding === null || images.length === 0}
      >
        Generate Spritesheet
      </button>

      {/* Spritesheet Output */}
      {spritesheetURL && (
        <div className="mt-6 relative">
          <img
            src={spritesheetURL}
            alt="Spritesheet"
            className={`rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white" }`}
          />
          <div className="flex justify-center mt-5">
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = spritesheetURL;
                a.download = "spritesheet.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              className={`${theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"
                } text-white px-6 py-3 rounded-lg`}
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpritesheetGenerator;
