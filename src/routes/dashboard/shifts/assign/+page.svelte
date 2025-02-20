<script>
  import Modal from '../../../../components/modal.svelte';

    export let data;

    let search = "";
    let selectedUsers = [];
    let isFormValid = false;
    let isModalOpen = false;
    
    function openModal() {
        isModalOpen = true;
    }
    
    function closeModal() {
        isModalOpen = false;
    }

    // Filter unselected users based on the search query
    $: unselectedUsers = data.users.filter(
        (user) =>
            !selectedUsers.find((selected) => selected.id === user.id) &&
            user.nama_user.toLowerCase().includes(search.toLowerCase())
    );

    let selectedShift = "";

    // Reactive statement untuk validasi form
    $: isFormValid = selectedUsers.length > 0 && selectedShift !== "";

    // Toggle user selection
    function toggleUserSelection(user) {
        if (selectedUsers.find((selected) => selected.id === user.id)) {
            selectedUsers = selectedUsers.filter((selected) => selected.id !== user.id);
        } else {
            selectedUsers = [...selectedUsers, user];
        }
    }

    const modal = {
        isModal: true,
        title: "Konfirmasi Create",
        description: "Data yang anda masukan sudah benar?",
        action: "create"
    }
</script>

<svelte:head>
    <title>Dashboard || Assign User</title>
</svelte:head>

<div class="row">
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Penjadwalan petugas ke shift</h4>
                <form class="forms-sample" action="/dashboard/shifts/assign" method="POST">
                    <!-- Shift Selection -->
                    <div class="form-group">
                        <label for="shift">Shift <span class="text-danger">*</span></label>
                        <select bind:value={selectedShift} required name="shift_id" id="shift" class="form-control">
                            <option value="">Pilih Shift</option>
                            {#each data.shifts as shift}
                                <option value={shift.id}>{shift.nama_shift}</option>
                            {/each}
                        </select>
                    </div>

                    <!-- Search Input -->
                    <div class="form-group">
                        <label for="search">Cari pekerja</label>
                        <input
                            id="search"
                            type="text"
                            class="form-control"
                            placeholder="Search users..."
                            bind:value={search}
                        />
                    </div>

                    <!-- List of Users to Select -->
                    <div class="form-group">
                        <label>Pekerja <span class="text-danger">*</span></label>
                        {#if unselectedUsers.length > 0}
                            {#each unselectedUsers as user (user.id)}
                                <div class="d-flex align-items-center gap-3 my-2">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id={`user-${user.id}`}
                                        checked={selectedUsers.some(selected => selected.id === user.id)}
                                        on:change={() => toggleUserSelection(user)}
                                    />
                                    <label class="form-check-label m-0" for={`user-${user.id}`}>
                                        {user.nama_user}
                                    </label>
                                </div>
                            {/each}
                        {:else}
                            <p>Pekerja tidak ditemukan.</p>
                        {/if}
                    </div>

                    <!-- Selected Users -->
                    <div class="form-group">
                        <label>Pekerja yang dipilih</label>
                        {#if selectedUsers.length > 0}
                            {#each selectedUsers as user (user.id)}
                                <div class="d-flex align-items-center gap-3 my-2">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id={`selected-user-${user.id}`}
                                        checked={true}
                                        on:change={() => toggleUserSelection(user)}
                                    />
                                    <label class="form-check-label m-0" for={`selected-user-${user.id}`}>
                                        {user.nama_user}
                                    </label>
                                </div>
                            {/each}
                        {:else}
                            <p>Tidak ada pekerja yang dipilih.</p>
                        {/if}
                    </div>

                    <!-- Hidden Inputs for Selected Users -->
                    {#each selectedUsers as user (user.id)}
                        <input type="hidden" name="users" value={user.id} />
                    {/each}

                    <!-- Submit Button -->
                    <button 
                        type="button"
                        class="btn btn-gradient-primary me-2" 
                        on:click={openModal}
                        disabled={!isFormValid}
                    >Submit</button>
                    
                    {#if isModalOpen}
                        <Modal 
                            show={true}
                            title={modal.title}
                            body={modal.description}
                            close={closeModal}
                            btnActionWording={modal.action}
                        />
                    {/if}
                </form>
            </div>
        </div>
    </div>
</div>