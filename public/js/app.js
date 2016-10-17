document.addEventListener("DOMContentLoaded", function () {

  runManifestoV3();

  var timerId;
  window.onresize = function(){
    clearTimeout(timerId);
    timerId = setTimeout(runManifestoV3, 300);
  };

});

function runManifestoV3 () {
  astronomy_v3({
    region: ".js-container",
    text: [
      ["We", "create", "meaningful"],
      ["data-driven", "user", "experiences"],
      ["using", "advanced", "technology"],
      ["data", "science", "and", "art"],
    ],
    styles: {
      "font-size": "48px"
    },
    dotRadius: 5
  });
}
