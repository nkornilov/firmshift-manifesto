function appendSign (options) {
  $(options.region).append(options.char)
}

function animation () {
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
  var i = 0;
  var intervalId = setInterval(function () {
    if (i === manifestos[0].text.length) {
      clearInterval(intervalId)
    } else {
      appendSign({
        region: ".js-hc-container",
        char: manifestos[0].text[i++]
      })
    }
  }, 140)
}
