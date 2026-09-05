/* =====================================================
   HAYTAM + IMAN ❤️
   script.js
===================================================== */


/* =====================================================
   CONFIG
===================================================== */

// Cheb Bilal - Mi Amour
const YOUTUBE_VIDEO_ID = "crRuPbc3Rdo";


/* =====================================================
   ELEMENTS
===================================================== */

const welcomePage = document.getElementById("welcomePage");
const giftPage = document.getElementById("giftPage");

const fingerprintButton =
    document.getElementById("fingerprintButton");

const musicButton =
    document.getElementById("musicButton");

const heartsContainer =
    document.getElementById("heartsContainer");

const giftBox =
    document.getElementById("giftBox");

const messageSection =
    document.getElementById("messageSection");

const mainPhoto =
    document.getElementById("mainPhoto");

const photoCounter =
    document.getElementById("photoCounter");

const thumbnails =
    document.querySelectorAll(".thumbnail");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const fullscreenButton =
    document.getElementById("fullscreenButton");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const closeLightbox =
    document.getElementById("closeLightbox");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


/* =====================================================
   YOUTUBE MUSIC
===================================================== */

let youtubePlayer = null;
let youtubeReady = false;
let musicPlaying = false;
let musicRequested = false;


/*
   YouTube API calls this function automatically
   when the API has finished loading.
*/

window.onYouTubeIframeAPIReady = function () {

    youtubePlayer = new YT.Player(
        "youtubePlayer",
        {
            /*
               YouTube requires the embedded player
               to have a viewport of at least 200x200.
            */
            height: "200",
            width: "200",

            videoId: YOUTUBE_VIDEO_ID,

            playerVars: {
                autoplay: 1,
                controls: 0,
                loop: 1,
                playlist: YOUTUBE_VIDEO_ID,
                playsinline: 1,
                rel: 0,
                modestbranding: 1
            },

            events: {

                /* ---------------------------------
                   PLAYER READY
                --------------------------------- */

                onReady: function (event) {

                    youtubeReady = true;

                    event.target.unMute();
                    event.target.setVolume(45);

                    /*
                       Try to start automatically.
                    */
                    try {
                        event.target.playVideo();
                    } catch (error) {
                        console.log(
                            "Autoplay waiting for user interaction."
                        );
                    }

                    /*
                       If the user interacted before
                       YouTube finished loading, start music now.
                    */
                    if (musicRequested) {
                        playMusic();
                    }
                },


                /* ---------------------------------
                   PLAYER STATE
                --------------------------------- */

                onStateChange: function (event) {

                    if (
                        event.data ===
                        YT.PlayerState.PLAYING
                    ) {

                        musicPlaying = true;

                        if (musicButton) {
                            musicButton.textContent = "🔊";
                            musicButton.classList.add("playing");
                        }
                    }


                    else if (
                        event.data ===
                        YT.PlayerState.PAUSED
                    ) {

                        musicPlaying = false;

                        if (musicButton) {
                            musicButton.textContent = "🔇";
                            musicButton.classList.remove("playing");
                        }
                    }


                    else if (
                        event.data ===
                        YT.PlayerState.ENDED
                    ) {

                        /*
                           Backup loop.
                        */

                        event.target.seekTo(0);
                        event.target.playVideo();
                    }
                },


                /* ---------------------------------
                   AUTOPLAY BLOCKED
                --------------------------------- */

                onAutoplayBlocked: function () {

                    musicPlaying = false;

                    if (musicButton) {
                        musicButton.textContent = "▶️";
                    }

                    console.log(
                        "YouTube autoplay was blocked."
                    );
                },


                /* ---------------------------------
                   ERROR
                --------------------------------- */

                onError: function (event) {

                    console.error(
                        "YouTube error:",
                        event.data
                    );

                    if (musicButton) {
                        musicButton.textContent = "⚠️";
                    }
                }
            }
        }
    );
};


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic() {

    musicRequested = true;

    if (!youtubeReady || !youtubePlayer) {
        return;
    }

    try {

        youtubePlayer.unMute();

        youtubePlayer.setVolume(45);

        youtubePlayer.playVideo();

    } catch (error) {

        console.error(
            "Music could not start:",
            error
        );
    }
}


/* =====================================================
   PAUSE MUSIC
===================================================== */

function pauseMusic() {

    if (!youtubeReady || !youtubePlayer) {
        return;
    }

    try {

        youtubePlayer.pauseVideo();

    } catch (error) {

        console.error(error);
    }
}


/* =====================================================
   AUTOMATIC MUSIC START
===================================================== */

/*
   Try to start music automatically as soon
   as the page is loaded.
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        musicRequested = true;

        if (youtubeReady && youtubePlayer) {
            playMusic();
        }
    }
);


/*
   Modern browsers may block autoplay with sound.

   In that case, the first click/touch anywhere
   on the page will start the music automatically.
*/

function startMusicAfterInteraction() {

    if (!youtubePlayer || !youtubeReady) {
        musicRequested = true;
        return;
    }

    if (musicPlaying) {
        return;
    }

    try {

        musicRequested = true;

        youtubePlayer.unMute();
        youtubePlayer.setVolume(45);
        youtubePlayer.playVideo();

    } catch (error) {

        console.log(
            "Music waiting for browser permission."
        );
    }
}


/*
   First click anywhere.
*/

document.addEventListener(
    "click",
    startMusicAfterInteraction,
    {
        once: true,
        passive: true
    }
);


/*
   First touch anywhere on mobile.
*/

document.addEventListener(
    "touchstart",
    startMusicAfterInteraction,
    {
        once: true,
        passive: true
    }
);


/* =====================================================
   FINGERPRINT
===================================================== */

if (fingerprintButton) {

    fingerprintButton.addEventListener(
        "click",
        function () {

            /*
               Music starts directly from
               the user's fingerprint click.
            */

            musicRequested = true;

            playMusic();


            /*
               Fingerprint animation
            */

            fingerprintButton.classList.add("scanning");


            /*
               Create heart explosion
            */

            createHeartBurst();


            /*
               Transition to second page
            */

            setTimeout(function () {

                welcomePage.classList.remove("active");

            }, 250);


            setTimeout(function () {

                giftPage.classList.add("active");

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 850);
        }
    );
}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        function (event) {

            /*
               Prevent this click from being treated
               as a generic autoplay-start click.
            */

            event.stopPropagation();


            if (!youtubeReady) {

                musicRequested = true;

                playMusic();

                return;
            }


            if (musicPlaying) {

                pauseMusic();

            } else {

                playMusic();
            }
        }
    );
}


/* =====================================================
   GIFT BOX
===================================================== */

if (giftBox) {

    giftBox.addEventListener(
        "click",
        function () {

            if (
                giftBox.classList.contains("opened")
            ) {
                return;
            }


            /*
               Open box
            */

            giftBox.classList.add("opened");


            /*
               Hearts
            */

            createHeartBurst();


            /*
               Show message
            */

            setTimeout(function () {

                if (messageSection) {

                    messageSection.classList.add("show");
                }

            }, 650);
        }
    );
}


/* =====================================================
   GALLERY
===================================================== */

const photos = [

    "https://i.postimg.cc/Hng9yC88/A0CC6B75-902C-499F-A4D5-A922D40D7865.png",

    "https://i.postimg.cc/mDQQR6ps/84d3a351-5866-4c89-b44b-b87057545a0e.jpg",

    "https://i.postimg.cc/JzGZthYN/BD7D9284-3B39-475B-AD5F-3F2F720456EE.png",

    "https://i.postimg.cc/dVkZwxDx/dc290659-d99b-420b-b778-07ac76f30a89.jpg"

];

let currentPhoto = 0;


/* =====================================================
   UPDATE GALLERY
===================================================== */

function updateGallery(index) {

    if (index < 0) {
        index = photos.length - 1;
    }

    if (index >= photos.length) {
        index = 0;
    }

    currentPhoto = index;


    /*
       Image transition
    */

    if (mainPhoto) {

        mainPhoto.classList.add("changing");

        setTimeout(function () {

            mainPhoto.src =
                photos[currentPhoto];

            mainPhoto.classList.remove("changing");

        }, 150);
    }


    /*
       Counter
    */

    if (photoCounter) {

        photoCounter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;
    }


    /*
       Active thumbnail
    */

    thumbnails.forEach(
        function (thumbnail, index) {

            thumbnail.classList.toggle(
                "active",
                index === currentPhoto
            );
        }
    );
}


/* =====================================================
   NEXT PHOTO
===================================================== */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            updateGallery(
                currentPhoto + 1
            );
        }
    );
}


/* =====================================================
   PREVIOUS PHOTO
===================================================== */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        function () {

            updateGallery(
                currentPhoto - 1
            );
        }
    );
}


/* =====================================================
   THUMBNAILS
===================================================== */

thumbnails.forEach(
    function (thumbnail) {

        thumbnail.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        thumbnail.dataset.index
                    );

                updateGallery(index);
            }
        );
    }
);


/* =====================================================
   LIGHTBOX
===================================================== */

function openLightbox() {

    if (!lightbox || !lightboxImage) {
        return;
    }


    lightboxImage.src =
        photos[currentPhoto];


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;
    }


    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightboxFunction() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("open");

    document.body.style.overflow = "";
}


/* =====================================================
   UPDATE LIGHTBOX
===================================================== */

function updateLightbox(index) {

    if (index < 0) {
        index = photos.length - 1;
    }

    if (index >= photos.length) {
        index = 0;
    }

    currentPhoto = index;


    if (lightboxImage) {

        lightboxImage.src =
            photos[currentPhoto];
    }


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;
    }


    updateGallery(currentPhoto);
}


/* =====================================================
   FULLSCREEN
===================================================== */

if (fullscreenButton) {

    fullscreenButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openLightbox();
        }
    );
}


/* =====================================================
   CLICK PHOTO
===================================================== */

if (mainPhoto) {

    mainPhoto.addEventListener(
        "click",
        function () {

            openLightbox();
        }
    );
}


/* =====================================================
   LIGHTBOX BUTTONS
===================================================== */

if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeLightboxFunction
    );
}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        function () {

            updateLightbox(
                currentPhoto - 1
            );
        }
    );
}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        function () {

            updateLightbox(
                currentPhoto + 1
            );
        }
    );
}


/* =====================================================
   CLOSE LIGHTBOX BACKGROUND
===================================================== */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightboxFunction();
            }
        }
    );
}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox ||
            !lightbox.classList.contains("open")
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightboxFunction();
        }


        if (event.key === "ArrowRight") {

            updateLightbox(
                currentPhoto + 1
            );
        }


        if (event.key === "ArrowLeft") {

            updateLightbox(
                currentPhoto - 1
            );
        }
    }
);


/* =====================================================
   MOBILE SWIPE — LIGHTBOX
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );
}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference > 0) {

        updateLightbox(
            currentPhoto + 1
        );

    } else {

        updateLightbox(
            currentPhoto - 1
        );
    }
}


/* =====================================================
   MOBILE SWIPE — MAIN GALLERY
===================================================== */

let galleryStartX = 0;


if (mainPhoto) {

    mainPhoto.addEventListener(
        "touchstart",
        function (event) {

            galleryStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    mainPhoto.addEventListener(
        "touchend",
        function (event) {

            const endX =
                event.changedTouches[0].screenX;


            const difference =
                galleryStartX - endX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                updateGallery(
                    currentPhoto + 1
                );

            } else {

                updateGallery(
                    currentPhoto - 1
                );
            }

        },
        {
            passive: true
        }
    );
}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHeart() {

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement("span");


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    /*
       Random horizontal position
    */

    heart.style.left =
        `${Math.random() * 100}%`;


    /*
       Random size
    */

    heart.style.fontSize =
        `${10 + Math.random() * 14}px`;


    /*
       Random speed
    */

    const duration =
        6 + Math.random() * 6;


    heart.style.animationDuration =
        `${duration}s`;


    heartsContainer.appendChild(heart);


    /*
       Remove after animation
    */

    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000
    );
}


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

    for (let i = 0; i < 14; i++) {

        setTimeout(
            createFloatingHeart,
            i * 100
        );
    }
}


/* =====================================================
   CONTINUOUS HEARTS
===================================================== */

setInterval(
    createFloatingHeart,
    1400
);


/* =====================================================
   PRELOAD IMAGES
===================================================== */

photos.forEach(
    function (src) {

        const image =
            new Image();

        image.src = src;
    }
);