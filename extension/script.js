document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("button-test").addEventListener('click', () => {
    console.log("DOM carregado!");

    function modifyDOM() {

      var images = document.getElementsByTagName('img');
      var srcList = [];
      for (var i = 0; i < images.length; i++) {
        srcList.push(images[i]);
      };

      srcList.map(function (foto, index) {
        sendJSON(foto.src, index);
      });

      //Muda o atributo alt da tag img
      function changeAlt(caption, index) {
        srcList[index].alt = caption;
      }

      //Função para request na API
      function sendJSON(imageSrc, index) {
        console.log(imageSrc, index);

        var data = {
          "url": imageSrc,
          "language": "pt"
        }

        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://1dcf-2804-7f2-2990-e53b-cd0e-fb0f-2f86-6cb.ngrok.io/images/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
          var jsonResponse = JSON.parse(xhr.responseText);
          changeAlt(jsonResponse.caption, index);
        };
        xhr.send(json);
      };

      return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();'
    }, (results) => {

      console.log('Script: ')
      console.log(results[0]);
    });
  });

  const button = document.getElementById('button-test');
  button.click();
})