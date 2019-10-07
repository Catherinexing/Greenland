
  // using d3 for convenience
  var secondscroll = d3.select('#secondscroll')
  var secondscrolly = secondscroll.select('#secondscrolly');
  var secondfigure =secondscrolly.select('#secondfigure');
  var secondarticle = secondscrolly.select('#secondarticle');
  var secondstep = secondarticle.selectAll('.secondstep');


  // initialize the scrollama
  var scroller = scrollama();

  // generic window resize listener event
  function handleResize() {
    // 1. update height of step elements
    var secondstepH = Math.floor(window.innerHeight * 0.5);
    secondstep.style('height', secondstepH + 'px');

    var secondfigureHeight = window.innerHeight*1
    var secondfigureMarginTop = (window.innerHeight - secondfigureHeight) /5

// var secondfigureHeight2 = window.innerHeight*0.9
//   var secondfigureMarginTop2 = (secondfigureHeight-window.innerHeight)/2
    secondfigure
      .style('height', secondfigureHeight + 'px')
      .style('top', secondfigureMarginTop + 'px');



//
// if (window.innerWidth < 600) {  secondfigure
//   .style('height', secondfigureHeight2 + 'px')
//   .style('top', secondfigureMarginTop2  + 'px');
// } else {
//   secondfigure
//     .style('height', secondfigureHeight + 'px')
//     .style('top', secondfigureMarginTop + 'px');
// }


    // 3. tell scrollama to update new element dimensions
    scroller.resize();
  }

  // scrollama event handlers
  function handleStepEnter(response) {
    console.log(response.index, '-------- enter');
    // response = { element, direction, index }

    // add color to current step only
    secondstep.classed('is-active', function(d, i) {
      return i === response.index;
    })

    // update graphic based on step

    // if (response.direction == 'down'){figure.append("img"). attr('#step-'+response.index+1).attr('opacity', 1)} ;

    secondfigure.select('img').attr("id", '#step-' + response.index).attr("src", "img2/" + "step-" + response.index + ".jpg").attr('opacity', 1);

    secondfigure.select('p').text(response.index);

  }


  // function handleStepExit(response) {
  //   // response = { element, direction, index }
  //   console.log(response.index, '-------- exit');
  //   // remove color from current step
  //   response.element.classList.remove('is-active');
  //   // hide corresponding map step if scrolling up
  //   if (response.direction == 'up') map.select('#step-'+response.index).attr('opacity', 0);
  // }


  function setupStickyfill() {
    d3.selectAll('.sticky').each(function() {
      Stickyfill.add(this);
    });
  }

  function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        step: '#secondscrolly #secondarticle .secondstep',
        offset: 0.4,
        debug: true,
      })
      .onStepEnter(handleStepEnter)


    // setup resize event
    window.addEventListener('resize', handleResize);
  }

  // kick things off
  init();
