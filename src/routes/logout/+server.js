import { redirect } from "@sveltejs/kit"

function POST({ cookies }){
    if(cookies.get('auth_token') == null){  
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });

        return redirect(302,"/auth/login")
    }

    // delete all data users.
    cookies.delete('auth_token', { path: "/" });
    cookies.delete('user_name', { path: "/" });

    // Set message after logout
    cookies.set("message", "Anda berhasil logout", { path: "/", maxAge: 3.5 });
    cookies.set("type", "success", { path: "/", maxAge: 3.5 });

    return redirect(302,"/auth/login")
}

export { POST }