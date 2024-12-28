<script>
    let videoElement;
    let isStarted = false;

    async function startWebcam() {
        try {
            // Request access to the webcam
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            isStarted = true;
        } catch (error) {
            console.error("Error accessing the webcam:", error);
            isStarted = false;
        }
    }

    function stopWebcam() {
        if (videoElement.srcObject) {
            const tracks = videoElement.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
            isStarted = false;
        }
    }
</script>

<div>
    <video class="bg-black border-2 border-secondary rounded-4 mx-5 mb-2 w-full" autoplay playsinline bind:this={videoElement}>
        <track kind="captions" src="path-to-captions.vtt" srclang="en" label="English" default>
    </video>
    <div class="d-flex justify-content-center flex-column gap-2  mx-5">
        <button class="btn btn-primary" on:click={startWebcam} bind:this={isStarted} >Start Webcam</button>
        <button class="btn btn-danger" on:click={stopWebcam}>Stop Webcam</button>
    </div>
</div>