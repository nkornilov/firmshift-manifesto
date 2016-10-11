var global = {
  animationIntervalId: null,
  dotRadius: 7,
  gatheredNodes: [],
  currentNodesSet: [],
  nodes: [],
  paths: [],
  durationForCreate: 600
};

var specificNodes = {
  normal: [
    {
      id: 100000,
      x: 24,
      y: 16
    },
    {
      id: 100001,
      x: 152,
      y: 56
    }
  ],
  small: [{
    id: 100000,
    x: 12,
    y: 8
  },
    {
      id: 100001,
      x: 82,
      y: 30
    }]
};

function prepareRegion(options) {
  if ($(window).width() < 700 || $(window).height() < 430) {
    global.dotRadius = 2;
    global.nodes = specificNodes.small;
  } else {
    global.dotRadius = options.dotRadius;
    global.nodes = specificNodes.normal;
  }

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

  $(options.region).css(options.styles);

  options.textRegion = ".js-animation-phrase";
  options.svgRegion = ".js-animation-wrap";

}

function appendArrayOfStrings(options) {
  return new Promise((resolve, reject) => {
    var index = 0;
    _.each(options.text, (phrase, j)  => {
      $(options.textRegion).append(getStringTemplate(j));
      var $currentString = $(".js-string-" + j);
      _.each(phrase, (word, i) => {
        index++;
        var className = Math.random() > 0.5 ? "ui-upper" : "";
        $currentString.append(getWordTemplate(className, word));
        $currentString.append(getNodeTemplate("js-node-" + index));
        let $currentNode = $(".js-node-" + index);
        $currentNode.css({
          width: global.dotRadius * 2,
          height: global.dotRadius * 2
        });
      });
    });
    resolve();
  })
}

function getNodes() {
  var nodes = _.clone(global.nodes);
  var $nodes = $(".js-node");
  $nodes.each((i, ui) => {
    nodes.push({
      y: ui.offsetTop + global.dotRadius,
      x: ui.offsetLeft + global.dotRadius,
      id: i
    })
  });
  _.invoke(nodes, { isRendered: false });
  return nodes;
}

function renderNodes(options) {
  return new Promise((resolve, reject) => {
    _.each(options.nodes,(node, i) => {
        var timeout = global.durationForCreate * getRandomArbitrary(1, 3);
        setTimeout(() => {
          options.svgGroup.append("circle")
            .attr("class", "ui-node-svg js-node-svg-" + node.id)
            .attr("cx", options.nodes[i].x)
            .attr("cy", options.nodes[i].y)
            .attr("r", 0)
            .transition()
            .duration(200)
            .attr("r", global.dotRadius || 7);

          if (i === options.nodes.length - 1) {
            resolve(options);
          }
        }, timeout);
    });

  });
}

function astronomy_v3(options) {
  prepareRegion(options);
  appendArrayOfStrings(options).then(() => {
    $(options.region).animate({ opacity: 1 }, 1000, () => {
      $(".js-contacts").addClass("ui-visible");
      d3.select(options.svgRegion).selectAll("*").remove();
      
      options.svg = d3.select(options.svgRegion).append("svg:svg")
        .attr("class", "ui-svg-container");

      options.svgGroup = options.svg.append("svg:g")
        .attr("class", "ui-svg-group");

      global.gatheredNodes = getNodes();
      global.currentNodesSet = getRandomSubArray(global.gatheredNodes);
      renderAnimation(options);
    });
  });
}

function renderAnimation (options) {
  var optionsSet = {
    region: options.svgRegion,
    svgGroup: options.svgGroup,
    nodes: global.currentNodesSet,
    dotRadius: global.dotRadius
  };

  options.svgGroup.selectAll("*").remove();

  renderNodes(optionsSet).then(() => {
    setTimeout(() => {
      global.paths = generatePaths(optionsSet);
      renderPaths({
        paths: global.paths,
        svgGroup: options.svgGroup
      }).then(() => setTimeout(() => {
        destroyPaths().then(() => {
          destroyNodes().then(() => {
            global.currentNodesSet = getRandomSubArray(global.gatheredNodes);
            renderAnimation(optionsSet);
          })
        });
      }, 2000))
    }, 1000)
  }, null);
}

function shuffleAnimation (optionsSet) {
  var shuffledNodes = shuffleNodesArray(global.currentNodesSet, global.gatheredNodes);
  global.currentNodesSet = shuffledNodes.nodes;
  _.each(shuffledNodes.removed, (node, i) => {
    var pathRemoveDuration = global.durationForCreate * getRandomArbitrary(2, 3);
    destroyAllPathsByNode(node, pathRemoveDuration);
    if (i == shuffledNodes.removed.length - 1) {
      setTimeout(() => {
        optionsSet.nodes = shuffledNodes.nodes;
        _.each(shuffledNodes.removed, (node, i) => {
          var nodeRemoveDuration = global.durationForCreate * getRandomArbitrary(2, 3);
          destroyNode(node, nodeRemoveDuration);
          if (i == shuffledNodes.removed.length - 1) {
            setTimeout(() => renderAnimation(optionsSet), nodeRemoveDuration);
          }
        });
      }, pathRemoveDuration);
    }
  });
}

function shuffleNodesArray (currentNodes, allNodes) {
  var nodes = _.clone(currentNodes);
  var removed = [];
  for (var i = 0; i < iRemove; i++) {
    var index = getRandomArbitaryInt(0, nodes.length - 1);
    removed.push(nodes[index]);
    nodes.splice(index, 1);
    var randomNode = allNodes[getRandomArbitaryInt(0, allNodes.length)];
    randomNode.isRendered = false;
    nodes.push(randomNode);
  }
  return {
    nodes: nodes,
    removed: removed
  };
}

function generatePaths(options) {
  var paths = [];
  var iterations = 0;
  for (var i = 0; i < options.nodes.length && i >= 0; i++) {
    var source = options.nodes[i];
    var target = options.nodes[getRandomArbitaryInt(0, options.nodes.length - 1)];

    var notSameNode = source.id !== target.id;
    var notSameRow = source.y !== target.y;
    var yetNoPath = _.isUndefined(_.findWhere(paths, {source: target, target: source}));

    iterations++;

    if (iterations > options.nodes.length * 100) break;

    if (yetNoPath) {
      if (notSameNode && notSameRow) {
        paths.push({ source: source, target: target });
      } else {
        i--;
      }
    }
  }
  return paths;
}

function renderPaths (options) {
  return new Promise((resolve, reject) => {
    _.each(options.paths, (path, i) => {
      var duration = global.durationForCreate * getRandomArbitrary(1.5, 3);
      renderPath(path, options.svgGroup, duration);
      if (i == options.paths.length - 1) {
        setTimeout(resolve, duration);
      }
    });
  })
}

function renderPath (path, svgGroup, duration) {
    var dStart = ["M", path.source.x, path.source.y, "L", path.source.x, path.source.y].join(" ");
    var d = ["M", path.source.x, path.source.y, "L", path.target.x, path.target.y].join(" ");
    svgGroup.append("path")
      .attr("class", "ui-path-svg " + "s" + path.source.id + " t" + path.target.id)
      .attr("d", dStart)
      .attr("stroke-width", 1.4 * global.dotRadius)
      .transition()
      .duration(duration)
      .attr("d", d);
}

function destroyPaths () {
   return new Promise((resolve, reject) => {
     _.each(global.paths, (path, i) =>  {
       var durationForDestroy = global.durationForCreate * getRandomArbitrary(1, 3);
       destroyPath(path, durationForDestroy);
       if (i === global.paths.length - 1) {
         setTimeout(resolve, durationForDestroy)
       }
     });
   })
}

function destroyPath (path, duration) {
  var d = ["M", path.source.x, path.source.y, "L", path.source.x, path.source.y].join(" ");
  var selector = ".s" + path.source.id + ".t" + path.target.id;
  d3.select(selector)
    .transition()
    .duration(duration)
    .attr("d", d)
    .remove();
}

function destroyAllPathsByNode (node, duration) {
  var d = ["M", node.x, node.y, "L", node.x, node.y].join(" ");
  var asSource = ".s" + node.id;
  var asTarget = ".t" + node.id;

  _.each(global.paths, function (i, path) {
    if (path.source === node || path.target === node) {
      global.paths.splice(i, 1);
    }
  });

  d3.selectAll(asSource)
    .transition()
    .duration(duration)
    .attr("d", d)
    .remove();

  d3.selectAll(asTarget)
    .transition()
    .duration(duration)
    .attr("d", d)
    .remove();
}

function destroyNodes () {
  return new Promise((resolve, reject) => {
    _.each(global.currentNodesSet, (node, i) =>  {
      var durationForDestroy = global.durationForCreate * getRandomArbitrary(1, 3);
      setTimeout(() => destroyNode(node, 200), durationForDestroy);
      if (i === global.paths.length - 1) {
        setTimeout(resolve, durationForDestroy)
      }
    });
  })
}

function destroyNode (node, duration) {
  d3.select(".js-node-svg-" + node.id)
    .transition()
    .duration(duration)
    .attr("r", 0)
    .remove();
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