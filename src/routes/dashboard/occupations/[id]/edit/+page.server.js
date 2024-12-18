import { fail, redirect } from "@sveltejs/kit"
import { Occupations } from "../../../../../models/occupations"
import { me } from "../../../../../models/users"

async function load({ cookies, params }) {
     const user = await me(cookies)

     if (!user.token) {
          throw redirect(302, "/auth/login")
     }

     const occupation = new Occupations(user.token)
     const data = await occupation.show(params.id)

     return {
          values: data
     }
}

let actions = {
     update: async ({ request, cookies, params }) => {
          const user = await me(cookies)

          if (!user.token) {
               throw redirect(302, "/auth/login")
          }

          const data = await request.formData()

          const occupation = new Occupations(user.token)
          const result = await occupation.update(params.id, data)

          if (result.error) {
               return fail(400, { 
                    message: result.error,
                    values: { nama_jabatan: data.get("nama_jabatan") }
               })
          }

          cookies.set("message", "Data berhasil diubah", { 
               path: "/",
               maxAge: 3.5
          });

          cookies.set("type", "success", { 
               path: "/",
               maxAge: 3.5
          });

          return redirect(302, "/dashboard/occupations")
     }
}

export { load, actions }