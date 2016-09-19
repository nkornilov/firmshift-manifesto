document.addEventListener("DOMContentLoaded", function () {

  var manifestos = [
    {
      text: "use astronomy to make your move in music industry"
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

  astronomy_manifesto({
    region: ".js-hc-container"
  });

  $("body").on('click', function () {
    if (window.isAnimating) return false;

    astronomy_manifesto({
      region: ".js-hc-container"
    });
  })




});