<script>
    import Detail from '../../../../components/detail.svelte';

    export let data;

    let user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.nama_user,
        jabatan: data.user.jabatan.nama_jabatan
    }
</script>

<svelte:head>
    <title>Dashboard | Detail User</title>
</svelte:head>

<Detail title="Detail User" header={["email", "nama", "jabatan"]} data={user} />