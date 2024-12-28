<script>

  import Table from "../../../components/table.svelte";

  export let data
</script>

<svelte:head>
    <title>Dashboard | Shift</title>
</svelte:head>

<Table tableHead={["Nama Shift", "Jam Masuk", "Jam Keluar"]}  tableData={data.shifts} flash={data.flash} title="Shift" url="/dashboard/shifts" edit={true} destroy={true}/>