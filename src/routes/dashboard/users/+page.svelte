<script>
    import Table from "../../../components/table.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let data;

    let currentPage = 1;
    let pageSize = 10;
    let totalPages = 1;
    let users = [];

    $: {
        if (data.users && Array.isArray(data.users)) {
            users = data.users.map((element) => ({
                id: element.id,
                email: element.email,
                name: element.nama_user,
                jabatan: element.jabatan?.nama_jabatan ?? "Tidak Ada Jabatan",
            }));

            totalPages =
                data.totalPages ?? (Math.ceil(data.total / pageSize) || 1);
            currentPage = data.currentPage ?? 1;
        }
    }

    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        currentPage = page;
        goto(`/dashboard/users?page=${page}&page_size=${pageSize}`);
    }

    function changePageSize(event) {
        pageSize = parseInt(event.target.value, 10);
        totalPages = Math.ceil(data.total / pageSize) || 1;
        currentPage = 1;
        goto(`/dashboard/users?page=1&page_size=${pageSize}`);
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

<Table
    tableHead={["Email", "Nama", "Jabatan"]}
    tableData={users}
    title="User"
    url="/dashboard/users"
    flash={data.flash}
    edit={true}
    destroy={true}
/>

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
