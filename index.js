const imageGallery = document.getElementById('image-gallery');
const openPopup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');
const popUpImage = document.getElementById('popup-image');
const nextImageBtn = document.getElementById('next')
const prevImageBtn = document.getElementById('prev')

const searchInput = location.search.split('=').pop();

const apiKey = 'zrDRrhvLnvBfs2b6MHjyYlDnBpEDyL-V-DS-ed-hbP4';
const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30`;
const filteredUrl = `https://api.unsplash.com/search/photos?query=${searchInput}&per_page=30&client_id=${apiKey}`;

let storedImages;
let selectedImage = 0

const fetchImages = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            storedImages = data;
            createImages(storedImages);
        });
}

const createImages = (data) => {
    data.forEach((item) => {
        let img = new Image();
        img.src = item.urls.regular;
        imageGallery.appendChild(img);

        img.addEventListener('click', () => {
            showFullImage(item)
        })
    })
}

const filterImages = () => {
    fetch(filteredUrl)
        .then(res => res.json())
        .then(data => {
            storedImages = data.results;
            createImages(storedImages);
        });
}


const showFullImage = (item) => {
    openPopup.classList.remove('unshow');
    popUpImage.src = item.urls.regular;

    closePopup.addEventListener('click', () => {
        openPopup.classList.add('unshow')
    })
}

nextImageBtn.addEventListener('click', () => {
    if(selectedImage < storedImages.length - 1) {
        selectedImage++;
        showFullImage(storedImages[selectedImage])
    }
})

prevImageBtn.addEventListener('click', () => {
    if(selectedImage > 0) {
        selectedImage--;
        showFullImage(storedImages[selectedImage])
    }
})


if (searchInput === '') {
    fetchImages();
} else {
    filterImages();
}

fetchImages();
createImages()


