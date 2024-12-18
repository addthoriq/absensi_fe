<script>
    export let flash
    let isVisible = true;

    // Automatically hide after 5 seconds
    $: if (flash && isVisible) {
            setTimeout(() => {
                isVisible = false;
            }, 3500);
        }
</script>

{#if isVisible}
    <div class="alert alert-{ flash.type === 'success' ? 'success' : 'danger' } alert-dismissible fade show my-2" role="alert">
        {flash.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" on:click={() => (isVisible = false)}></button>
    </div>
{/if}