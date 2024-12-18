<script>
    import Form from '../../../../../components/form.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').Actions} */
    export let form

    const fields = [
    {
      "name": "nama_user",
      "type": "text",
      "placeholder": "Nama User",
      "value" : form?.values?.namaUser ?? data?.user?.nama_user ??"",
      "options" : null
    },
    {
      "name": "email",
      "type": "email",
      "placeholder": "Email",
      "value" : form?.values?.email ?? data?.user?.email ?? "",
      "options" : null
    },
    {
      "name": "password",
      "type": "password",
      "placeholder": "Password",
      "value" : form?.values?.password ?? "",
      "options" : null
    },
    {
      "name": "confirmPassword",
      "type": "password",
      "placeholder": "Konfirmasi Password",
      "value" : form?.values?.confirmPassword ?? "",
      "options" : null
    },
    {
      "name": "jabatan",
      "type": "select",
      "placeholder": "Jabatan",
      "value" : form?.values?.jabatan ??  data?.user?.jabatan.id ?? "",
      "options" : data.occupations
    }
  ]
</script>

<svelte:head>
    <title>Dashboard | Edit User</title>
</svelte:head>

<Form title="Edit User" action="/dashboard/users/{data.user.id}/edit" method="POST" fields={fields} />