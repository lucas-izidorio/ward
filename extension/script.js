document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("btn").addEventListener('click', () => {
    console.log("DOM carregado!");

    var text = document.getElementById('ward-input-apikey').value;

    var msg = document.getElementById('feedback-registro');

    console.log(msg);

    //msg.style.color = "blue;";
    msg.setAttribute("style", "display: block;")

    chrome.storage.sync.set({ 'apiKey': text }, function () {
      console.log('Settings saved');
    });

    /*function modifyDOM() {

      console.log('teste');

      console.log(text);

      return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();'
    }, (results) => {
      console.log('Script: ')
      console.log(results[0]);
    });*/
  });

})