<script>
    import Table from "../../../components/table.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let currentPage = 1;
    let pageSize = 10; // Bisa diubah sesuai kebutuhan
    let totalPages = 1;
    let attendances = [];

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').Actions} */
    // export let form

    $: {
        if (data.attendances && Array.isArray(data.attendances)) {
            attendances = data.attendances;
            totalPages =
                data.totalPages ?? (Math.ceil(data.total / pageSize) || 1);
            currentPage = data.currentPage ?? 1;
        }
    }

    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        currentPage = page; // Update current page
        goto(`/dashboard/attendances?page=${page}&page_size=${pageSize}`);
    }

    function generatePageNumbers() {
        let pages = [];

        if (totalPages <= 7) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, "...", totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                ];
            } else {
                pages = [
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                ];
            }
        }
        return pages;
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const pageParam = parseInt(params.get("page"), 10);
        if (!isNaN(pageParam) && pageParam > 0) {
            currentPage = pageParam;
        }
    });
</script>

<svelte:head>
    <title>Dashboard | Kehadiran</title>
</svelte:head>

<div class="row">
    <div class="col-12 grid-margin">
        <div class="card">
            <div class="card-body">
                <div
                    class="d-flex flex-column flex-lg-row align-items-center justify-content-between"
                >
                    <h4>Data Absensi</h4>
                    <a class="btn btn-outline-primary" href="attendances/in"
                        >Tambah Absensi</a
                    >
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
                                <th>Shift</th>
                                <th>Jadwal Masuk</th>
                                <th>Jadwal Keluar</th>
                                <th>Absen Masuk</th>
                                <th>Absen Keluar</th>
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
                                    <td
                                        >{item?.user?.shift?.nama_shift ??
                                            "-"}</td
                                    >
                                    <td
                                        >{item?.user?.shift?.jam_mulai ??
                                            "-"}</td
                                    >
                                    <td
                                        >{item?.user?.shift?.jam_akhir ??
                                            "-"}</td
                                    >
                                    <td>{item?.jam_masuk ?? "-"}</td>
                                    <td>{item?.jam_keluar ?? "-"}</td>
                                    <td>
                                        <a
                                            href="attendances/{item.id}"
                                            class="btn btn-info btn-sm"
                                            >Pratinjau</a
                                        >
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

<!-- PAGINATION COMPONENT -->
<nav aria-label="Page navigation">
    <ul class="pagination">
        <!-- Tombol Previous -->
        <li class="page-item {currentPage === 1 ? 'disabled' : ''}">
            <a
                class="page-link"
                href="#"
                aria-label="Previous"
                on:click|preventDefault={() => changePage(currentPage - 1)}
            >
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <!-- Generate Nomor Halaman Dinamis -->
        {#each generatePageNumbers() as pageNumber}
            <li
                class="page-item {currentPage === pageNumber
                    ? 'active'
                    : ''} {pageNumber === '...' ? 'disabled' : ''}"
            >
                <a
                    class="page-link"
                    href="#"
                    on:click|preventDefault={() =>
                        pageNumber !== "..." && changePage(pageNumber)}
                >
                    {pageNumber}
                </a>
            </li>
        {/each}

        <!-- Tombol Next -->
        <li class="page-item {currentPage === totalPages ? 'disabled' : ''}">
            <a
                class="page-link"
                href="#"
                aria-label="Next"
                on:click|preventDefault={() => changePage(currentPage + 1)}
            >
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
