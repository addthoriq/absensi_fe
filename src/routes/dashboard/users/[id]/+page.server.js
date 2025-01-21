import { me } from "../../../../models/users";

export async function load({ cookies, params }) {
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

    const response = await fetch(`${process.env.API_URL}/user-management/${params.id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    if(!response.ok) throw redirect(302, "/dashboard/users")

    const result = await response.json();

    return {
        user: result
    }
}

let actions = {
    default: async function (){
        const user = await me(cookies)

        if(!user.token){
            throw redirect(302, "/auth/login")
        }

        const data = await request.formData()

        const namaUser = data.get("nama_user")
        const email = data.get("email")
        const password = data.get("password")   
        const confirmPassword = data.get("confirmPassword")
        const jabatan = data.get("jabatan")

        if (password !== confirmPassword) {
            cookies.set("message", "Password dan konfirmasi password tidak sama", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });

            return {
                message: "Password dan konfirmasi password tidak sama",
                values: { namaUser, email, password, confirmPassword, jabatan }
            }
        }

        const User = new Users(user.token)
        const store = await User.store(data)

        if(store.error){
            cookies.set("message", "Terjadi kesalahan saat menyimpan data", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });

            return fail(400, {
                message: "Terjadi kesalahan saat menyimpan data",
                values: { namaUser, email, password, confirmPassword, jabatan }
            })
        }

        return redirect(302, "/dashboard/users")
    }
}