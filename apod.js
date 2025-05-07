const apiKey = sessionStorage.getItem("nasa_api_key") || prompt("Enter your NASA API Key:");
sessionStorage.setItem("nasa_api_key", apiKey);

const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&concept_tags=true`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').textContent = data.title;
        document.getElementById('date').textContent = data.date;
        document.getElementById('explanation').textContent = data.explanation;

        function getRandomDate() {
            const start = new Date(1995, 5, 16); // June 16, 1995
            const end = new Date();
            const random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return random.toISOString().split('T')[0];
          }

          const utterance = new SpeechSynthesisUtterance(data.explanation);
        speechSynthesis.speak(utterance)


        const mediaDiv = document.getElementById('media');
        if (data.media_type === "image") {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            img.style.maxWidth = "100%";
            mediaDiv.appendChild(img);
        } else if (data.media_type === "video") {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.width = "560";
            iframe.height = "315";
            iframe.allowFullscreen = true;
            mediaDiv.appendChild(iframe);
        }

        document.getElementById('tags').textContent = (data.concept_tags || []).join(", ");
    })
    .catch(error => console.error("Error fetching APOD:", error));