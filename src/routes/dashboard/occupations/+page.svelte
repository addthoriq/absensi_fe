<script>
  import Table from "../../../components/table.svelte";

  /** @type {import('./$types').PageData} */
  export let data

  /** @type {import('./$types').Actions} */
  export let form
</script>

<svelte:head>
    <title>Dashboard | Jabatan</title>
</svelte:head>

<Table flash={data.flash} action={form} title="Jabatan" url="/dashboard/occupations" tableHead={["Nama Jabatan"]} tableData={data.occupations} edit={true} destroy={true}/>