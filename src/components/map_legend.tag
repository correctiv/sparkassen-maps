<map-legend class="superbugs-map__legend">

  <h3>Legend</h3>
  <ul name="legend" if={ legendItems }>
    <li each={ legendItems }
      style="background-color:{ color }">{ step.toFixed(1) } %</li>
  </ul>

  riot.control.on(riot.EVT.layerChanged, data => {
    this.update({legendItems: data.legend})
  })

</map-legend>