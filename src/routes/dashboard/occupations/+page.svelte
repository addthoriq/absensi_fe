<script>
  import Table from "../../../components/table.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let currentPage = 1;
  let pageSize = 10; // Bisa diubah sesuai kebutuhan
  let totalPages = 1;
  let occupations = [];

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').Actions} */
  export let form;

  $: {
    if (data.occupations && Array.isArray(data.occupations)) {
      occupations = data.occupations;
      totalPages = data.totalPages ?? (Math.ceil(data.total / pageSize) || 1);
      currentPage = data.currentPage ?? 1;
    }
  }

  function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page; // Update current page
    goto(`/dashboard/occupations?page=${page}&page_size=${pageSize}`);
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
  <title>Dashboard | Jabatan</title>
</svelte:head>

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
