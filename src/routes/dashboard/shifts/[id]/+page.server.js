import { Shifts } from "../../../../models/shifts";
import { me } from "../../../../models/users";

export async function load({ params, cookies }){
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

    const shift = new Shifts(user.token)
    const data = await shift.show(params.id)

    return {
        shift: data
    }
}