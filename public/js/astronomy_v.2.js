var global = {
  animationIntervalId: null
};

function astronomy_v2(options) {
  options.dotRadius = 7;
  $(options.region).empty();
  if (global.animationIntervalId) clearInterval(global.animationIntervalId);
  $(options.region).addClass("ui-animation-container");

  animateWordsFadeIn(options).then(function (nodes) {
    appendNodesAndDrawPath({
      nodes: nodes,
      region: options.region
    })
  }, null);
}



function animateWordsFadeIn(options) {
  return new Promise(function (resolve, reject) {
    appendPureText(options).then(function (nodes) {
      var $words = $(".js-word");
      $words.animate({ opacity: 1 }, 300);
      resolve(nodes);
    });
  });
}

function appendArrayOfStrings(options) {
  return new Promise(function (resolve, reject) {
    var nodes = [];
    var index = 0;
    _.each(options.text, function (phrase, j) {
      $(options.region).append(getStringTemplate(j));
      var $currentString = $(".js-string-" + j);
      _.each(phrase, function (word, i) {
        index++;
        $currentString.append(getWordTemplate(word));
        $currentString.append(getNodeTemplate("js-node-" + index));
        let stringHeight = $currentString.height() * j;
        let $currentNode = $(".js-node-" + index)[0];
        nodes.push({
          x: $currentNode.offsetLeft,
          y: stringHeight + $currentNode.offsetTop,
          id: index
        })
      });
    });
    resolve(nodes);
  })
}

function appendPureText(options) {
  return new Promise(function (resolve, reject) {
    var nodes = [];
    var index = 0;
    _.each(options.text, function (word, i) {
      index++;
      $(options.region).append(getWordTemplate(word));
      $(options.region).append(getNodeTemplate("js-node-" + index));
      let $currentNode = $(".js-node-" + index)[0];
      nodes.push({
        x: $currentNode.offsetLeft + options.dotRadius,
        y: $currentNode.offsetTop + options.dotRadius,
        id: index
      })
    });
    resolve(nodes);
  })
}

function getNodeTemplate(className) {
  return '<div class="ui-node js-node ' + className + '"></div>';
}

function getWordTemplate(word) {
  return '<span class="ui-word js-word">' + word + '</span>';
}

function getStringTemplate(i) {
  return '<div class="ui-string js-string-' + i + '"></div>';
}

var durationForCreate = 250;


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
    svgGroup: svgGroup
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
      svgGroup: svgGroup
    };

    appendRandomNodes(newOptions).then(function () {
      appendLines(newOptions);
    });
  }, 3500);

}


function appendRandomNodes(options) {
  return new Promise(function (resolve, reject) {
    _.each(options.nodes, function (node, i) {
      var timeout = 300 * getRandomArbitrary(.8, 2.5);
      setTimeout(function () {
        options.svgGroup.append("circle")
          .attr("class", "ui-node-svg")
          .attr("cx", options.nodes[i].x)
          .attr("cy", options.nodes[i].y)
          .attr("r", 7);
        if (i === options.nodes.length - 1) {
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

      if (iterations > options.nodes.length*50) break;

      if (notSameNode && notSameRow) {
        appendedPaths.push({source: source, target: target});
        if (yetNoPath) {
          setTimeout(function () {
            appendLineAstronomy(source, target, options.svgGroup, durationForCreate * getRandomArbitrary(1.5, 2.8));
          }, durationForCreate * getRandomArbitrary(0, 1.5))
        }
      } else {
        i--;
      }
    }
    setTimeout(function () {
      hideLines(appendedPaths, options.svgGroup);
    }, 1500)
  })
}

function hideLines(paths, svgGroup) {
  _.each(paths, function (path) {
    hideLine(path.source, path.target, 400 * getRandomArbitrary(.5, 3))
  });
  setTimeout(function () {
    svgGroup.selectAll(".ui-node-svg")
      .transition()
      .duration(100 * getRandomArbitrary(.5, 3))
      .attr("fill", "rgba(255, 255, 255, 0)")
      .remove();
  }, 800)
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