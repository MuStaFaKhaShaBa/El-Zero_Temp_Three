/*
    - Slider
    -- Select Image And Show it 
*/
/*
<!-- |=> S T A R T - S L I D E R  <=| -->
<div id="sliderJS" class="d-none d-flex-center bg-dark bg-opacity-50">

    <div class="container">

    <div class="row justify-content-center">

        <div class="box-pop-up col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 position-relative">

        <div class="image border border-5 border-white rounded-3">
            <img src="./IMGs/gallery-01.png" id="sliderImage" class="w-100" alt="">
        </div>

        <div class="option d-flex align-items-center justify-content-between px-4 fa-3x text-primary">
            <div id="travBack" class="bg-gray px-4 py-3">
            <i class="fas fa-angle-left"></i>
            </div>
            <div id="travNext" class="bg-gray px-4 py-3">
            <i class="fas fa-angle-right"></i>
            </div>
        </div>

        <div id="closePopUp" class="cl-pop bg-gray px-4 py-3 position-absolute top-0 end-0 me-4 mt-3">
            <i class="fas fa-xmark fa-2x text-primary"></i>
        </div>

        </div>
    </div>
    </div>
</div>
<!-- |=> E N D - S L I D E R  <=| -->

*/

// Get All Images 
const IMAGES = [...document.querySelectorAll('#gallery .gallery-item')];
let currentImg;

// Add Event On All IMAGES That's When Clcik On Image 
//    send its src To Pop Up and Display It 
IMAGES.forEach((img, index) => img.addEventListener('click', _ => {
    setSlider(index);
}
));

// Set Slider
function setSlider(index) {
    currentImg = index; // set current image index
    setPopUpSrc(currentImg);
    // Show Slider 
    sliderJS.classList.remove('d-none');

}
// function set src of image to pop Up ,
//  Can Set More Data in The Future
function setPopUpSrc(index) {
    sliderImage.src = IMAGES[index].firstElementChild.src;
}

// Travers Back 
travBack.addEventListener('click', e => {
    travers('back')
});

// Travers Next
travNext.addEventListener('click', e => {
    travers('next');
});

// Travers Function
function travers(dir) {
    if (dir == 'back') {
        // Travers Back
        if (currentImg == 0) // First Image 
            currentImg = IMAGES.length; // Reset To last One

        currentImg--;
    }
    else if (dir == 'next') {
        // Travers Next
        if (currentImg == IMAGES.length - 1) // Last Image
            currentImg = -1; // reset To First Image

        currentImg++;
    }
    setPopUpSrc(currentImg);
}

// Keybord Travers
document.addEventListener('keyup', e => {
    // console.log(e.code);

    // If Slider Is Active
    if (!sliderJS.classList.contains('d-none')) {
        if (e.code == 'ArrowRight') travers('next');
        else if (e.code == 'ArrowLeft') travers('back');
        else if (e.code == 'Escape') sliderJS.classList.add('d-none');
    }
})

// Close Pop Up
closePopUp.addEventListener('click', _ => sliderJS.classList.add('d-none'));

// 
document.addEventListener('click', e => {
    // console.log(e.target);

    // if User Click Outside popUp Close SliderJS
    if (!sliderJS.classList.contains('d-none'))
        if (e.path[0].id == 'sliderJS' || e.path[2].id == 'sliderJS')
            sliderJS.classList.add('d-none');
});