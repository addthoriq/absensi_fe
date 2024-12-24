<script>
    import Form from "../../../../../components/form.svelte";

    /** @type {import('./$types').Load} */
    export let data

    /** @type {import('./$types').Actions} */
    export let form

    const fields = [
        {
            "name": "nama_jabatan",
            "label": "Nama Jabatan",
            "type": "text",
            "placeholder": "Nama Jabatan",
            "value" : form?.values?.nama_jabatan ?? data?.values?.nama_jabatan ?? "",
            "required": true
        }
    ]
</script>

<svelte:head>
    <title>Dashboard | Edit Jabatan</title>
</svelte:head>

<Form error={form?.error} title="Edit Jabatan" action="?/update" method="POST" fields={fields} />