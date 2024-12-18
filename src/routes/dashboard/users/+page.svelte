<script>
    import Table from "../../../components/table.svelte";

    export let data;

    let users = [];
    data.users.forEach(element => {
        users.push({
            id: element.id,
            email: element.email,
            name: element.nama_user,
            jabatan: element.jabatan.nama_jabatan
        })
    });
</script>

<Table tableHead={["email", "nama", 'jabatan']} tableData={users} title="User" url="/dashboard/users" flash={data.flash} edit={true} destroy={true}/>