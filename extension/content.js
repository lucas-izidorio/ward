window.onload = function () {

    var apikey;

    chrome.storage.sync.get(['apiKey'], function (item) {
        apikey = item;

        var imagens = new Map();

        //Função para request na API
        function sendJSON(imageSrc, useGoogleVision) {
            var data = {
                "url": imageSrc,
                "language": "pt",
                "key": apikey.apiKey,
                "vision": useGoogleVision,
                "caption": imagens.get(imageSrc).alt
            }

            var json = JSON.stringify(data);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:3000/images/');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                var jsonResponse = JSON.parse(xhr.responseText);
                changeAlt(jsonResponse.caption, imageSrc);
            };
            xhr.send(json);
        };

        function changeAlt(caption, imageSrc) {
            imagens.get(imageSrc).alt = caption;
        }

        const twitterCheck = (imageSrc, foto) => {
            var useGoogleVision = true;
            if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
                if (foto.alt === undefined || foto.alt === '') {
                    useGoogleVision = false;
                }
                sendJSON(imageSrc, useGoogleVision);
            }
        }

        const facebookCheck = (imageSrc, foto) => {
            var useGoogleVision = true;
            if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
                if (foto.alt === undefined || foto.alt === '') {
                    useGoogleVision = false;
                }
                sendJSON(imageSrc, useGoogleVision);
            }
        }

        const instagramCheck = (imageSrc, foto) => {
            var useGoogleVision = true;
            if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
                if (foto.alt !== undefined && foto.alt !== '' && foto.alt !== null && foto.alt.includes('May be an image')) {
                    useGoogleVision = false;
                }
                sendJSON(imageSrc, useGoogleVision);
            }
        }

        const regularCheck = (imageSrc, foto) => {
            var useGoogleVision = true;
            if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
                if (foto.alt === undefined || foto.alt === '') {
                    useGoogleVision = false;
                }
                sendJSON(imageSrc, useGoogleVision);
            }
        }

        const getImages = () => {
            var images = document.getElementsByTagName('img');

            for (var i = 0; i < images.length; i++) {
                var img = images[i];
                if (!imagens.has(img.src)) {
                    imagens.set(img.src, img);
                    if (window.location.href.includes('instagram.com')) {
                        instagramCheck(img.src, img);
                    } else if (window.location.href.includes('twitter.com')) {
                        twitterCheck(img.src, img);
                    } else if (window.location.href.includes('facebook.com')) {
                        facebookCheck(img.src, img);
                    } else {
                        regularCheck(img.src, img);
                    }
                }
            };
        }

        var waiting = true;

        setTimeout(function () {
            getImages();
            setTimeout(function () {
                waiting = false;
            }, 1000);
        }, 4000);

        window.onscroll = function () {
            if (waiting) {
                return;
            }
            waiting = true;

            getImages();

            setTimeout(function () {
                waiting = false;
            }, 2000);
        };
    });
}