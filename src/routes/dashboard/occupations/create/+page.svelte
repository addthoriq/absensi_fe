<script>
    import Form from "../../../../components/form.svelte";

    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').Actions} */
    export let form

    const fields = [
        {
            "name": "nama_jabatan",
            "label": "Nama Jabatan",
            "type": "text",
            "placeholder": "Nama Jabatan",
            "value" : form?.values?.nama_jabatan ?? "",
            "required": true
        }
    ]
</script>

<svelte:head>
    <title>Dashboard | Tambah Jabatan</title>
</svelte:head>

<Form title="Tambah Jabatan" error={form?.error} action="/dashboard/occupations/create" method="POST" fields={fields} flash={data.flash} />