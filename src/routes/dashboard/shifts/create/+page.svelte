<script>
    import Form from '../../../../components/form.svelte';


    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').Actions} */
    export let form

    const fields = [
        {
            "name": "nama_shift",
            "label": "Nama Shift",
            "type": "text",
            "placeholder": "Nama Shift",
            "value" : form?.values?.nama_shift ?? "",
            "required": true
        },
        {
            "name": "jam_mulai",
            "label": "Jam Mulai",
            "type": "time",
            "placeholder": "Jam Mulai",
            "value" : form?.values?.jam_mulai ?? "",
            "required": true
        },
        {
            "name": "jam_akhir",
            "label": "Jam Akhir",
            "type": "time",
            "placeholder": "Jam Akhir",
            "value" : form?.values?.jam_akhir ?? "",
            "required": true
        }
    ]
</script>

<svelte:head>
    <title>Dashboard | Tambah Shift</title>
</svelte:head>

<Form title="Tambah Shift" action="/dashboard/shifts/create" method="POST" fields={fields} flash={data.flash} />