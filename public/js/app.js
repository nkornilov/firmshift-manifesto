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

  var screenIndex = 0;
  //
  // dynamic_manifesto({
  //   region: '.js-dynamic-container',
  //   charArrayFromText: manifestos[screenIndex].text.capitalize()
  // });
  //
  // static_manifesto({
  //   region: ".js-static-container",
  //   text: manifestos[screenIndex].text
  // });

  astronomy_manifesto({
    region: ".js-hc-container"
  });

  $("body").on('click', function () {
    // screenIndex++;
    // if (screenIndex > manifestos.length - 1) screenIndex = 0;
    // dynamic_manifesto({
    //   region: '.js-dynamic-container',
    //   charArrayFromText: manifestos[screenIndex].text.capitalize()
    // });
    //
    // static_manifesto({
    //   region: ".js-static-container",
    //   text: manifestos[screenIndex].text
    // });

    astronomy_manifesto({
      region: ".js-hc-container"
    });
  })




});