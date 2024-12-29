
import { redirect } from "@sveltejs/kit";
import { me } from "../../../../../models/users";
import { Shifts } from "../../../../../models/shifts";

let actions = {
    update: async ({ request, cookies, params }) => {
        const user = await me(cookies)

        if (!user.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        const formData = await request.formData()
        const shifts = new Shifts(user.token)
        const result = await shifts.update(params.id, formData)

        if (result.error) {
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, {
                message: result.error,
                values: {
                    nama_shift: formData.get("nama_shift"),
                    jam_mulai: formData.get("jam_mulai"),
                    jam_akhir: formData.get("jam_akhir")
                }
            })
        }

        cookies.set("message", "Data berhasil diubah", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/shifts")
    }
}

async function load({ cookies, params }) {
    const user = await me(cookies)

    if (!user.token) {
        throw redirect(302, "/auth/login")
    }

    const shifts = new Shifts(user.token)
    const data = await shifts.show(params.id)

    data.jam_mulai = data.jam_mulai.slice(0, 5)
    data.jam_akhir = data.jam_akhir.slice(0, 5)

    let flash = null

    if (cookies.get("message") && cookies.get("type")) {
        flash = {
            message: cookies.get("message"),
            type: cookies.get("type")
        }
    }

    return {
        values: data,
        flash: flash
    }
}

export { actions, load }