import { fail, redirect } from "@sveltejs/kit"
import { me } from "../../../../models/users"
import { Shifts } from "../../../../models/shifts"

async function load({ cookies }) {
    const user = await me(cookies)

    if (!user.token) {
        throw redirect(302, "/auth/login")
    }

    return null
}

let actions = {
    default: async ({ request, cookies }) => {
        const user = await me(cookies)

        if (!user.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        const formData = await request.formData()

        const shifts = new Shifts(user.token)
        const store = await shifts.store(formData)

        if (store.error) {
            cookies.set("message", store.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, {
                message: store.error,
                values: { 
                    nama_shift: formData.get("nama_shift"),
                    jam_mulai: formData.get("jam_mulai"),
                    jam_akhir: formData.get("jam_akhir")
                }
            })
        }

        cookies.set("message", "Data berhasil disimpan", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/shifts")
    }
}

export { load, actions }