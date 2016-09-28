function static_manifesto(options) {
  if (!_.isEmpty(options.text)) {
    $(options.region).empty();
    $(options.region).css("opacity", 0);

    var nodes = generateTextAndReturnNodes(options); // It draws text and random nodes, returns nodes indexes array;

    var svg = d3.select(options.region).append("svg:svg")
      .attr("class", "ui-svg-container");

    generatePath(nodes, svg);

    $(options.region).animate({ opacity: 1 }, 400)
  }
}

function getRandomArbitaryInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePhraseTemplate(text) {
  return '<div class="ui-manifesto-word ui-color-peach">' + text + ' </div>';
}

function generateNode(className) {
  return '<div class="ui-node js-node ' + className + '"></div>';
}

function getCoordinates(selector, id) {
  if ($(selector).length == 0) return null;
  return {
    y: $(selector)[0].offsetTop,
    x: $(selector)[0].offsetLeft,
    id: id
  };
}

function generatePath(nodes, svg) {
  var bias = {
    y: 7,
    x: 7
  };

  _.each(nodes, function (node, i) {
    appendNode(node, svg, bias);
    if (nodes[i + 1]) {
      appendLine(node, nodes[i + 1], svg, bias)
    }
  });
}

function appendNode(node, svg, bias) {
  svg.append("circle")
    .attr("class", "ui-node-svg")
    .attr("id", node.id)
    .attr("r", 7)
    .attr("cx", node.x + bias.x)
    .attr("cy", node.y + bias.y);
}

function appendLine(source, target, svg, bias) {
  var d = ["M", source.x + bias.x, source.y + bias.y, "L", target.x + bias.x, target.y + bias.y].join(" ");
  svg.append("path")
    .attr("class", "ui-path-svg " + "s" + source.id + " t" + target.id)
    .transition()
    .duration(100)
    .attr("d", d)
    .attr("M", ["M", source.x + bias.x, source.y + bias.y].join(" "))
    .attr("L", ["L", target.x + bias.x, target.y + bias.y].join(" "));
}


function generateTextAndReturnNodes(options) {
  var words = options.text.split(" ");
  var nodes = [];
  _.each(words, function (word, i) {
    $(options.region).append(generatePhraseTemplate(word));
    if (i < words.length - 1) {
      $(options.region).append(generateNode("js-node-" + i));
      nodes.push(getCoordinates(".js-node-" + i, i));
    }
  });
  return nodes;
}

function onNodeMouseEnter() {
  var node = d3.select(this);
  var nodeY = node.attr("cy")
  var nodeId = node.attr("id");
  var duration = 100;

  node.transition().duration(duration)
    .attr("cy", nodeY - 27);

  var target = d3.select("path.t" + nodeId);
  var source = d3.select("path.s" + nodeId);


  if (!target.empty()) {
    var targetL = generatePathCoordinate({coordinateName: "L", node: node, xBias: 0, yBias: -27});
    var targetM = target.attr("M");

    target.transition().duration(duration)
      .attr("d", targetM + " " + targetL)
      .attr("L", targetL);
  }

  if (!source.empty()) {
    var sourceM = generatePathCoordinate({coordinateName: "M", node: node, xBias: 0, yBias: -27});
    var sourceL = source.attr("L");

    target.transition().duration(duration)
      .attr({
        "d": sourceM + " " + sourceL,
        "M": sourceM
      });
  }

}

function generatePathCoordinate(options) {
  return [
    options.coordinateName,
    parseInt(options.node.attr("cx")) + options.xBias,
    parseInt(options.node.attr("cy")) + options.yBias
  ].join(" ");
}