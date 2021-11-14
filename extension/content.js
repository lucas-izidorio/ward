window.onload = function () {

  var apikey;

  chrome.storage.sync.get(['apiKey'], function (items) {
    apikey = items;

    var srcList = [];
    var pos = 0;

    //Função para request na API
    function sendJSON(imageSrc, index, foto) {

      //console.log(imageSrc);

      /*var data = {
        "url": imageSrc,
        "language": "pt",
        "key": apikey.apiKey
      }

      var json = JSON.stringify(data);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:3000/images/');
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        var jsonResponse = JSON.parse(xhr.responseText);
        changeAlt(jsonResponse.caption, index);
        console.log(imageSrc, index);
        console.log(jsonResponse.caption);
      };
      xhr.send(json);*/
    };

    const twitterCheck = (imageSrc, index, foto) => {
      if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
        sendJSON(imageSrc, index, foto);
      }
    }

    const facebookCheck = (imageSrc, index, foto) => {
      if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
        sendJSON(imageSrc, index, foto);
      }
    }

    const instagramCheck = (imageSrc, index, foto) => {
      if (foto.offsetWidth > 64 && foto.offsetHeight > 64) {
        sendJSON(imageSrc, index, foto);
      }
    }

    const regularCheck = (imageSrc, index, foto) => {

    }

    const getImages = () => {
      var images = document.getElementsByTagName('img');


      for (var i = pos; i < images.length; i++) {
        srcList.push(images[i]);
      };

      pos = images.length;

      srcList.map(function (foto, index) {
        if (window.location.href.includes('instagram.com')) {
          instagramCheck(foto.src, index, foto);
        } else if (window.location.href.includes('twitter.com')) {
          twitterCheck(foto.src, index, foto);
        } else if (window.location.href.includes('facebook.com')) {
          facebookCheck(foto.src, index, foto);
        } else {
          regularCheck(foto.src, index, foto);
        }
      });

      /*

      //Muda o atributo alt da tag img
      function changeAlt(caption, index) {
        srcList[index].alt = srcList[index].alt + ' ' + caption;
      }*/
    }

    const getNewImages = () => {
      var newList = [];

      var images = document.getElementsByTagName('img');

      console.log(srcList.length);
      console.log(images.length);

      if (images.length > srcList.length) {
        for (var i = srcList.length; i < images.length; i++) {
          newList.push(images[i]);
        };

        console.log(newList);

        newList.map(function (foto, index) {
          if (window.location.href.includes('instagram.com')) {
            instagramCheck(foto.src, index, foto);
          } else if (window.location.href.includes('twitter.com')) {
            twitterCheck(foto.src, index, foto);
          } else if (window.location.href.includes('facebook.com')) {
            facebookCheck(foto.src, index, foto);
          } else {
            regularCheck(foto.src, index, foto);
          }
        });

        srcList = [];

        for (var i = 0; i < images.length; i++) {
          srcList.push(images[i]);
        };

        console.log(srcList);
      }
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

      getNewImages();

      setTimeout(function () {
        waiting = false;
      }, 2000);

    };
  });
}