import { redirect } from "@sveltejs/kit";
import { Shifts } from "../../../models/shifts";
import { me } from "../../../models/users";

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

    const shiftsInstance = new Shifts(user.token)
    const page = Number(url.searchParams.get("page")) || 1;
    const page_size = Number(url.searchParams.get("page_size")) || 10;

    const { shifts, total, totalPages, error } = await shiftsInstance.indexPagination({ page, page_size });

    if (error) throw redirect(302, "/dashboard")

    let flash = null

    if (cookies.get("message") && cookies.get("type")) flash = {
        message: cookies.get("message"),
        type: cookies.get("type")
    }

    return {
        shifts,
        total,        // Total data
        totalPages,   // Total halaman
        currentPage: page, // Halaman saat ini
        flash
    };
}

let actions = {
    delete: async ({ request, cookies }) => {
        const token = await me(cookies)

        if (!token.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        if (token.jabatan !== "Admin") {
            cookies.set("message", "Anda tidak memiliki akses", { path: "/", maxAge: 3.5 })
            cookies.set("type", "error", { path: "/", maxAge: 3.5 })
            throw redirect(302, "/dashboard/attendances")
        }

        const formData = await request.formData()
        const id = formData.get("id")

        const shifts = new Shifts(token.token)
        const result = await shifts.destroy(id)

        if (result.error) {
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, {
                message: result.error
            })
        }

        cookies.set("message", "Data berhasil dihapus", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/shifts")
    }
}

export { load, actions }