document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("button-test").addEventListener('click', () => {
    console.log("DOM carregado!");

    function modifyDOM() {
      //Pega todas as imagens do DOM pela tag IMG
      var images = document.getElementsByTagName('img');
      var srcList = [];
      for (var i = 0; i < images.length; i++) {
        srcList.push(images[i].src);
      }
      srcList.map(function (foto) {
        console.log(foto);
      })
      return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();'
    }, (results) => {

      console.log('Script: ')
      console.log(results[0]);
    });
  });
})