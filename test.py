import requests

# API details
url = "https://apiimagestrax.vercel.app/api/genimage"
headers = {
    "Content-Type": "application/json"
}
data = {
    "prompt": "a cute wizard flying on a dragon"
}

# Send POST request
response = requests.post(url, headers=headers, json=data)

# Check response
if response.status_code == 200:
    with open("output.png", "wb") as f:
        f.write(response.content)
    print("Image saved as output.png")
else:
    print(f"Failed to generate image. Status code: {response.status_code}")
