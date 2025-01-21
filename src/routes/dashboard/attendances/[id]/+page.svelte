<script>
    import Map from "../../../../components/map.svelte";
    // import { browser } from "$app/environment"

    /** @type {import('./$types').PageData} */
    export let data

    let lat = null;
    let long = null;

    // Ensure `data.values.lokasi_masuk` exists before parsing
    if (data?.values?.lokasi_masuk) {
        [lat, long] = data.values.lokasi_masuk.split(',').map(Number);
    }
</script>

<svelte:head>
    <title>Dashboard | Detail Kehadiran</title>
</svelte:head>

<div class="card">
    <div class="card-body">
        <h4 class="card-title">Lokasi</h4>
        {#if lat && long}
            <Map lat={lat} long={long} />
        {:else}
            <p>Loading map...</p>
        {/if}

        <div class="mt-4">
            <h4>Data Kehadiran</h4>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th>Shift</th>
                        <th>Keterangan</th>
                        <th>Jam masuk</th>
                        <th>Jam keluar</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{data.values.user.nama_user}</td>
                        <td>{data.values.user.jabatan.nama_jabatan}</td>
                        <td>{data.values.shift ? `${data.values.shift.jam_mulai} - ${data.values.shift.jam_akhir}` : "-"}</td>
                        <td>{data.values.keterangan ?? "-" }</td>
                        <td>{data.values.jam_masuk ?? "-"}</td>
                        <td>{data.values.jam_keluar ?? "-"}</td>
                    </tr>
                </tbody>
            </table>

            <div class="my-4 d-flex align-items-center justify-content-center">
                {#if !data.values.jam_keluar}
                    <a href={`/dashboard/attendances/${data.values.id}/out`} class="btn btn-outline-primary">Absen keluar</a>
                {/if}
            </div>
        </div>
    </div>
</div>