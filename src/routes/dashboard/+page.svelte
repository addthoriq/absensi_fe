<script>
  import Statistic from "../../components/statistic.svelte";

  export let data
</script>

<div class="row">
  <Statistic id="absensi-month" labels={data.dailyLabels} datasets={data.dailyData} title="Statistik absensi admin"/>
  <Statistic id="absensi-day" labels={data.monthlyLabels} datasets={data.monthlyData} title="Statistik absensi"/>
</div>