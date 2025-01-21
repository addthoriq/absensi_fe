import { redirect } from "@sveltejs/kit";
import { Shifts } from "../../../../models/shifts";
import { me, Users } from "../../../../models/users";

export async function load({ cookies }){
    const user = await me(cookies)
    if (!user.token) {
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        throw redirect(302, "/auth/login")
    }

    if(user.jabatan !== "Admin"){
        cookies.set("message", "Anda tidak memiliki akses", { path: "/", maxAge: 3.5 })
        cookies.set("type", "error", { path: "/", maxAge: 3.5 })
        throw redirect(302, "/dashboard/attendances")
    }

    const shifts = new Shifts(user.token)
    const dataShift = await shifts.index()

    const users = new Users(user.token)
    const dataUser = await users.index()

    return {
        shifts: dataShift,
        users : dataUser.results,
    }
}

export const actions = {
    default: async function({request, cookies}){
        const user = await me(cookies)

        if (!user.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        if(user.jabatan !== "Admin"){
            cookies.set("message", "Anda tidak memiliki akses", { path: "/", maxAge: 3.5 })
            cookies.set("type", "error", { path: "/", maxAge: 3.5 })
            throw redirect(302, "/dashboard/attendances")
        }

        const formData = await request.formData()
        const shifts = new Shifts(user.token)
        const result = await shifts.assignShift(formData)

        if(result.error){
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 })
            cookies.set("type", "error", { path: "/", maxAge: 3.5 })
            throw redirect(302, "/dashboard/shifts/assign")
        }

        cookies.set("message", "Petugas berhasil disimpan", { path: "/", maxAge: 3.5 })
        cookies.set("type", "success", { path: "/", maxAge: 3.5 })

        throw redirect(302, "/dashboard/shifts")
    }
}