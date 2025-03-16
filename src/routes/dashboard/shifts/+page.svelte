<script>
    import Modal from "../../../components/modal.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let data;

    console.log(data);

    let activeModalId = null; // Untuk melacak modal yang aktif

    function openModal(id) {
        activeModalId = id; // Tetapkan ID modal yang aktif
    }

    function closeModal() {
        activeModalId = null; // Setel kembali modal ke null
    }

    let currentPage = 1;
    let pageSize = 10; // Bisa diubah sesuai kebutuhan
    let totalPages = 1;
    let shifts = [];

    $: {
        if (data.shifts && Array.isArray(data.shifts)) {
            shifts = data.shifts;
            totalPages =
                data.totalPages ?? (Math.ceil(data.total / pageSize) || 1);
            currentPage = data.currentPage ?? 1;
        }
    }

    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        currentPage = page;
        goto(`/dashboard/shifts?page=${page}&page_size=${pageSize}`);
    }

    function changePageSize(event) {
        pageSize = parseInt(event.target.value, 10);
        totalPages = Math.ceil(data.total / pageSize) || 1;
        currentPage = 1;
        goto(`/dashboard/shifts?page=1&page_size=${pageSize}`);
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
        const pageSizeParam = parseInt(params.get("page_size"), 10);

        if (!isNaN(pageSizeParam) && pageSizeParam > 0) {
            pageSize = pageSizeParam;
            totalPages = Math.ceil(data.total / pageSize) || 1;
        }
        if (!isNaN(pageParam) && pageParam > 0) {
            currentPage = Math.min(pageParam, totalPages);
        }
    });
</script>

<svelte:head>
    <title>Dashboard | Shift</title>
</svelte:head>

<!-- Dropdown Page Size -->
<div class="mb-3 d-flex align-items-center">
    <label for="pageSize" class="fw-bold me-1">Tampilkan: </label>
    <select
        class="form-select"
        style="width: 80px;"
        id="pageSize"
        on:change={changePageSize}
    >
        <option value="5" selected={pageSize === 5}>5</option>
        <option value="10" selected={pageSize === 10}>10</option>
        <option value="20" selected={pageSize === 20}>20</option>
        <option value="50" selected={pageSize === 50}>50</option>
        <option value="100" selected={pageSize === 100}>100</option>
    </select>
</div>

<div class="row">
    <div class="col-12 grid-margin">
        <div class="card">
            <div class="card-body">
                <div
                    class="d-flex flex-column flex-lg-row align-items-center justify-content-between"
                >
                    <h4>Data Shift</h4>
                    <div class="d-flex flex-column flex-lg-row gap-2">
                        <a
                            class="btn btn-outline-primary"
                            href="/dashboard/shifts/create">Tambah Shift</a
                        >
                        <a
                            class="btn btn-outline-primary"
                            href="/dashboard/shifts/assign"
                            >Daftarkan Petugas ke Dalam Shift</a
                        >
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
                                            <form
                                                action="?/delete"
                                                method="POST"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={data.id}
                                                />
                                                <a
                                                    href="/dashboard/shifts/{data.id}/"
                                                    class="btn btn-warning btn-sm"
                                                    >Pratinjau</a
                                                >
                                                <a
                                                    href="/dashboard/shifts/{data.id}/edit"
                                                    class="btn btn-primary btn-sm"
                                                    >Edit</a
                                                >
                                                <button
                                                    type="button"
                                                    class="btn btn-danger btn-sm"
                                                    on:click={() =>
                                                        openModal(data.id)}
                                                    >Hapus</button
                                                >

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
                                {/each}
                            {:else}
                                <tr>
                                    <td colspan="4" class="text-center"
                                        >Tidak ada data</td
                                    >
                                </tr>
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Informasi Total Data -->
<div class="mb-2">
    Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(
        currentPage * pageSize,
        data.total,
    )} dari {data.total} data
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
                <span aria-hidden="true">«</span>
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
                <span aria-hidden="true">»</span>
            </a>
        </li>
    </ul>
</nav>
