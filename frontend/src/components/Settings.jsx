import React from 'react';

const Settings = ({
    spriteWidth,
    setSpriteWidth,
    spriteHeight,
    setSpriteHeight,
    padding,
    setPadding,
    baseSpritesheet,
    setBaseSpritesheet,
    theme,
}) => {
    return (
        <div
            className={`${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } p-4 shadow rounded-lg w-full max-w-3xl mb-6`}
        >
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="flex space-x-4">
                <div>
                    <label className="block font-medium">Sprite Width</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={spriteWidth}
                        onChange={(e) => setSpriteWidth(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block font-medium">Sprite Height</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={spriteHeight}
                        onChange={(e) => setSpriteHeight(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block font-medium">Padding</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="mt-5">
                <label className="block font-medium mb-2">Upload Existing Spritesheet (optional)</label>
                <div className="flex items-center space-x-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBaseSpritesheet(e.target.files?.[0] || null)}
                        className={`border p-2 rounded w-full ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                    />

                    <button
                        type="button"
                        onClick={() => setBaseSpritesheet(null)}
                        disabled={!baseSpritesheet}
                        className={`${
                            theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-600"
                        } text-white px-4 py-2 rounded-lg shadow disabled:opacity-50`}
                    >
                        Clear
                    </button>
                </div>

                {baseSpritesheet && (
                    <div className="mt-2 text-sm opacity-80">
                        Selected: {baseSpritesheet.name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
