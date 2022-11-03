// this jobs must come with API
let jobsTitle = [
    'Software Engineer',
    'Cloud Engineer', 'Database Developer',
    'Machine Learning Engineer',
    'Deep Learning Engineer',
    'Data Scientist',
    'Mobile Developer',
    'Front End Developer'
]
let COMMENTS_Test, LastCommentRendered = -1;
async function getComments() {
    let data = await fetch(`https://jsonplaceholder.typicode.com/comments`);

    return data.json();
}

(async _ => {
    COMMENTS_Test = await getComments();
    setNewComments(9)
})();


// create Comment 
function createComment({ body, name, postId }, index) {
    /*
    <div>
        <div class="testimonial bg-white p-4 position-relative rounded-3 shadow-mid">
        
            <div class="img-profile rounded-circle bg-gray position-absolute top-0 translate-middle-y">
                <img src="./IMGs/avatar-01.png" class="w-100 rounded-circle" alt="">
            </div>
        
            <div class="rv-comment position-absolute d-flex-center">
                <i class="fa fa-xmark"></i>
            </div>

            <h3 class="text-capitalize text-primary" title="Mohamed Frag">Mohamed Frag</h3>
            <p class="text-muted mb-2">Full Stack Developer</p>

            <div class="rank mb-4 fs-5">
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-stroke text-warning"></i>
                <i class="far fa-star text-secondary"></i>
            </div>

            <p class="comment-body text-dark mb-0 lh-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores et reiciendis voluptatum,
                amet est natus quaerat ducimus
            </p>
        </div>
    </div>
*/

    let randomChoice = Math.floor(Math.random() * (jobsTitle.length - 1));

    const outerDiv = document.createElement('div'),
        innerDiv = document.createElement('div'),
        imgProfile = document.createElement('div'),
        removeComment = document.createElement('div'),
        xmark = document.createElement('i'),
        img = document.createElement('img'),
        h3Name = document.createElement('h3'),
        jobTitle = document.createElement('p'),
        rateDiv = document.createElement('div'),
        commentText = document.createElement('div');

    innerDiv.className = 'testimonial bg-white p-4 position-relative rounded-3 shadow-mid';
    imgProfile.className = 'img-profile rounded-circle bg-gray position-absolute top-0 translate-middle-y';

    img.setAttribute('src', `./IMGs/avatar-0${(Math.floor(Math.random() * 6)) || 1}.png`);
    img.className = 'w-100 rounded-circle';
    img.setAttribute('alt', postId);

    removeComment.className = 'rv-comment position-absolute d-flex-center';
    xmark.className = 'fa fa-xmark';
    removeComment.appendChild(xmark);
    removeComment.addEventListener('click', function () {
        // this.parentElement.parentElement => get parent of parent 
        //      because path to targer element of 2 depth
        window['testimonials-body'].removeChild(this.parentElement.parentElement);
    })

    h3Name.className = 'text-capitalize text-primary';
    h3Name.textContent = name;
    h3Name.setAttribute('title', name);

    jobTitle.textContent = jobsTitle[randomChoice];
    jobTitle.className = 'text-muted mb-2';

    rateDiv.className = 'rank mb-4 fs-5';
    rateDiv.appendChild(createStars());

    commentText.className = 'comment-body text-dark mb-0 lh-base';
    commentText.textContent = body;


    imgProfile.appendChild(img);

    innerDiv.append(imgProfile, removeComment, h3Name, jobTitle, rateDiv, commentText);
    outerDiv.appendChild(innerDiv);

    // create random stars rate
    function createStars() {
        let randomRate = Math.random() * 51;
        // to set free for rate 5 Star
        randomRate = randomRate > 50 ? 50 : randomRate;

        let fullStar = randomRate / 10;
        const fragment = document.createDocumentFragment();
        let icon_ = document.createElement('i');

        for (let fs = 0; fs < Math.floor(fullStar); fs++) {
            icon_ = document.createElement('i');
            icon_.className = 'fas fa-star text-warning';
            fragment.appendChild(icon_);
        }
        if (randomRate == 50) return fragment;

        if (fullStar % 2 != 0) { // Set Half Star
            icon_ = document.createElement('i');
            icon_.className = 'fas fa-star-half-stroke text-warning';
            fragment.appendChild(icon_);
            fullStar = Math.floor(fullStar);
        }
        fullStar = 4 - fullStar;
        for (let fs = 0; fs < fullStar; fs++) {
            icon_ = document.createElement('i');
            icon_.className = 'far fa-star text-secondary';
            fragment.appendChild(icon_);
        }

        return fragment;
    }

    return outerDiv;
};

// Create New Comments and returned them;
function setNewComments(num = 3) {
    let fragm = document.createDocumentFragment();

    while (num--) {
        // Create new comment and pass last comment+1
        fragm.appendChild(createComment(COMMENTS_Test[++LastCommentRendered], LastCommentRendered));
    }
    window['testimonials-body'].appendChild(fragm);
}

// btn Add More 
window['testi-more'].addEventListener('click', _ => setNewComments(3));