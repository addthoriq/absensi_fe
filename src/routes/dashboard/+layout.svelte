<script>
    import Alert from '../../components/alert.svelte'

    /** @type {import('./$types').LayoutData} */
    export let data

    let isSidebarCollapsed = false
    let isSidebarHidden = false

    function toggleSidebar() {
      isSidebarCollapsed = !isSidebarCollapsed
    }

    function toggleMobileSidebar() {
      isSidebarHidden = !isSidebarHidden
    }
</script>

<style>
  :global(body.sidebar-icon-only) .sidebar {
    width: 70px;
  }
  
  :global(body.sidebar-icon-only) .sidebar .nav-item {
    padding: 0;
  }
  
  :global(body.sidebar-icon-only) .sidebar .menu-title,
  :global(body.sidebar-icon-only) .sidebar .menu-arrow {
    display: none;
  }

  @media (max-width: 991px) {
    :global(.sidebar) {
      position: fixed;
      max-height: calc(100vh - 70px);
      top: 70px;
      bottom: 0;
      overflow: auto;
      transform: translateX(0);
      transition: transform 0.25s ease-out;
      z-index: 999;
    }

    :global(.sidebar.hidden) {
      transform: translateX(-100%);
    }
  }
</style>

<div class:sidebar-icon-only={isSidebarCollapsed}>
  <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
      <a class="navbar-brand brand-logo" href="/dashboard"><img src="/assets/images/logo-mini.svg" alt="logo" /></a>
      <a class="navbar-brand brand-logo-mini" href="/dashboard"><img src="/assets/images/logo-mini.svg" alt="logo" /></a>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-stretch">
      <button class="navbar-toggler navbar-toggler align-self-center" type="button" on:click={toggleSidebar}>
        <span class="mdi mdi-menu"></span>
      </button>
      <ul class="navbar-nav navbar-nav-right">
        <li class="d-none d-lg-block nav-item nav-profile dropdown">
          <a class="nav-link dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="nav-profile-text">
              <p class="mb-1 text-black font-weight-bold">{data.user.name}</p>
              <div class="">{data.user.role}</div>
            </div>
          </a>
          <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
            <form action="/logout" method="POST">
              <button class="dropdown-item" type="submit">
                <i class="mdi mdi-logout me-2 text-primary"></i> Signout
              </button>
            </form>
          </div>
        </li>
      </ul>
      <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" on:click={toggleMobileSidebar}>
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>

  <!-- Sidebar -->
  <div class="container-fluid page-body-wrapper">
    <nav class="sidebar sidebar-offcanvas" class:hidden={isSidebarHidden} id="sidebar">
      <ul class="nav">        
        <li class="d-block-inline d-lg-none nav-item dropdown">
          <a class="nav-link justify-content-between" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="nav-profile-text">
              <p class="mb-1 text-black font-weight-bold" >{data.user.name}</p>
              <div class="">{data.user.role}</div>
            </div>
            <span class="mdi mdi-arrow-down"></span>
          </a>
          <div class="mdi nav-profile-badge dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
            <form action="/logout" method="POST">
              <button class="dropdown-item" type="submit">
                <i class="mdi mdi-logout me-2 text-primary"></i> Signout
              </button>
            </form>
          </div>
        </li>
        {#if data.user.role == "Admin"}
        <li class="nav-item">
          <a class="nav-link" href="/dashboard/">
            <span class="menu-title">Dashboard</span>
            <i class="mdi mdi-chart-bar menu-icon"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dashboard/users">
            <span class="menu-title">User Management</span>
            <i class="mdi mdi-contacts menu-icon"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dashboard/occupations">
            <span class="menu-title">Jabatan</span>
            <i class="mdi mdi-format-list-bulleted menu-icon"></i>
          </a>
        </li>
        <li class="nav-item" >
          <a class="nav-link" href="/dashboard/shifts">
            <span class="menu-title">Shift</span>
            <i class="mdi mdi mdi-account-clock menu-icon"></i>
          </a>
        </li>
        {/if}
        <li class="nav-item">
          <a class="nav-link" href="/dashboard/attendances">
            <span class="menu-title">Kehadiran</span>
            <i class="mdi mdi-order-bool-ascending-variant menu-icon"></i>
          </a>
        </li>
      </ul>
    </nav>
    <div class="main-panel">
      <div class="content-wrapper">
        {#if data.flash}
          <Alert flash={data.flash}/>
        {/if}
        <slot/>
      </div>
    </div>        
  </div>
</div>