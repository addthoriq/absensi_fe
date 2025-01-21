<script>
    import { onDestroy, onMount } from 'svelte';
	// import L from 'leaflet';
    // import { browser } from '$app/environment';

    export let lat; // Receive latitude from parent
    export let long; // Receive longitude from parent

    let mapElement, map, L

    onMount(async () => {
        // if(!browser) return; 
        const leaflet = await import('leaflet');
        L = leaflet.default;

        if (lat && long) {
            map = L.map(mapElement).setView([lat, long], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: ''
            }).addTo(map);

            L.marker([lat, long]).addTo(map).openPopup();
        }
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