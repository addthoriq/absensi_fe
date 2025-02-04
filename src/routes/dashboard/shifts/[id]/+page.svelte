<script>
    export let data
</script>

<svelte:head>
    <title>Detail Shift</title>
</svelte:head>

<div class="d-flex flex-column">
    <div class="mb-3">
        <h3>Data Shift</h3>
    </div>

    <!-- Card Data -->
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                    <span><strong>Nama</strong></span>
                    <span>{data?.shift?.nama_shift}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span><strong>Nama:</strong></span>
                    <span>{data?.shift?.jam_mulai}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span><strong>Status:</strong></span>
                    <span>{data?.shift?.jam_akhir}</span>
                </li>
            </ul>
        </div>
    </div>
    
    <div class="mb-3">
        <h3>Data Users</h3>
    </div>
    <div class="table-responsive my-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr class="table-dark bg-gradient-dark">
                      <th>nama</th>
                      <th>email</th>
                      <th>jabatan</th>
                </tr>
            </thead>
            <tbody>
                {#if data?.shift?.users.length > 0}
                    {#each data?.shift?.users as item}
                        <tr>
                            <td>{item?.nama ?? "-"}</td>
                            <td>{item?.email ?? "-"}</td>
                            <td>{item?.jabatan?.nama_jabatan ?? "-"}</td>
                        </tr>
                    {/each}
                {:else }
                    <tr>
                        <td colspan="5" class="text-center">Tidak ada data</td>
                    </tr>
                {/if}
            </tbody>
        </table>

        <!-- {#if tableData.length > 0}
            <div class="d-flex align-items-center justify-content-between my-3">
                <div class="d-flex align-items-center gx-5">
                    <button 
                        class="btn btn-outline-primary btn-sm mr-2" 
                        on:click={() => loop = loop - 1}
                        class:disabled={loop === 0}
                    >
                        <i class="mdi mdi-arrow-left"></i>
                    </button>
                    {#each Array.from({length: Math.ceil(tableData.length/10)}) as _, i}
                        <button 
                            class="btn btn-outline-primary btn-sm mr-2" 
                            on:click={() => loop = i}
                            class:selected={loop === i}
                        >
                            {i+1}
                        </button>
                    {/each}
                    <button 
                        class="btn btn-outline-primary btn-sm mr-2" 
                        on:click={() => loop = loop + 1}
                        class:disabled={loop === Math.ceil(tableData.length/10) - 1}
                    >
                        <i class="mdi mdi-arrow-right"></i>
                    </button>
                </div>
            </div>
        {/if} -->
    </div>
</div>