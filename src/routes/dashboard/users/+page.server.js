import { redirect } from "@sveltejs/kit";
import { me, Users } from "../../../models/users"

async function load({ cookies, url }) {
    const user = await me(cookies)

    if (!user.token) {
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        throw redirect(302, "/auth/login")
    }

    if (user.jabatan !== "Admin") {
        cookies.set("message", "Anda tidak memiliki akses", { path: "/", maxAge: 3.5 })
        cookies.set("type", "error", { path: "/", maxAge: 3.5 })
        throw redirect(302, "/dashboard/attendances")
    }

    const usersInstance = new Users(user.token);

    const page = Number(url.searchParams.get("page")) || 1;
    const page_size = Number(url.searchParams.get("page_size")) || 10;

    const { users, total, totalPages, error } = await usersInstance.indexPagination({ page, page_size });

    if (error) throw redirect(302, "/dashboard")

    let flash = null

    if (cookies.get("message") && cookies.get("type")) flash = {
        message: cookies.get("message"),
        type: cookies.get("type")
    }

    return {
        users,
        total,        // Total data
        totalPages,   // Total halaman
        currentPage: page, // Halaman saat ini
        flash
    };
}

let actions = {
    /**
     * Delete a user
     * @param {import("@sveltejs/kit").RequestEvent} event
     */
    delete: async function ({ request, cookies }) {
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