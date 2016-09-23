var text = [
  'Use astronomy',
  "to make your",
  "move in the music",
  "industry"
];

function astronomy_manifesto(options) {
  var nodes = [
    { y: 108, x: 152, id: 0 },
    { y: 108, x: 577, id: 1 },
    { y: 183, x: 90, id: 2 },
    { y: 183, x: 320, id: 3 },
    { y: 183, x: 509, id: 4 },
    { y: 258, x: 219, id: 5 },
    { y: 258, x: 314, id: 6 },
    { y: 258, x: 457, id: 7 },
    { y: 258, x: 700, id: 8 },
    { y: 334, x: 312, id: 9 }
  ];

  $(options.region).empty();
  window.isAnimating = true;
  $("body").addClass("isAnimating");

  appendNodesAndDrawPath({
    nodes: nodes,
    region: options.region
  });

  appendArrayOfStrings({
    text: text,
    region: options.region
  });

  setTimeout(function () {
    $("body").removeClass("isAnimating");
    window.isAnimating = false;
  }, 4000);
}

var letterAppendingSpeed = 85;
var durationForCreate = letterAppendingSpeed*5.12;

function appendArrayOfStrings(options) {
  var j = 0;
  var i = 0;

  $(options.region).append(generateString("ui-string js-string-" + j));

  var intervalId = setInterval(function () {
    var char = options.text[j][i++];

    $(".js-string-" + j).append(generateCharTemplate(char))

    if (i == (options.text[j].length)) {
      i = 0;
      j++;
      if (j == options.text.length) {
        clearInterval(intervalId);
      } else {
        $(options.region).append(generateString("ui-string js-string-" + j))
      }
    }

  }, letterAppendingSpeed);
}

function generateString(className) {
  return '<div class="' + className + '"></div>';
}

function appendNodesAndDrawPath(options) {
  var svg = d3.select(options.region).append("svg:svg")
    .attr("class", "ui-svg-container");
  
  var svgGroup = svg.append("svg:g");

  var i = 0;
  var intervalId = setInterval(function () {
    svgGroup.append("circle")
      .attr("class", "ui-node-svg")
      .attr("cx", options.nodes[i].x)
      .attr("cy", options.nodes[i].y)
      .attr("r", 7);

    if (i == 1) firstAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 3) secondAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 4) thirdAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 6) fourthAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 7) fifthAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 8) sixthAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 9) seventhAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    if (i == 10) eighthAnimation({ nodes: options.nodes, svgGroup: svgGroup });
    i++;

    if (i == options.nodes.length) {
      clearInterval(intervalId);
    }
  }, durationForCreate);
}

function firstAnimation (options) {
  appendLineAstronomy(options.nodes[0], options.nodes[1], options.svgGroup, durationForCreate );
}

function secondAnimation (options) {
  appendLineAstronomy(options.nodes[2], options.nodes[0], options.svgGroup, durationForCreate );
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[2], options.nodes[1], durationForCreate)
}

function thirdAnimation (options) {
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[3], options.nodes[1], durationForCreate);
  updateLine(".s" + options.nodes[2].id + ".t" + options.nodes[0].id, options.nodes[3], options.nodes[0], durationForCreate);
  appendLineAstronomy(options.nodes[1], options.nodes[2], options.svgGroup, durationForCreate );
}

function fourthAnimation (options) {
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[5], options.nodes[1], durationForCreate);
  updateLine(".s" + options.nodes[2].id + ".t" + options.nodes[0].id, options.nodes[5], options.nodes[0], durationForCreate);
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[2].id, options.nodes[5], options.nodes[2], durationForCreate);
  appendLineAstronomy(options.nodes[0], options.nodes[3], options.svgGroup, durationForCreate );
  appendLineAstronomy(options.nodes[0], options.nodes[4], options.svgGroup, durationForCreate );
}

function fifthAnimation (options) {
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[6], options.nodes[1], durationForCreate);
  updateLine(".s" + options.nodes[2].id + ".t" + options.nodes[0].id, options.nodes[6], options.nodes[0], durationForCreate);
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[2].id, options.nodes[6], options.nodes[2], durationForCreate);

  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[3].id, options.nodes[5], options.nodes[3], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[4].id, options.nodes[5], options.nodes[4], durationForCreate);
  appendLineAstronomy(options.nodes[0], options.nodes[5], options.svgGroup, durationForCreate );

}

function sixthAnimation (options) {
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[2], options.nodes[1], durationForCreate);
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[2].id, options.nodes[2], options.nodes[5], durationForCreate);

  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[3].id, options.nodes[7], options.nodes[3], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[4].id, options.nodes[7], options.nodes[4], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[5].id, options.nodes[0], options.nodes[3], durationForCreate);
}

function seventhAnimation (options) {
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[5].id, options.nodes[0], options.nodes[5], durationForCreate);
  updateLine(".s" + options.nodes[2].id + ".t" + options.nodes[0].id, options.nodes[2], options.nodes[0], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[3].id, options.nodes[5], options.nodes[3], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[4].id, options.nodes[5], options.nodes[4], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[4].id, options.nodes[5], options.nodes[6], durationForCreate);

  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[4], options.nodes[1], durationForCreate);
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[2].id, options.nodes[7], options.nodes[4], durationForCreate);
  appendLineAstronomy(options.nodes[1], options.nodes[8], options.svgGroup, durationForCreate );

}

function eighthAnimation (options) {
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[2].id, options.nodes[6], options.nodes[2], durationForCreate);
  updateLine(".s" + options.nodes[1].id + ".t" + options.nodes[8].id, options.nodes[1], options.nodes[4], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[1].id, options.nodes[2], options.nodes[1], durationForCreate);

  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[5].id, options.nodes[3], options.nodes[8], durationForCreate);
  updateLine(".s" + options.nodes[2].id + ".t" + options.nodes[0].id, options.nodes[3], options.nodes[0], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[3].id, options.nodes[9], options.nodes[5], durationForCreate);
  updateLine(".s" + options.nodes[0].id + ".t" + options.nodes[4].id, options.nodes[9], options.nodes[7], durationForCreate);
}

function appendLineAstronomy(source, target, svgGroup, duration) {
  var dStart = ["M", source.x, source.y, "L", source.x, source.y].join(" ");
  var d = ["M", source.x, source.y, "L", target.x, target.y].join(" ");
  svgGroup.append("path")
    .attr("class", "ui-path-svg " + "s" + source.id + " t" + target.id)
    .attr("d", dStart)
    .transition()
    .duration(duration)
    .attr("d", d);
}

function updateLine(selector, source, target, duration) {
  var d = ["M", source.x, source.y, "L", target.x, target.y].join(" ");
  d3.select(selector)
    .transition()
    .duration(duration)
    .attr("d", d);
}