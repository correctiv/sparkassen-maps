import {NAMES} from '../data/paths.js'
import {DATASETS} from '../data/datasets.js'

function getDataSet(slug) {
  let dataSet = DATASETS[slug]
  let metaData = dataSet.metaData
  let loader = dataSet.loader
  let colorize = loader.colorize.bind(loader)
  let data = loader.getDataDict()
  let legend = loader.getLegend()
  return {metaData, colorize, data, legend}
}

class MapStore {

  constructor() {
    riot.observable(this)
    this.bindEvents()

    this.data = {}
    this.legend = null
  }

  bindEvents() {

    // hilighting
    this.on(riot.EVT.hilight, (id) => {
      this.hilighted = id
      let name = NAMES[id]
      let value = this.data[id]
      this.trigger(riot.EVT.hilightChanged, {name, id, value})
    })

    // change data layer
    this.on(riot.EVT.changeLayer, (slug) => {
      let dataSet = getDataSet(slug)
      this.data = dataSet.data
      this.trigger(riot.EVT.layerChanged, dataSet)

      // update data in infobox of previously hilighted
      if (this.hilighted) {
        this.trigger(riot.EVT.hilight, this.hilighted)
      }
    })

  }

  getLayers() {
    let layers = []
    DATASETS.map(d => {
      let id = DATASETS.indexOf(d)
      layers.push({id, name})
    })
    return layers
  }

}

// add store to riot control
let mapStore = new MapStore()
riot.control.addStore(mapStore)

export default mapStore
