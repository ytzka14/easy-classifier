import os
import base64
import json

image_dir = "./images"
output_file = "encoded_images.json"

encoded_images = {}

for filename in os.listdir(image_dir):
  if filename.endswith(".jpg") or filename.endswith(".png"):
    with open(os.path.join(image_dir, filename), "rb") as image_file:
      encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
      encoded_images[filename] = encoded_image

with open(output_file, "w") as json_file:
  json.dump([{"link": encoded_image} for encoded_image in encoded_images.values()], json_file)