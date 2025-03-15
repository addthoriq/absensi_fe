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
                jabatan: element.jabatan?.nama_jabatan ?? "Tidak Ada Jabatan", // Ambil nama_jabatan dari object
            }));

            totalPages =
                data.totalPages ?? (Math.ceil(data.total / pageSize) || 1);
            currentPage = data.currentPage ?? 1;
        }
    }

    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        goto(`/dashboard/users?page=${page}&page_size=${pageSize}`);
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

<Table
    tableHead={["Email", "Nama", "Jabatan"]}
    tableData={users}
    title="User"
    url="/dashboard/users"
    flash={data.flash}
    edit={true}
    destroy={true}
/>

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
                <span aria-hidden="true">&laquo;</span>
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
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
