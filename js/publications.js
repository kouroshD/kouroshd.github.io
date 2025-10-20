function createMediaElement(mediaLink, mediaType) {
    if (!mediaLink) return null;

    const container = document.createElement('div');
    container.className = 'pub-media-container';

    if (mediaType === 'video') {
        const video = document.createElement('video');
        video.src = mediaLink;
        video.controls = true;
        video.preload = 'metadata';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        container.appendChild(video);

        // Add play button overlay
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.innerHTML = '<i class="fas fa-play-circle"></i>';
        container.appendChild(playButton);

        // Hide play button when video starts playing
        video.addEventListener('play', () => {
            playButton.style.display = 'none';
        });

        video.addEventListener('pause', () => {
            playButton.style.display = 'block';
        });
    } else if (mediaType === 'image') {
        const img = document.createElement('img');
        img.src = mediaLink;
        img.className = 'pub-media';
        img.alt = 'Publication media';
        container.appendChild(img);
    }

    return container;
}

function loadPublications() {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.publications-grid');
            if (!container) return;

            data.publications.forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.className = 'pub-item';

                const mediaContainer = createMediaElement(pub.media_link, pub.media_type);
                const contentDiv = document.createElement('div');
                contentDiv.className = 'pub-content';

                // Publication content
                contentDiv.innerHTML = `
                    <div class="pub-title">${pub.title}</div>
                    <div class="pub-authors">${pub.authors}</div>
                    <div class="pub-venue">${pub.venue} (${pub.year})</div>
                    <div class="pub-links">
                        ${pub.pdf_link ? `<a href="${pub.pdf_link}" target="_blank">PDF</a>` : ''}
                        ${pub.doi_link ? `<a href="${pub.doi_link}" target="_blank">DOI</a>` : ''}
                        ${pub.project_page ? `<a href="${pub.project_page}" target="_blank">Project Page</a>` : ''}
                    </div>
                `;

                if (mediaContainer) {
                    pubItem.appendChild(mediaContainer);
                }
                pubItem.appendChild(contentDiv);
                container.appendChild(pubItem);
            });
        })
        .catch(error => {
            console.error('Error loading publications:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadPublications);