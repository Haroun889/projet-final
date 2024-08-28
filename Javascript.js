// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example: Image slider (if needed)
let currentImageIndex = 0;
const images = document.querySelectorAll('.player img');
const totalImages = images.length;

function nextImage() {
    images[currentImageIndex].classList.remove('visible');
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    images[currentImageIndex].classList.add('visible');
}

setInterval(nextImage, 3000);