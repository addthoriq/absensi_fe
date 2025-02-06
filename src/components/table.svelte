<script>
  import Modal from "./modal.svelte";

    export let title, tableHead, tableData, url, edit, destroy, detail

    let activeModalId = null; // Untuk melacak modal yang aktif

    function openModal(id) {
    activeModalId = id; // Tetapkan ID modal yang aktif
    }

    function closeModal(){
        activeModalId = null; // Setel kembali modal ke null
    }

    // let loop = 0
</script>

<div class="row">
    <div class="col-12 grid-margin">
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-column flex-lg-row  align-items-center justify-content-between">
                    <h4>Data {title}</h4>
                    <a class="btn btn-outline-primary" href="{url}/create">Tambah {title}</a>
                </div>
                <div class="table-responsive my-3">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr class="table-dark bg-gradient-dark">
                                {#each tableHead as th}
                                    <th>{th}</th>
                                {/each}

                                    {#if edit || destroy}
                                    <th>Aksi</th>
                                {/if}
                            </tr>
                        </thead>
                        <tbody>
                            {#if tableData.length > 0}
                                {#each tableData as data}
                                    <tr>
                                        {#each Object.entries(data) as [key, value]}
                                            {#if key !== 'id'}
                                                <td>{value}</td>
                                            {/if}
                                        {/each}
                                        <td>
                                            <form action="?/delete" method="POST">
                                                <input type="hidden" name="id" value="{data.id}">
                                                {#if detail}
                                                <a href="{url}/{data.id}" class="btn btn-info btn-sm">Pratinjau</a>
                                                {/if}
                                                {#if edit}
                                                <a href="{url}/{data.id}/edit" class="btn btn-primary btn-sm">Edit</a>
                                                {/if}
                                                {#if destroy}


                                                <button type="button" class="btn btn-danger btn-sm" on:click={() => openModal(data.id)}>Hapus</button>
                                                    {#if activeModalId === data.id}
                                                        <Modal 
                                                            show={true} 
                                                            title="Konfirmasi Hapus Data" 
                                                            body="Apakah anda yakin akan menghapus data ini?" 
                                                            close={closeModal}
                                                            btnActionWording="Hapus"
                                                            />
                                                    {/if}
                                                {/if}
                                            </form>
                                        </td>
                                    </tr>
                                {/each }
                            {:else}
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
        </div>
    </div>
</div>