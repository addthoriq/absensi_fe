import { fail, redirect } from '@sveltejs/kit'
import { me } from '../../../../models/users';
import { Attendances } from '../../../../models/attendances';

async function load({ cookies }) {
    const user = await me(cookies)

    if (!user.token) {
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        throw redirect(302, "/auth/login")
    }

    return {
        user: { name: user.name }
    }
}

let actions = {
    /**
     * Handle default action for this route. This action will be call when
     * user submit the form with method POST.
     * @param {import('@sveltejs/kit').RequestEvent} event
     * @returns {import('@sveltejs/kit').Response} response
     */
    default: async ({ request, cookies }) => {
        const user = await me(cookies)

        if (!user.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        const formData = await request.formData()
        formData.set("nama_kehadiran", user.name)
        formData.set("keterangan", "Hadir")
        formData.set("lokasi_masuk", `${formData.get("lat")},${formData.get("long")}`)
        // formData.set("")

        const attendances = new Attendances(user.token)
        const restore = await attendances.store(formData)

        formData.set("kehadiran_id", restore.id)
        formData.set('shift_id', 10)
        const result = await attendances.restore(formData)

        if(result.error){
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, {
                message: result.error,
                values: {
                    nama_kehadiran : formData.get("nama_kehadiran"),
                    keterangan: formData.get("keterangan")
                }
            })
        }

        cookies.set("message", "Absensi Berhasil Disimpan", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/attendances")
    }
}

export { load, actions }