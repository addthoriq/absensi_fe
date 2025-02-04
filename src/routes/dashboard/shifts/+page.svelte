<script>
  import Modal from '../../../components/modal.svelte';

    export let data
    
    let activeModalId = null; // Untuk melacak modal yang aktif

    function openModal(id) {
        activeModalId = id; // Tetapkan ID modal yang aktif
    }

    function closeModal(){
        activeModalId = null; // Setel kembali modal ke null
    }
</script>

<svelte:head>
    <title>Dashboard | Shift</title>
</svelte:head>

<div class="row">
    <div class="col-12 grid-margin">
      <div class="card">
          <div class="card-body">
              <div class="d-flex flex-column flex-lg-row  align-items-center justify-content-between">
                  <h4>Data shift</h4>
                  <div class="d-flex flex-column flex-lg-row gap-2">
                    <a class="btn btn-outline-primary" href="/dashboard/shifts/create">Tambah shift</a>
                    <a class="btn btn-outline-primary" href="/dashboard/shifts/assign">Daftarkan petugas kedalam shift</a>
                  </div>
              </div>
              <div class="table-responsive my-3">
                  <table class="table table-striped table-bordered">
                      <thead>
                          <tr class="table-dark bg-gradient-dark">
                                <th>Nama Shift</th>
                                <th>Jam Masuk</th>
                                <th>Jam Keluar</th>
                                <th>Aksi</th>
                          </tr>
                      </thead>
                      <tbody>
                          {#if data.shifts.length > 0}
                              {#each data.shifts as data}
                                  <tr>
                                      <td>{data.nama_shift}</td>
                                      <td>{data.jam_mulai}</td>
                                      <td>{data.jam_akhir}</td>
                                      <td>
                                          <form action="?/delete" method="POST">
                                                <input type="hidden" name="id" value="{data.id}">
                                                <a href="/dashboard/shifts/{data.id}/" class="btn btn-warning btn-sm">pratinjau</a>
                                                <a href="/dashboard/shifts/{data.id}/edit" class="btn btn-primary btn-sm">Edit</a>
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
              </div>
          </div>
      </div>
    </div>
</div>