<script>
  import { onMount } from "svelte";
  import Statistic from "../../components/statistic.svelte";
  
  export let data
  let printJS

  onMount(async () => {
      const module = await import("print-js"); // Import hanya di client
      printJS = module.default;
  });

  function printAndDownload(){
    if (printJS) {
          printJS({
              printable: "printable",
              type: "html",
              targetStyles: ["*"],
              style: "@page { size: A4 portrait; }",
              scanStyles: false,
              showModal: false
          });
      } else {
          console.error("printJS belum dimuat.");
      }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="my-3">
  <button class="btn btn-outline-primary" on:click={printAndDownload}>Export PDF</button>
</div>
<div class="row printable" id="printable">
  <Statistic id="absensi-month" labels={data.dailyLabels} datasets={data.dailyData} title="Statistik Absensi bulan"/>
  <Statistic id="absensi-day" labels={data.monthlyLabels} datasets={data.monthlyData} title="Statistik absensi per tanggal"/>
</div>