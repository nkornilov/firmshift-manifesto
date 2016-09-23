function randomInput(options) {
  var text = "";
  var nodes = [];

  var svgGroup = d3.select(options.region).append("svg:svg")
    .attr("class", "ui-svg-container")
    .append("g");

  $(options.region).append("<div class='js-text-region'></div>");
  var $textRegion = $(options.region).find(".js-text-region");

  document.addEventListener("keydown", onKeyDown);

  function onKeyDown (e) {
    var keycode = e.which;
    switch (keycode) {
      case 32:
        // space
        onSpaceClick(e);
        break;
      case 8:
        //backspace
        onBackSpaceClick();
        break;
      default:
        onRandomKeyClick(keycode);
        break;
    }

  }

  function onSpaceClick (e) {
    $textRegion.append("<span id='ui-node'></span>");
    $node = $("#ui-node");

    var coordinates = {
      x: $node[0].offsetLeft,
      y: $node[0].offsetTop
    };
    nodes.push(coordinates);
    $node.remove();
    updateTextOnUI(" ");
    svgGroup.append("circle")
      .attr("cx", coordinates.x + 7)
      .attr("cy", coordinates.y + 50)
      .attr("r", 7)
      .attr("fill", "#FFF");
  }

  function onBackSpaceClick () {
    $textRegion.find(":last-child").remove();
  }

  function onRandomKeyClick (keycode) {
    updateTextOnUI(String.fromCharCode(keycode));
  }

  function updateTextOnUI (char) {
    $textRegion.append("<span class='js-char ui-color-peach'>" + char + "</span>");
  }


}

