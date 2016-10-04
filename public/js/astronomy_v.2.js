var global = {
  animationIntervalId: null,
  dotRadius: 7,
  nodes: []
};

var specificNodes = {
  normal: [
    {
      id: 100000,
      x: 24,
      y: 17
    },
    {
      id: 100001,
      x: 154,
      y: 62
    }
  ],
  small: [{
      id: 100000,
      x: 12,
      y: 8
    },
    {
      id: 100001,
      x: 77,
      y: 32
    }]
};


function astronomy_v2(options) {
  if ($(window).width() < 700) {
    global.dotRadius = 3;
    global.nodes = specificNodes.small;
  } else {
    global.dotRadius = options.dotRadius;
    global.nodes = specificNodes.normal;
  }

  if (global.animationIntervalId) clearInterval(global.animationIntervalId);

  var $textRegion = $(".js-animation-phrase");
  var $svgRegion = $(".js-animation-wrap");

  if ($textRegion.length == 0) {
    $(options.region).append("<div class='js-animation-phrase'></div>");
  } else {
    $textRegion.empty();
  }

  if ($svgRegion.length == 0) {
    $(options.region).append("<div class='js-animation-wrap'></div>");
  } else {
    $svgRegion.empty();
  }

  $(options.region).addClass("ui-animation-container");
  $(options.region).css(options.styles);

  options.textRegion = ".js-animation-phrase";
  options.svgRegion = ".js-animation-wrap";

  animateWordsFadeIn(options).then(function (nodes) {
    appendNodesAndDrawPath({
      nodes: nodes,
      region: options.svgRegion
    })
  }, null);
}


function animateWordsFadeIn(options) {
  return new Promise(function (resolve, reject) {
    appendArrayOfStrings(options).then(function (nodes) {
      var $words = $(".js-word");
      $words.animate({opacity: 1}, 300);
      resolve(nodes);
    });
  });
}

function appendArrayOfStrings(options) {
  return new Promise(function (resolve, reject) {
    var nodes = _.clone(global.nodes);
    var index = 0;
    _.each(options.text, function (phrase, j) {
      $(options.textRegion).append(getStringTemplate(j));
      var $currentString = $(".js-string-" + j);
      _.each(phrase, function (word, i) {
        index++;
        var className = Math.random() > 0.5 ? "ui-upper" : "";
        $currentString.append(getWordTemplate(className, word));
        $currentString.append(getNodeTemplate("js-node-" + index));
        let $currentNode = $(".js-node-" + index);
        $currentNode.css({
          width: global.dotRadius * 2,
          height: global.dotRadius * 2
        });


        nodes.push({
          x: $currentNode[0].offsetLeft + global.dotRadius,
          y: $currentNode[0].offsetTop + global.dotRadius,
          id: index
        })
      });
    });
    resolve(nodes);
  })
}

function appendPureText(options) {
  return new Promise(function (resolve, reject) {
    var nodes = _.clone(global.nodes);
    var index = 0;
    _.each(options.text, function (word, i) {
      index++;
      var className = Math.random() > 0.5 ? "ui-upper" : "";
      $(options.textRegion).append(getWordTemplate(className, word));
      $(options.textRegion).append(getNodeTemplate("js-node-" + index));
      let $currentNode = $(".js-node-" + index);
      $currentNode.css({
        width: global.dotRadius * 2,
        height: global.dotRadius * 2
      });
      nodes.push({
        x: $currentNode[0].offsetLeft + global.dotRadius,
        y: $currentNode[0].offsetTop + global.dotRadius,
        id: index
      })
    });
    resolve(nodes);
  })
}

function getNodeTemplate(className) {
  return '<div class="ui-node js-node ' + className + '"></div>';
}

function getWordTemplate(className, word) {
  return '<span class="ui-word js-word ' + className + '">' + word + '</span>';
}

function getStringTemplate(i) {
  return '<div class="ui-string js-string-' + i + '"></div>';
}

var durationForCreate = 450;


function appendNodesAndDrawPath(options) {
  var svg = d3.select(options.region).append("svg:svg")
    .attr("class", "ui-svg-container");

  var svgGroup = svg.append("svg:g")
    .attr("class", "ui-svg-group");

  svgGroup.selectAll("*").remove();
  var nodes = getRandomSubArray(options.nodes);
  var newOptions = {
    region: options.region,
    nodes: nodes,
    svgGroup: svgGroup,
    dotRadius: global.dotRadius
  };

  appendRandomNodes(newOptions).then(function () {
    appendLines(newOptions);
  });

  global.animationIntervalId = setInterval(function () {
    svgGroup.selectAll("*").remove();
    var nodes = getRandomSubArray(options.nodes);
    var newOptions = {
      region: options.region,
      nodes: nodes,
      svgGroup: svgGroup,
      dotRadius: global.dotRadius
    };

    appendRandomNodes(newOptions).then(function () {
      appendLines(newOptions);
    });
  }, 6500);

}


function appendRandomNodes(options) {
  return new Promise(function (resolve, reject) {
    _.each(options.nodes, function (node, i) {
      var timeout = durationForCreate * getRandomArbitrary(1.5, 4);
      setTimeout(function () {
        options.svgGroup.append("circle")
          .attr("class", "ui-node-svg")
          .attr("cx", options.nodes[i].x)
          .attr("cy", options.nodes[i].y)
          .attr("r", 0)
          .transition()
          .duration(200)
          .attr("r", options.dotRadius || 7);
        if (i === options.nodes.length - 3) {
          resolve(options);
        }
      }, timeout);
    });

  });
}

function appendLines(options) {
  return new Promise(function (resolve, reject) {
    var appendedPaths = [];
    var iterations = 0;
    for (let i = 0; i < options.nodes.length && i >= 0; i++) {
      let source = options.nodes[i];
      let target = options.nodes[getRandomArbitaryInt(0, options.nodes.length - 1)];
      let notSameNode = source.id !== target.id;
      let notSameRow = source.y !== target.y;
      let yetNoPath = _.isUndefined(_.findWhere(appendedPaths, {source: target, target: source}));
      iterations++;

      if (iterations > options.nodes.length * 50) break;

      if (notSameNode && notSameRow) {
        appendedPaths.push({source: source, target: target});
        if (yetNoPath) {
          setTimeout(function () {
            appendLineAstronomy(source, target, options.svgGroup, durationForCreate * getRandomArbitrary(1.5, 3));
          }, durationForCreate * getRandomArbitrary(1.8, 2.6))
        }
      } else {
        i--;
      }
    }
    setTimeout(function () {
      hideLines(appendedPaths, options.svgGroup);
    }, 4500)
  })
}

function hideLines(paths, svgGroup) {
  _.each(paths, function (path) {
    hideLine(path.source, path.target, 600)
  });
  hideNodes(svgGroup, 900);
}

function hideNodes(svgGroup, duration) {
  setTimeout(function () {
    svgGroup.selectAll(".ui-node-svg")
      .transition()
      .duration(200)
      .attr("r", 0);
  }, duration)
}

function appendLineAstronomy(source, target, svgGroup, duration) {
  var dStart = ["M", source.x, source.y, "L", source.x, source.y].join(" ");
  var d = ["M", source.x, source.y, "L", target.x, target.y].join(" ");
  svgGroup.append("path")
    .attr("class", "ui-path-svg " + "s" + source.id + " t" + target.id)
    .attr("d", dStart)
    .attr("stroke-width", global.dotRadius)
    .transition()
    .duration(duration)
    .attr("d", d);
}

function hideLine(source, target, duration) {
  var d = ["M", source.x, source.y, "L", source.x, source.y].join(" ");
  var selector = ".s" + source.id + ".t" + target.id;
  d3.select(selector)
    .transition()
    .duration(duration)
    .attr("d", d)
    .remove();
}

function updateLine(selector, source, target, duration) {
  var d = ["M", source.x, source.y, "L", target.x, target.y].join(" ");
  d3.select(selector)
    .transition()
    .duration(duration)
    .attr("d", d);
}