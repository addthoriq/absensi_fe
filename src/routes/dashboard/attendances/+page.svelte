<script>

  import Table from "../../../components/table.svelte";

  /** @type {import('./$types').PageData} */
  export let data

  /** @type {import('./$types').Actions} */
  export let form
</script>

<svelte:head>
    <title>Dashboard | Kehadiran</title>
</svelte:head>

<Table tableHead={["nama", "keterangan"]} tableData={data.attendances} title="Kehadiran" url="/dashboard/attendances" detail={true} destroy={true}/>