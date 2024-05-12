import API_KEY from "./apikey.js";
const btn = document.querySelector("#button");
const input_box = document.querySelector("#input");
const container = document.querySelector("#image_container");
const loading = document.querySelector(".load"); // Select existing loading element

async function getImage() {
    loading.style.display = "flex"; // Show loading element
    container.innerHTML = ''; // Clear existing images

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": input_box.value,
            "n": 4,
            "size": "1024x1024"
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await response.json();
        console.log(data);

        data?.data.forEach(imageObject => {
            const image_box = document.createElement('div');
            image_box.classList.add('image_container');
            const image = document.createElement('img');
            image.setAttribute('src', imageObject.url);
            image_box.append(image);
            container.append(image_box);
        });

        loading.style.display = "none"; // Hide loading element after images are loaded
    } catch (error) {
        console.error(error);
        loading.style.display = "none"; // Hide loading element in case of error
    }
}

btn.addEventListener('click', getImage);
