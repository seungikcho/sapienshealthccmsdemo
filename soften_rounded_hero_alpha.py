from collections import deque
from PIL import Image, ImageFilter

input_path = "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-rounded-continuous.png"
output_path = "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-rounded-continuous-alpha.png"

img = Image.open(input_path).convert("RGBA")
width, height = img.size
px = img.load()
visited = [[False] * width for _ in range(height)]
q = deque()


def candidate(x, y):
    r, g, b, a = px[x, y]
    if a == 0:
        return True
    mx = max(r, g, b)
    mn = min(r, g, b)
    sat = mx - mn
    bright = (r + g + b) / 3
    return bright >= 228 and sat <= 36


def enqueue(x, y):
    if x < 0 or y < 0 or x >= width or y >= height:
        return
    if visited[y][x]:
        return
    if not candidate(x, y):
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
    for nx, ny in (
        (x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1),
        (x + 1, y + 1), (x - 1, y - 1), (x + 1, y - 1), (x - 1, y + 1)
    ):
        enqueue(nx, ny)

mask = Image.new("L", (width, height), 255)
mask_px = mask.load()
for y in range(height):
    for x in range(width):
        if visited[y][x]:
            mask_px[x, y] = 0

mask = mask.filter(ImageFilter.GaussianBlur(radius=5.5))
img.putalpha(mask)
img.save(output_path)
print(output_path)
