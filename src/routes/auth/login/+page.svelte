<script>
  import Form from "../../../components/form.svelte";

  // Redirect manual jika berhasil
  // $: if (form?.success) {
  //   goto("/dashboard");
  // }

  /** @type {import('./$types').ActionData} */
  export let data


  const fields = [
    {
      "name": "email",
      "type": "email",
      "placeholder": "Email",
      "value" : data?.values?.email ?? "",
      "required": true
    },
    {
      "name": "password",
      "type": "password",
      "placeholder": "Password",
      "value" : data?.values?.password ?? "",
      "required": true
    }
  ]
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<Form action="/auth/login" title="Login" method="POST" fields={fields} values={data.values}/>