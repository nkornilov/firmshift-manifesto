document.addEventListener("DOMContentLoaded", function () {

  var manifestos = [
    {
      text: "Use astronomy to make your move in music industry"
    },
    {
      text: "from online insuring to a sure thing"
    },
    {
      text: "from big pharma to modern farming"
    },
    {
      text: "to be on top in banking you need a super computer and a wizkid"
    }
  ];

  var manifestoIndex = 0;
  runManifesto(manifestos[manifestoIndex++].text.split(" "));

  $("body").on("click", function () {
    if (manifestoIndex == manifestos.length) manifestoIndex = 0;
    runManifesto(manifestos[manifestoIndex++].text.split(" "))
  });

});

function runManifesto (manifesto) {
  astronomy_v2({
    region: ".js-animation-container",
    text: manifesto
  });
}