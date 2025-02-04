<script>

    import Table from "../../../components/table.svelte";

    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').Actions} */
    // export let form
</script>

<svelte:head>
    <title>Dashboard | Kehadiran</title>
</svelte:head>

<div class="row">
  <div class="col-12 grid-margin">
      <div class="card">
          <div class="card-body">
              <div class="d-flex flex-column flex-lg-row  align-items-center justify-content-between">
                  <h4>Data Absensi</h4>
                  <a class="btn btn-outline-primary" href="attendances/in">Tambah Absensi</a>
              </div>
              <div class="table-responsive my-3">
                  <table class="table table-striped table-bordered">
                      <thead>
                          <tr class="table-dark bg-gradient-dark">
                                {#if data.user.role == "Admin"}
                                    <th>Nama</th>
                                {/if}
                                <th>Keterangan</th>
                                <th>Tanggal Absen</th>
                                <th>Masuk</th>
                                <th>Keluar</th>
                                <th>Aksi</th>
                          </tr>
                      </thead>
                      <tbody>
                        {#each data.attendances as item}
                            <tr>
                                {#if data.user.role == "Admin"}
                                    <td>{item?.user?.nama_user ?? "-"}</td>
                                {/if}
                                <td>{item?.keterangan ?? "-"}</td>
                                <td>{item?.tanggal_absen ?? "-"}</td>
                                <td>{item?.jam_masuk ?? "-"}</td>
                                <td>{item?.jam_keluar ?? "-"}</td>
                                <td>
                                    <a href="attendances/{item.id}" class="btn btn-info btn-sm">Pratinjau</a>
                                </td>
                            </tr>
                        {/each}
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