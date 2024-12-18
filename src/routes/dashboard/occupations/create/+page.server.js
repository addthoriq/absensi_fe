import { redirect, fail } from "@sveltejs/kit";
import { me } from "../../../../models/users";
import { Occupations } from "../../../../models/occupations";

async function load({ cookies }) {
    const user = await me(cookies)

    if (!user.token) {
        throw redirect(302, "/auth/login")
    }

    let flash = null

    if (cookies.get("message") && cookies.get("type")) {
        flash = {
            message: cookies.get("message"),
            type: cookies.get("type")
        }
    }

    return {
        flash: flash
    }
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

        const name = formData.get("nama_jabatan")
        if(!name){
            return fail(400, { 
                message: "Nama jabatan harus diisi",
                values: { nama_jabatan: formData.get("nama_jabatan") }
            })
        }

        const occupations = new Occupations(user.token)
        const store = await occupations.store(formData)

        if (store.error) {
            cookies.set("message", "Data berhasil disimpan", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, { 
                message: store.error,
                values: { nama_jabatan: formData.get("nama_jabatan") }
            })
        }

        cookies.set("message", "Data berhasil disimpan", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/occupations")
    }
}

export { actions, load }