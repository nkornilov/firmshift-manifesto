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

  $("body").on('click', function () {

    astronomy_manifesto_v2({
      region: ".js-static-container"
    });

  })

});