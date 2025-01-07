import { fail, redirect } from "@sveltejs/kit";
import { Occupations } from "../../../../models/occupations";
import { me, Users } from "../../../../models/users";

async function load({ cookies }){
    const user = await me(cookies)

    if(!user.token) throw redirect(302, "/auth/login")

    const occupations = new Occupations(user.token)
    const data = await occupations.index()

    return {
        user: null,
        occupations: data
    }
}

let actions = {
    default: async ({ request, cookies }) => {
        const user = await me(cookies)

        if(!user.token){
            throw redirect(302, "/auth/login")
        }

        const data = await request.formData()

        const namaUser = data.get("nama_user")
        const email = data.get("email")
        const password = data.get("password")   
        const confirmPassword = data.get("confirmPassword")
        const jabatan = data.get("jabatan")

        if (password !== confirmPassword) {
            cookies.set("message", "Password dan konfirmasi password tidak sama", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });

            return {
                message: "Password dan konfirmasi password tidak sama",
                values: { namaUser, email, password, confirmPassword, jabatan }
            }
        }

        const User = new Users(user.token)
        const store = await User.store(data)

        if(store.error){
            cookies.set("message", "Terjadi kesalahan saat menyimpan data", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });

            return fail(400, {
                message: "Terjadi kesalahan saat menyimpan data",
                values: { namaUser, email, password, confirmPassword, jabatan }
            })
        }

        cookies.set("message", "Data berhasil disimpan", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/users")
    }
}

export { load, actions }