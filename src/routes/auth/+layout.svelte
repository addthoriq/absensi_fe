<script>
    import Alert from '../../components/alert.svelte';

    /** @type {import('./$types').LayoutData} */
    export let data
</script>

<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
            <div class="row flex-grow">
                <div class="col-lg-4 mx-auto">
                    {#if data.flash}
                        <Alert flash={data.flash}/>
                    {/if}
                    <!-- <div class="d-flex align-items-center justify-content-center"> -->
                        <slot/>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</div>