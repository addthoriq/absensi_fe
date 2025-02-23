<script>
    import Modal from "./modal.svelte";
    
    export let title, action, fields, method, modal;
    let isModalOpen = false;
    let isFormValid = false;
    let formFields = fields; // Buat copy lokal dari fields untuk tracking
    
    // Reactive statement untuk mengecek validasi form
    $: {
        isFormValid = formFields.every(field => {
            if (field.required) {
                if (field.type === "select") {
                    return field.value != null && field.value !== "";
                }
                return field.value != null && field.value.toString().trim() !== "";
            }
            return true;
        });
    }
    
    function openModal() {
        isModalOpen = true;
    }
    
    function closeModal() {
        isModalOpen = false;
    }
    
    // Handler untuk update value
    function handleInputChange(event, fieldIndex) {
        const value = event.target.value;
        formFields[fieldIndex] = {
            ...formFields[fieldIndex],
            value: value
        };
        formFields = [...formFields]; // Trigger reaktivitas
    }
</script>

<div class="row">
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">{title}</h4>
                <form class="forms-sample" action={action} method={method}>
                    {#each formFields as input, i}
                        {#if input?.type == "select"}
                            <div class="form-group">
                                <label for={input?.name}>
                                    {input?.placeholder}
                                    {#if input?.required}
                                        <span class="text-danger">*</span>
                                    {/if}
                                </label>
                                <select 
                                    required={input?.required}
                                    class="form-select"
                                    id={input?.name}
                                    name={input?.name}
                                    value={input?.value || ""}
                                    on:change={(e) => handleInputChange(e, i)}
                                >
                                    <option value="">Pilih {input?.placeholder}</option>
                                    {#each input?.options as option}
                                        <option 
                                            value={option?.id}
                                        >
                                            {option?.label}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                        {:else}
                            <div class="form-group">
                                <label for={input?.name}>
                                    {input?.placeholder}
                                    {#if input?.required}
                                        <span class="text-danger">*</span>
                                    {/if}
                                </label>
                                <input 
                                    required={input?.required}
                                    value={input?.value || ""}
                                    type={input?.type}
                                    class="form-control"
                                    id={input?.name}
                                    placeholder={input?.placeholder}
                                    name={input?.name}
                                    on:input={(e) => handleInputChange(e, i)}
                                >
                            </div>
                        {/if}
                    {/each}
                    <button 
                        type={modal.isModal ? "button" : "submit"}
                        class="btn btn-gradient-primary me-2" 
                        on:click={modal.isModal ? openModal : null}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                    
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