import { redirect } from "@sveltejs/kit";
import { me } from "../../models/users";

export async function load({ cookies }){
    const user = await me(cookies)

    if(user.token) throw redirect(302, "/dashboard/users")

    let flash = null
    if(cookies.get("message") && cookies.get("type")) flash = {
        message: cookies.get("message") ?? '',
        type: cookies.get("type") ?? ''
    }

    return {
        flash: flash
    }
}