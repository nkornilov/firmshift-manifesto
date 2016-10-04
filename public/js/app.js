document.addEventListener("DOMContentLoaded", function () {

  runManifesto();

  $(window).resize(_.throttle(runManifesto, 250));
});

function runManifesto () {
  astronomy_v2({
    region: ".js-animation-container",
    text: [
      ["We", "create", "meaningful"],
      ["data-driven", "user", "experiences"],
      ["using", "advanced", "technology"],
      ["data", "science", "and", "art"],
    ],
    styles: {
      "font-size": "52px"
    },
    dotRadius: 5
  });
}

