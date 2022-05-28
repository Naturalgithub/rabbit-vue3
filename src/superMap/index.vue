<template>
  asdad
  <div id="my-map" style="width: 100vw; height: 100vh">asd</div>
</template>
<script>
import Map from 'ol/Map'
import View from 'ol/View'
import ScaleLine from 'ol/control/ScaleLine'
import TileLayer from 'ol/layer/Tile'
import * as control from 'ol/control'
import { Logo, TileSuperMapRest } from '@supermap/iclient-ol'
import { onMounted } from 'vue'

export default {
  name: 'SuperMap',
  setup () {
    onMounted(() => {
      init()
      // init2()
    })

    const init = () => {
      var url =
        'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World'
      var map = new Map({
        target: 'my-map',
        controls: control
          .defaults({ attributionOptions: { collapsed: false } })
          .extend([new Logo()]),
        view: new View({
          center: [106.86, 39.71],
          // maxZoom: 18,
          // minZoom: 2,
          zoom: 5,
          projection: 'EPSG:4326'
        })
      })
      var layer = new TileLayer({
        source: new TileSuperMapRest({
          url: url,
          wrapX: true
        }),
        projection: 'EPSG:4326'
      })
      var scaleControl = new ScaleLine({
        className: 'className'
      })
      map.addControl(scaleControl)
      map.addLayer(layer)
    }
  }
}
</script>
<style>
.ol-scale-line {
  color: red;
}
</style>
