
// ----|| To TOP Btn --------||
window.addEventListener('scroll', _ => {
  if (window.scrollY >= home.clientHeight) {
    btnTop.style.right = '10px';
  } else
    btnTop.style.right = '-100px';
});
btnTop.addEventListener('click', _ => window.scrollTo({ top: 0 }))
// ----|| To TOP Btn --------||

// -------------|| S T A R T - O U R - S K I L L S - S E C T I O N  ||----------
let progresses = Array.from(document.querySelectorAll(".skills .skill span"));
let showProgressWayDef = "sim";
let SkillsSec = false;
window.addEventListener("scroll", (e) => {
  // if Scroll be in scope of our section do transaction
  if (
    window.scrollY >= window["our-skills"].offsetTop - 260 &&
    window.scrollY <=
    window["our-skills"].clientHeight + window["our-skills"].offsetTop - 260
  ) {
    !SkillsSec && showProgress();
    SkillsSec = true;
  } else {
    // if go out of our scope hide progress
    SkillsSec && hideProgress();
    SkillsSec = false;
  }
});
// ----------- set function show way
function showProgress() {
  progresses.forEach((spam, index) => {
    spam.style.cssText = `width:var(--value);transition-delay:${showProgressWayDef == "sim" ? 0 : index * 0.6
      }s;`;
  });
}

// ----------- set function Hide Progress
function hideProgress() {
  progresses.forEach((sp) => {
    sp.style.cssText = `width:0%'`;
  });
}

// Set Way Of Fill Color Of Span
setShowWay.addEventListener("click", (_) => {
  // toggle class to set correct style
  window["custom-check"].classList.toggle("sequential-trans");
  hideProgress(); // hide all progresses
  showProgressWayDef = showProgressWayDef == "sim" ? "seq" : "sim";
  setTimeout(showProgress, 1000); // wait 1s then make the transaction
});
// ---------|| E N D - O U R - S K I L L S - S E C T I O N  ||----------

// -------------|| S T A R T - T O P - V I D E O S - S E C T I O N  ||----------
let Videos;
let videosListElements;

async function getYoutubeAPI() {
  const Resp = await fetch("./JS/youtubeAPI.json");

  return await Resp.json();
}

// Create Video li
function createLIvideo({ title, duration }, index) {
  /*
    <li class="p-3 my-1 cursor-pointer">
      <p class="mb-1">How To Create Sub Domain</p>
      <p class="mb-0 text-muted">05:18</p>
    </li>
  */
  const li = document.createElement("li"),
    videoName = document.createElement("p"),
    videoDuration = document.createElement("p");

  li.className = "p-3 my-1 cursor-pointer";

  videoName.classList.add("mb-1");
  videoName.textContent = title;

  videoDuration.className = "mb-0 text-muted";
  videoDuration.textContent = duration;

  li.append(videoName, videoDuration);

  li.addEventListener("click", (_) => {
    addClassActive(li); // add class Active
    showVedio(Videos[index]);
  });

  return li;
}

// Show Video Function
function showVedio({ details, dateOfPub, views, videoLink }) {
  // Add Source To Iframe Object
  window["iframe-video"].setAttribute("src", videoLink);

  // set Video Name textContent & title Attr
  window["video-name"].textContent = details;
  window["video-name"].setAttribute("title", details);

  // set video Views Number
  window["video-views"].textContent = views;

  // set Video Publish Date
  window["video-date"].textContent = dateOfPub;
}

// Show Videos List
(async function () {
  Videos = await getYoutubeAPI();

  const VideosFragment = document.createDocumentFragment();
  Videos.forEach((video, index) => {
    VideosFragment.appendChild(createLIvideo(video, index));
  })
  videosList.append(VideosFragment);
  // take copy of all List Videos Element
  videosListElements = Array.from(videosList.children)
  // By Default show First Video
  showVedio(Videos[0]);
  addClassActive(videosListElements[0]); // Add Active Class To first Element
})();

// add Class Active And remove it from it's siblings 
function addClassActive(li) {
  // Remove Class [active-video] From All Element
  videosListElements.forEach(liEl => liEl.classList.remove('active-video'));

  // Add it on target video
  li.classList.add('active-video');
}

// Shuffle Btn, Random Video
randomVideo.addEventListener('click', e => {
  // get random number
  let randomNum = Math.floor(Math.random() * Videos.length);

  showVedio(Videos[randomNum]); // show Video that We Got [randomNum];

  // add Class Active To li Of That Video
  addClassActive(videosListElements[randomNum]);
})
// -------------|| E N D - T O P - V I D E O S - S E C T I O N  ||----------

// -------------|| S T A R T - O U R - S T A T E - S E C T I O N  ||----------
let counterFields = Array.from(document.querySelectorAll('#our-state .state-count')),
  intervalIDs = [-1, -1, -1, -1], // hold intervals Id Of All Fields
  stateSec = false;

window.addEventListener("scroll", (e) => {
  // if Scroll be in scope of our section do transaction
  if (
    window.scrollY >= window["our-state"].offsetTop - 180 &&
    window.scrollY <=
    window["our-state"].clientHeight + window["our-state"].offsetTop + 160
  ) {
    !stateSec && startState();
    stateSec = true;

  } else {
    // if go out of our scope Reset Fields
    stateSec && resetState();
    stateSec = false;
  }
});


// Start State Couner function
function startState() {

  counterFields.forEach((field, index) => {

    let targetNum = field.getAttribute('data-value');

    intervalIDs[index] = setInterval(_ => {
      if (field.textContent == targetNum) {
        clearInterval(intervalIDs[index]); // Stop Interval of this fields
        return;
      }
      // increase textContent 
      ++field.textContent;
    }, 2000 / targetNum)
  })
}

// Reset Fields of State
function resetState() {
  counterFields.forEach(field => field.textContent = 0);
}
// -------------|| E N D - O U R - S T A T E - S E C T I O N  ||----------
