<script>
    import Form from '../../../../../components/form.svelte';


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
            "value" : form?.values?.nama_shift ?? data?.values?.nama_shift ?? "",
            "required": true
        },
        {
            "name": "jam_mulai",
            "label": "Jam Mulai",
            "type": "time",
            "placeholder": "Jam Mulai",
            "value" : form?.values?.jam_mulai ?? data?.values?.jam_mulai ?? "",
            "required": true
        },
        {
            "name": "jam_akhir",
            "label": "Jam Akhir",
            "type": "time",
            "placeholder": "Jam Akhir",
            "value" : form?.values?.jam_akhir ?? data?.values?.jam_akhir ?? "",
            "required": true
        }
    ]
</script>

<svelte:head>
    <title>Dashboard | Edit Shift</title>
</svelte:head>

<Form title="Edit Shift" action="?/update" method="POST" fields={fields} />