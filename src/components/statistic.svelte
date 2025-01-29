<script>
    import { onMount } from "svelte"

    export let labels, datasets, title, id
    onMount(async() => {
        const ctx = document.getElementById(id);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    barPercentage: 0.5,
                    data : datasets,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
</script>

<div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">{title}</h4>
            <canvas id={id} style="height:230px"></canvas>
        </div>
    </div>
</div>