<script>
    export let title, header, data

</script>

<div class="row">
    <div class="col-12 grid-margin">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">{title}</h4>
                <div class="table-responsive col-6">
                    <table class="table table-striped table-bordered">
                        <tr class="table-dark bg-gradient-dark">
                            <th>#</th>
                            <td>Informasi</td>
                        </tr>
                        {#each Object.entries(data) as [key, value]}
                            {#if key != "id"}
                                <tr>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>
                            {/if}
                        {/each}
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>