<script>
  import Table from "../../../components/table.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let currentPage = 1;
  let pageSize = 10;
  let totalPages = 1;
  let occupations = [];

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').Actions} */
  export let form;

  $: {
    if (data.occupations && Array.isArray(data.occupations)) {
      occupations = data.occupations.slice(0, pageSize); // Batasi sesuai pageSize
      totalPages = Math.ceil(data.total / pageSize) || 1;
      currentPage = Math.min(currentPage, totalPages);
    }
  }

  function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page;
    goto(`/dashboard/occupations?page=${page}&page_size=${pageSize}`);
  }

  function changePageSize(event) {
    pageSize = parseInt(event.target.value, 10);
    totalPages = Math.ceil(data.total / pageSize) || 1;
    currentPage = 1;
    goto(`/dashboard/occupations?page=1&page_size=${pageSize}`);
  }

  function generatePageNumbers() {
    let pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
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
  <title>Dashboard | Jabatan</title>
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

<Table
  flash={data.flash}
  action={form}
  title="Jabatan"
  url="/dashboard/occupations"
  tableHead={["Nama Jabatan"]}
  tableData={occupations}
  edit={true}
  destroy={true}
/>

<!-- Tambahkan informasi total data di atas paginasi -->
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
