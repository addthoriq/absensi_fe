class Authentication {
    constructor(cookies = null) {
        this.token = cookies.get("auth_token")
    }

    async me(cookies) {
        if (!this.token) return {
            name: '',
            token: ''
        }

        const response = await fetch(`${process.env.API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        // Reset all token and data user in cookies
        if (!response.ok) {
            cookies.delete('auth_token', {
                path: '/'
            });

            cookies.delete('user_name', {
                path: '/'
            });

            return {
                name: '',
                token: ''
            }
        }

        const result = await response.json();

        return result
    }

    async login(formData) {
        if(this.token){
            return {
                success: false,
                message: "Anda sudah login sebelumnya",
                errors: [],
            }
        }

        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : email,
                "password" : password
            })
        });

        const result = await response.json();
        if(!response.ok){
            // Jika respons tidak ok, kembalikan error
            return fail(response.status, {
                success: false,
                message: result.message || 'Terjadi kesalahan saat menyimpan data',
                errors: result.errors || [],
                // values: { email, password } // Mengembalikan nilai input untuk mengisi kembali form
            });
        }

        // Set cookie token dan user
        cookies.set('auth_token', `${result.token}`, {
            httpOnly: true,
            path: '/',
            maxAge: (60 * 60) * 24 // 1 Hari
        });

        cookies.set('user_name', result.nama, {
            httpOnly: true,
            path: '/',
            maxAge: (60 * 60) * 24 // 1 Hari
        });

        cookies.set('message', "Login Berhasil", {
            httpOnly: true,
            path: '/',
            maxAge: 3.5
        });

        cookies.set('type', "success", {
            httpOnly: true,
            path: '/',
            maxAge: 3.5
        });
    }

    logout(cookies){
        if(cookies.get('auth_token') == null){  
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
    
            return
        }
    
        // delete all data users.
        cookies.delete('auth_token', { path: "/" });
        cookies.delete('user_name', { path: "/" });
    
        // Set message after logout
        cookies.set("message", "Anda berhasil logout", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });
    
        return
    }
}

export { Authentication }