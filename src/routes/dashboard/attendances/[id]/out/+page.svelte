<script>
    import { page } from '$app/stores';

    // Akses parameter id
    $: id = $page.params.id;

    let videoElement;
    let isStarted = false;
    let lat = 0, long = 0

    async function startWebcam() {
        try {
            // Request access to the webcam
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            isStarted = true;

            navigator.geolocation.getCurrentPosition((position) => {

                lat = position.coords.latitude
                long = position.coords.longitude
            })
        } catch (error) {
            console.error("Error accessing the webcam:", error);
            isStarted = false;
        }
    }

    function stopWebcam(){
        if (videoElement.srcObject) {
            const tracks = videoElement.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
            isStarted = false;
        }
    }
</script>

<svelte:head>
    <title>Dashboard || Absen Keluar</title>
</svelte:head>

<div class="d-flex justify-content-center">
    <div class="card p-5">
        <div class="mx-5 d-flex flex-column gap-2">
            <h4>Absen Keluar</h4>
            <video class="bg-black border-2 border-secondary rounded-4  mb-2 w-full" autoplay playsinline bind:this={videoElement}>
                <track kind="captions" src="" srclang="en" label="English" default>
            </video>
            {#if !isStarted }
                <button class="btn btn-primary" on:click={startWebcam} >Nyalakan Webcam</button>
            {:else}
                <form method="POST" action="/dashboard/attendances/{id}/out" class="d-flex justify-content-center flex-column gap-2">
                    <input type="hidden" name="lat" value={lat}>
                    <input type="hidden" name="long" value={long}>
                    <button type="submit" class="btn btn-info">Simpan Kehadiran Keluar</button>
                </form>
            {/if}
            <button class="btn btn-danger" on:click={stopWebcam}>Matikan Webcam</button>
        </div>
    </div>
</div>