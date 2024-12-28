import { redirect } from "@sveltejs/kit";
import { me, Users } from "../../../models/users"

async function load({ cookies }) {
    const user = await me(cookies)

    if (!user.token) {
        throw redirect(302, "/auth/login")
    }

    const response = await fetch(`${process.env.API_URL}/user-management`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const result = await response.json();

    return {
        users: result.results,
    }
}

let actions = {
    /**
     * Delete a user
     * @param {import("@sveltejs/kit").RequestEvent} event
     */
    delete: async function({ request, cookies }){
        const token = await me(cookies)

        if (!token.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        const formData = await request.formData()
        const id = formData.get("id")

        const users = new Users(token.token)
        const result = await users.destroy(id)

        if (result.error) {
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        } else {
            cookies.set("message", "Data berhasil dihapus", { path: "/", maxAge: 3.5 });
            cookies.set("type", "success", { path: "/", maxAge: 3.5 });
        }

        return redirect(302, "/dashboard/users")
    }
}

export { load, actions }