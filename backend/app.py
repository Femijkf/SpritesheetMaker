from flask import Flask, request, jsonify
from flask_cors import CORS
from spritesheet_utils import create_spritesheet, append_to_spritesheet

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/generate-spritesheet', methods=['POST'])
def generate_spritesheet():
    try:
        data = request.json
        matrix = data.get('matrix', [])
        images = data.get('images', {})
        base_spritesheet = data.get('base_spritesheet')
        sprite_width = int(data.get('sprite_width', 64))
        sprite_height = int(data.get('sprite_height', 64))
        padding = int(data.get('padding', 0))

        appended = bool(base_spritesheet)

        # Generate spritesheet
        if base_spritesheet:
            spritesheet_base64 = append_to_spritesheet(
                base_spritesheet, matrix, images, sprite_width, sprite_height, padding
            )
        else:
            spritesheet_base64 = create_spritesheet(matrix, images, sprite_width, sprite_height, padding)

        return jsonify({'spritesheet': f"data:image/png;base64,{spritesheet_base64}", 'appended': appended})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
