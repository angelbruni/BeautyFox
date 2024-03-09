const settings = document.querySelectorAll("[description]");
const previewInfo = document.getElementById("previewInfo");
const previewImageContainer = document.getElementById("previewImage");
const previewImage = document.querySelector("#previewImage image");
let currentDescription;
let currentImageSource;

settings.forEach(setting => {
    setting.addEventListener("mouseover", (event) => {
        const isChild = setting.contains(event.relatedTarget);
        if (!isChild) {
            const description = setting.getAttribute("description");
            const descriptionImage = setting.getAttribute("data-img");
            
            if (description !== currentDescription || descriptionImage !== currentImageSource) {
                previewInfo.classList.remove("fadeInLeftToRight");
                previewImageContainer.classList.remove("fadeInLeftToRight");
				previewImageContainer.style.display = descriptionImage ? null : 'none';
        
                setTimeout(() => {
                    previewInfo.textContent = description;
                    previewImage.setAttribute("src", descriptionImage);
                    previewInfo.classList.add("fadeInLeftToRight");
                    previewImageContainer.classList.add("fadeInLeftToRight");
                    
                    currentDescription = description;
                    currentImageSource = descriptionImage;
                }, 50);
            }
        }
    });
});
