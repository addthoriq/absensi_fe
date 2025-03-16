<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    export let data;
    // console.log(data);

    // Akses parameter id
    $: id = $page.params.id;

    let videoElement;
    let isStarted = false;
    let lat = 0,
        long = 0;

    let errorMessage = "";
    let locationAllowed = true;
    let locationName = "Mendeteksi lokasi..."; // Nama tempat berdasarkan koordinat

    async function getPlaceName(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            );
            const result = await response.json();
            if (result.display_name) {
                locationName = result.display_name;
            } else {
                locationName = "Nama lokasi tidak ditemukan";
            }
        } catch (error) {
            console.error("Gagal mendapatkan nama lokasi:", error);
            locationName = "Gagal mendeteksi lokasi";
        }
    }

    async function startWebcam() {
        try {
            // Request access to the webcam
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoElement.srcObject = stream;
            isStarted = true;

            // navigator.geolocation.getCurrentPosition((position) => {
            //     lat = position.coords.latitude;
            //     long = position.coords.longitude;
            // });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log("Koordinat pengguna:", latitude, longitude);

                        lat = position.coords.latitude;
                        long = position.coords.longitude;

                        // Ambil nama lokasi berdasarkan koordinat
                        await getPlaceName(latitude, longitude);

                        // Arahkan ke URL dengan parameter koordinat
                        goto(
                            `/dashboard/attendances/${id}/out?lat=${latitude}&lng=${longitude}`,
                        );

                        locationAllowed = true;
                    },
                    (error) => {
                        console.error(
                            "Gagal mendapatkan lokasi:",
                            error.message,
                        );
                        locationAllowed = false;

                        if (error.code === error.PERMISSION_DENIED) {
                            errorMessage =
                                "Akses lokasi ditolak. Aktifkan lokasi untuk melanjutkan.";
                        } else if (error.code === error.POSITION_UNAVAILABLE) {
                            errorMessage = "Informasi lokasi tidak tersedia.";
                        } else if (error.code === error.TIMEOUT) {
                            errorMessage =
                                "Permintaan lokasi melebihi waktu tunggu.";
                        } else {
                            errorMessage =
                                "Terjadi kesalahan saat mengambil lokasi.";
                        }
                    },
                );
            } else {
                errorMessage = "Geolocation tidak didukung di browser ini.";
                locationAllowed = false;
            }
        } catch (error) {
            console.error("Error accessing the webcam:", error);
            isStarted = false;
        }
    }

    function stopWebcam() {
        if (videoElement.srcObject) {
            const tracks = videoElement.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
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
            {#if isStarted}
                <!-- Tampilkan lokasi pengguna -->
                <p class="text-primary">Lokasi Anda: {locationName}</p>

                {#if data.check_shift.custom_response}
                    <div class="alert alert-danger">
                        {data.check_shift.custom_response.message}, Silahkan
                        hubungi admin.
                    </div>
                {/if}

                {#if data.check_shift.bisa_absen_masuk == false && data.check_shift.bisa_absen_keluar == false}
                    <div class="alert alert-danger">
                        Anda tidak bisa absensi karena diluar shift.
                    </div>
                {/if}

                <!-- Pesan jika pengguna di luar radius -->
                {#if data.location != null}
                    {#if data.location === false}
                        <div class="alert alert-danger">
                            Anda tidak bisa absensi karena berada di luar radius
                            yang diizinkan.
                        </div>
                    {:else}
                        <div class="alert alert-success">
                            Anda bisa absensi karena dalam radius yang
                            diizinkan.
                        </div>
                    {/if}
                {/if}

                <!-- Pesan Error jika terjadi masalah lokasi -->
                {#if errorMessage}
                    <div class="alert alert-danger">{errorMessage}</div>
                {/if}
            {/if}

            <h4>Absen Keluar</h4>
            <video
                class="bg-black border-2 border-secondary rounded-4 mb-2 w-full"
                autoplay
                playsinline
                bind:this={videoElement}
            >
                <track
                    kind="captions"
                    src=""
                    srclang="en"
                    label="English"
                    default
                />
            </video>
            {#if !isStarted}
                <button class="btn btn-primary" on:click={startWebcam}
                    >Nyalakan Webcam</button
                >
            {:else}
                <form
                    method="POST"
                    action="/dashboard/attendances/{id}/out"
                    class="d-flex justify-content-center flex-column gap-2"
                >
                    <input type="hidden" name="lat" value={lat} />
                    <input type="hidden" name="long" value={long} />
                    {#if data.location != null && data.location === true && (data.check_shift.bisa_absen_masuk == true || data.check_shift.bisa_absen_keluar == true)}
                        <button type="submit" class="btn btn-info">
                            Simpan Kehadiran Keluar
                        </button>
                    {:else}
                        <button
                            type="submit"
                            class="btn btn-info"
                            style="opacity: 0.4;cursor: not-allowed; pointer-events: all;"
                            disabled
                        >
                            Simpan Kehadiran Keluar
                        </button>
                    {/if}
                </form>
            {/if}
            <button class="btn btn-danger" on:click={stopWebcam}
                >Matikan Webcam</button
            >
        </div>
    </div>
</div>
