<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


mapboxgl.accessToken = 'pk.eyJ1IjoiamhpbXlwb29sIiwiYSI6ImNtZGY4cjVoMDBheHcyaXEzaDV5a2g4eGIifQ.QYmwDCEn26DEW-8RbIG2jg'

const mapContainer = ref(null)
let map = null


const initialOptions = {
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.006, 40.7128],
  zoom: 12
}

onMounted(() => {
  if (!mapContainer.value) return

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: initialOptions.style,
    center: initialOptions.center,
    zoom: initialOptions.zoom,
    interactive: true,
    attributionControl: true
  })

  map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right')

  const marker = new mapboxgl.Marker({ color: '#7145D8' })
    .setLngLat(initialOptions.center)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Hello from Vue 4 + Mapbox'))
    .addTo(map)

  map.on('click', (e) => {
    console.log('map click', e.lngLat)
  })

  map.on('load', () => {
   
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container" />
  </div>
</template>

<style scoped>
.map-wrapper { width: 100%; height: 100%; }
.map-container { width: 100%; height: 500px; min-height: 300px; } /* importante: altura */
</style>
