<script>
    import { onDestroy, onMount } from 'svelte';
	import L from 'leaflet';

    let mapElement, map

    onMount(() => {
        map = L.map(mapElement).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
    })

    onDestroy(() => {
        if(map){
            map.remove()
        }
    })
</script>

<style>
    @import "leaflet/dist/leaflet.css";
    main div{
        height: 350px
    }
</style>

<main>
    <div class="rounded-lg" bind:this={mapElement}></div>
</main>