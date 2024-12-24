<script>
    import Form from "../../../../components/form.svelte";

    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').Actions} */
    export let form
    
    const fields = [
        {
            "name": "nama_kehadiran",
            "label": "Nama kehadiran",
            "type": "text",
            "placeholder": "Nama kehadiran",
            "value" : form?.values?.tanggal ?? "",
            "required": true
        },
        {
            "name": "keterangan",
            "label": "keterangan",
            "type": "text",
            "placeholder": "keterangan",
            "value" : form?.values?.jam_mulai ?? "",
            "required": true
        }
    ]

</script>

<Form title="Tambah Kehadiran" action="/dashboard/attendances/create" method="POST" fields={fields}/>