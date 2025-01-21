import { Attendances } from "../../../../models/attendances";
import { me } from "../../../../models/users";

async function load({ cookies, params }){
    const user = await me(cookies)

    if (!user.token) {
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        throw redirect(302, "/auth/login")
    }

    const attendances = new Attendances(user.token)
    const data = await attendances.show(params.id)

    console.log(data, user);

    return {
        values: data
    }
}

export { load }