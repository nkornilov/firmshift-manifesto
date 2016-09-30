function dynamic_manifesto(options) {
  var i = 0;
  var nodesIds = [];
  var nodes = [];
  $(options.region).empty();

  var intervalId = setInterval(function () {
    var char = options.charArrayFromText[i++];
    var template;

    if (char == " ") {
      template = generateNode("ui-dynamic-node js-node-hc-" + i);
      nodesIds.push(i);
    } else {
      template = generateCharTemplate(char);
    }

    $(options.region).append(template);

    if (i == (options.charArrayFromText.length)) {
      clearInterval(intervalId);
      var svg = d3.select(options.region).append("svg:svg")
        .attr("class", "ui-svg-container");

      _.each(nodesIds, function (nodeId) {
        nodes.push(getCoordinates(".js-node-hc-" + nodeId, nodeId))
      });

      generatePathHC(nodes, svg);
    }
  }, 2200/options.charArrayFromText.length);
}

function generateCharTemplate(char) {
  return '<span class="ui-color-brown ui-char-animation">' + char + '</span>';
}

function generatePathHC(nodes, svg) {
  var bias = {
    y: 7,
    x: 7
  };
  _.each(nodes, function (node, i) {
    appendNode(node, svg, bias);
    if (nodes[i + 1]) {
      setTimeout(function () {
        appendLineHC(node, nodes[i + 1], svg, bias);
      }, 30*getRandomArbitaryInt(5, 17));
    }
  });;
}

function appendLineHC(source, target, svg, bias) {
  var dStart = ["M", source.x + bias.x, source.y + bias.y, "L", source.x + bias.x, source.y + bias.y].join(" ");
  var d = ["M", source.x + bias.x, source.y + bias.y, "L", target.x + bias.x, target.y + bias.y].join(" ");
  svg.append("path")
    .attr("class", "ui-path-svg " + "s" + source.id + " t" + target.id)
    .attr("d", dStart)
    .attr("M", ["M", source.x + bias.x, source.y + bias.y].join(" "))
    .attr("L", ["L", target.x + bias.x, target.y + bias.y].join(" "))
    .transition()
    .duration(170)
    .attr("d", d);
}