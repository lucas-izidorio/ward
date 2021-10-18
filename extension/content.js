window.onload = function () {

  var srcList = [];
  var pos = 0;

  const getImages = () => {
    var images = document.getElementsByTagName('img');

    for (var i = pos; i < images.length; i++) {
      srcList.push(images[i]);
    };

    pos = images.length;

    srcList.map(function (foto, index) {
      sendJSON(foto.src, index, foto);
    });

    //Muda o atributo alt da tag img
    function changeAlt(caption, index) {
      srcList[index].alt = srcList[index].alt + ' ' + caption;
    }

    //Função para request na API
    function sendJSON(imageSrc, index, foto) {

      var data = {
        "url": imageSrc,
        "language": "pt"
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
      xhr.send(json);
    };
  }

  getImages();

  /*var waiting = false;

  window.onscroll = function () {
    if (waiting) {
      return;
    }
    waiting = true;

    //getImages();

    setTimeout(function () {
      waiting = false;
    }, 2000);

  };*/
}