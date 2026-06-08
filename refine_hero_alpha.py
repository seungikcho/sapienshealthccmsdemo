from collections import deque
from PIL import Image, ImageFilter

input_path = "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-transparent-refined.png"
output_path = "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-transparent-final.png"

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
    return bright >= 205 and sat <= 32


def enqueue(x, y):
    if x < 0 or y < 0 or x >= width or y >= height:
        return
    if visited[y][x]:
        return
    if not candidate(x, y):
        return
    visited[y][x] = True
    q.append((x, y))

# Seed only from the right side and upper-right edge where the checkerboard background exists.
for y in range(height):
    enqueue(width - 1, y)
    enqueue(width - 2, y)
for x in range(int(width * 0.55), width):
    enqueue(x, 0)
    enqueue(x, 1)

while q:
    x, y = q.popleft()
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1), (x + 1, y + 1), (x - 1, y - 1), (x + 1, y - 1), (x - 1, y + 1)):
        enqueue(nx, ny)

# Create a soft alpha falloff near the detected mask boundary.
mask = Image.new("L", (width, height), 255)
mask_px = mask.load()
for y in range(height):
    for x in range(width):
        if visited[y][x]:
            mask_px[x, y] = 0

mask = mask.filter(ImageFilter.GaussianBlur(radius=2.2))
img.putalpha(mask)
img.save(output_path)
print(output_path)
