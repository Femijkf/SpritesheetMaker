from PIL import Image
import io, base64


def _decode_data_url(data_url: str) -> bytes:
    if not data_url or "," not in data_url:
        raise ValueError("Invalid data URL")
    return base64.b64decode(data_url.split(",", 1)[1])


def _encode_png_to_base64(image: Image.Image) -> str:
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode("utf-8")

def create_spritesheet(matrix, images, sprite_width, sprite_height, padding):
    num_rows = len(matrix)
    num_columns = max(len(row) for row in matrix) if num_rows > 0 else 0

    if num_rows == 0 or num_columns == 0:
        spritesheet = Image.new("RGBA", (1, 1), (255, 255, 255, 0))
        return _encode_png_to_base64(spritesheet)

    sheet_width = num_columns * (sprite_width + padding) - padding
    sheet_height = num_rows * (sprite_height + padding) - padding
    spritesheet = Image.new("RGBA", (sheet_width, sheet_height), (255, 255, 255, 0))

    for row_idx, row in enumerate(matrix):
        for col_idx, img_name in enumerate(row):
            if img_name in images:
                img_data = base64.b64decode(images[img_name].split(",")[1])
                img = Image.open(io.BytesIO(img_data))
                img_resized = img.resize((sprite_width, sprite_height))
                x_offset = col_idx * (sprite_width + padding)
                y_offset = row_idx * (sprite_height + padding)
                spritesheet.paste(img_resized, (x_offset, y_offset))

    return _encode_png_to_base64(spritesheet)


def append_to_spritesheet(base_spritesheet, matrix, images, sprite_width, sprite_height, padding):
    base_bytes = _decode_data_url(base_spritesheet)
    base_img = Image.open(io.BytesIO(base_bytes)).convert("RGBA")
    base_width, base_height = base_img.size

    new_rows = len(matrix)
    new_columns = max((len(row) for row in matrix), default=0)

    if new_rows == 0 or new_columns == 0:
        return _encode_png_to_base64(base_img)

    has_any_new_frame = any(
        (img_name in images) for row in matrix for img_name in row
    )
    if not has_any_new_frame:
        return _encode_png_to_base64(base_img)

    new_part_width = new_columns * (sprite_width + padding) - padding
    final_width = max(base_width, new_part_width)
    final_height = base_height + new_rows * (sprite_height + padding)

    spritesheet = Image.new("RGBA", (final_width, final_height), (255, 255, 255, 0))
    spritesheet.paste(base_img, (0, 0))

    y_base = base_height + padding
    for row_idx, row in enumerate(matrix):
        for col_idx, img_name in enumerate(row):
            if img_name in images:
                img_data = _decode_data_url(images[img_name])
                img = Image.open(io.BytesIO(img_data))
                img_resized = img.resize((sprite_width, sprite_height))
                x_offset = col_idx * (sprite_width + padding)
                y_offset = y_base + row_idx * (sprite_height + padding)
                spritesheet.paste(img_resized, (x_offset, y_offset))

    return _encode_png_to_base64(spritesheet)
