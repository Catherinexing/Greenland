
  // using d3 for convenience
  var firsts = d3.select('#firsts')
  var scrolly =firsts.select('#scrolly');
  var figure = scrolly.select('figure');
  var article = scrolly.select('article');
  var step = article.selectAll('.step');

  // initialize the scrollama
  var scroller = scrollama();

  // generic window resize listener event
  function handleResize() {
    // 1. update height of step elements
    // var stepH = Math.floor(window.innerHeight * 0.7);
    // step.style('height', stepH + 'px');
    //
    // var figureHeight = window.innerHeight
    // var figureMarginTop = (window.innerHeight - figureHeight) / 2

    var stepH = Math.floor(window.innerHeight * 0.6);
    step.style('height', stepH + 'px');

    var figureHeight = window.innerWidth/2
    var figureMarginTop = (window.innerHeight - figureHeight) / 2

    figure
      .style('height', figureHeight + 'px')
      .style('top', figureMarginTop + 'px');


    // 3. tell scrollama to update new element dimensions
    scroller.resize();
  }

  // scrollama event handlers
  function handleStepEnter(response) {
    console.log(response.index, '-------- enter');
    // response = { element, direction, index }

    // add color to current step only
    step.classed('is-active', function(d, i) {
      return i === response.index;
    })

    // update graphic based on step

    // if (response.direction == 'down'){figure.select('img').attr("id", '#step-' + response.index).attr("src", "img/" + "step-" + response.index + ".jpg").attr('opacity', 1)} ;

    figure.select('img').attr("id", '#step-' + response.index).attr("src", "img/" + "step-" + response.index + ".jpg").attr('opacity', 1);

    // figure.select('p').text(response.index);

  }


  // function handleStepExit(response) {
  //   // response = { element, direction, index }
  //   console.log(response.index, '-------- exit');
  //   // remove color from current step
  //   response.element.classList.remove('is-active');
  //   // hide corresponding map step if scrolling up
  //   if (response.direction == 'up') map.select('#step-'+response.index).attr('opacity', 0);
  //
  //
  //     figure.select('p').text(response.index);
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
        step: '#scrolly article .step',
        offset: 0.4,
        debug: true,
      })
      .onStepEnter(handleStepEnter)


    // setup resize event
    window.addEventListener('resize', handleResize);
  }

  // kick things off
  init();
