from collections import deque
from PIL import Image

input_path = "/home/ubuntu/upload/pasted_file_Nae9Hz_image.png"
output_path = "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-transparent-clean.png"

img = Image.open(input_path).convert("RGBA")
scale = 2
img = img.resize((img.width * scale, img.height * scale), Image.Resampling.LANCZOS)
pixels = img.load()
width, height = img.size

visited = [[False] * width for _ in range(height)]
q = deque()

def is_bg(x, y):
    r, g, b, a = pixels[x, y]
    return a > 0 and r < 36 and g < 36 and b < 36

def enqueue(x, y):
    if x < 0 or y < 0 or x >= width or y >= height or visited[y][x]:
        return
    if not is_bg(x, y):
        return
    visited[y][x] = True
    q.append((x, y))

for x in range(width):
    enqueue(x, 0)
    enqueue(x, height - 1)
for y in range(height):
    enqueue(0, y)
    enqueue(width - 1, y)

while q:
    x, y = q.popleft()
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        enqueue(nx, ny)

for y in range(height):
    for x in range(width):
        if visited[y][x]:
            r, g, b, _ = pixels[x, y]
            pixels[x, y] = (r, g, b, 0)

img.save(output_path)
print(output_path)
