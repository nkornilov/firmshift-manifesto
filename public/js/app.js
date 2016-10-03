document.addEventListener("DOMContentLoaded", function () {

  var manifestos = [
    {
      text: "Use astronomy to make your move in music industry"
    },
    {
      text: "From online insuring to a sure thing"
    },
    {
      text: "From big pharma to modern farming"
    },
    {
      text: "To be on top in banking you need a super computer and a wizkid"
    },
    {
      text: "We create meaningful data-driven user experience using advanced technology data science and art"
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
    text: [
      ["We", "create", "meaningful"],
      ["data-driven", "user", "experience"],
      ["using", "advanced", "technology"],
      ["data", "science", "and", "art"],
    ],
    styles: {
      "font-size": "42px"
    },
    dotRadius: 4
  });
}