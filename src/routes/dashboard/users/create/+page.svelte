<script>
    import Form from '../../../../components/form.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  /** @type {import('./$types').Actions} */
  export let form

  data.occupations.forEach(element => {
    element.label = element.nama_jabatan
  });

  const fields = [
    {
      "name": "nama_user",
      "type": "text",
      "placeholder": "Nama User",
      "value" : form?.values?.namaUser ?? "",
      "options" : null 
    },
    {
      "name": "email",
      "type": "email",
      "placeholder": "Email",
      "value" : form?.values?.email ?? "",
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
      "value" : form?.values?.jabatan ?? "",
      "options" : data.occupations
    }
  ]
</script>

<svelte:head>
    <title>Dashboard | Tambah User</title>
</svelte:head>

<Form title="Tambah User" action="/dashboard/users/create" method="POST" fields={fields}/>