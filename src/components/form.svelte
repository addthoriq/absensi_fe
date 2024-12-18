<script>
    import Alert from "./alert.svelte";

    export let title, action, fields, method
</script>

<div class="row">
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">{title}</h4>
                <form class="forms-sample" action={action} method={method}>
                    {#each fields as input}
                        {#if input?.type == "select"}
                            <div class="form-group">
                                <label for={input?.name}>{input?.placeholder}</label>
                                <select required={input?.required} class="form-select" id={input?.name} name={input?.name}>
                                    {#each input?.options as option}
                                        <option value={option?.id} selected={option?.id == input?.value}>{option?.label}</option>
                                    {/each}
                                </select>
                            </div>
                        {:else}
                        <div class="form-group">
                            <label for={input?.name}>{input?.placeholder}</label>
                            <input required={input?.required} value={input?.value || ""} type={input?.type} class="form-control" id={input?.name} placeholder="{input?.placeholder}" name={input?.name}>
                        </div>
                        {/if}
                    {/each}
                    <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>