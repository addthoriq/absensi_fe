<script>
    export let show = false; // Mengontrol visibilitas modal
    export let title = "Modal Title"; // Judul modal
    export let body = "This is the modal body content."; // Konten body modal
    export let close
    export let btnActionWording
</script>

{#if show}
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{title}</h5>
            <button type="button" class="btn-close" on:click={close}></button>
            </div>
            <div class="modal-body">
                <p>{body}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" on:click={close}>Close</button>
                <button type="submit" class="btn btn-primary">submit</button>
            </div>
        </div>
        </div>
    </div>
{/if}