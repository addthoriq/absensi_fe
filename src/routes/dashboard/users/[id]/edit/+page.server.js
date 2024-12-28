import { me, Users } from "../../../../../models/users";
import { Occupations } from "../../../../../models/occupations";
import { redirect } from "@sveltejs/kit";

/**
 * Get data user by id
 * @param {import('@sveltejs/kit').LoadEvent} event
 * @returns {Promise<import('../../../../models/users').User>}
 */
export async function load({ url, cookies, params }){
    const user = await me(cookies)

    if (!user.token) {
        throw redirect(302, "/auth/login")
    }

    const occupations = new Occupations(user.token)
    let dataOccupations = await occupations.index()

    dataOccupations = dataOccupations.map(element => ({
        id: element.id,
        label: element.nama_jabatan
    }))

    const users = new Users(user.token)
    const result = await users.show(params.id)

    return {
        user: result,
        occupations: dataOccupations
    }
}

export let actions = {
    default: async ({ request, cookies, params }) => {
        const user = await me(cookies)

        if (!user.token) {
            throw redirect(302, "/auth/login")
        }

        const data = await request.formData()
        const password = data.get("password")
        const confirmPassword = data.get("confirmPassword")

        if(password && password !== confirmPassword){
            return fail(400, {
                message: "Password tidak sama",
                values: {
                    name: data.get("name"),
                    jabatan: data.get("jabatan"),
                    password: data.get("password")
                }
            })
        }
        
        const users = new Users(user.token)
        const update = await users.update(params.id, data)

        if (update.error) {
            return fail(400, {
                message: update.error,
                values: {
                    name: data.get("name"),
                    jabatan: data.get("jabatan"),
                    password: data.get("password")
                }
            })
        }

        cookies.set("message", "Data berhasil diubah", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/users")
    }
}