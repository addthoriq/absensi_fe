async function me(cookies){
    try{
        const token = cookies.get("auth_token")

        if(!token) return {
            name: '',
            token: '',
            jabatan: ""
        }

        const response = await fetch(`${process.env.API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Reset all token and data user in cookies
        if(!response.ok){
            cookies.delete('auth_token', {
                path: '/'
            });

            cookies.delete('user_name', {
                path: '/'
            });

            return {
                name: '',
                token: '',
                jabatan: ""
            }
        }

        const result = await response.json();
        cookies.set("role", result.jabatan.nama_jabatan, { path: "/" });

        return {
                name: result.nama,
                token: token,
                jabatan: result.jabatan.nama_jabatan
        }
    } catch(error){
        return {
            name: '',
            token: '',
            jabatan: ""
        }
    }
}

class Users{
    constructor(token) {
        this.token = token
    }

    async index() {
        const response = await fetch(`${process.env.API_URL}/user-management`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }

        const result = await response.json();

        return result
    }

    async show(id) {
        const response = await fetch(`${process.env.API_URL}/user-management/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }

        const result = await response.json();

        return result
    }

    async store(data) {
        const response = await fetch(`${process.env.API_URL}/user-management`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_user" : data.get("nama_user"),
                "email" : data.get("email"),
                "password" : data.get("password"),
                "jabatan" : parseInt(data.get("jabatan"))
            })
        });

        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return response
    }

    async update(id, data) {
        const response = await fetch(`${process.env.API_URL}/user-management/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_user" : data.get("nama_user"),
                "email" : data.get("email"),
                "password" : data.get("password"),
                "jabatan" : parseInt(data.get("jabatan"))
            })
        });

        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return response
    }

    async destroy(id) {
        const response = await fetch(`${process.env.API_URL}/user-management/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(!response.ok) return { error: "Terjadi kesalahan saat menghapus data" }

        return response.ok
    }
}

export { me, Users }