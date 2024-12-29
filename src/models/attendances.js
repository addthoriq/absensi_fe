class Attendances{
    constructor(token){
        this.token = token
    }

    async index(){
        const response = await fetch(`${process.env.API_URL}/kehadiran`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        
        const result = await response.json()

        return result.results
    }

    async show(id) {
        const response = await fetch(`${process.env.API_URL}/kehadiran/${id}`, {
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

    /**
     * Store a newly created attendance in storage.
     *
     * @param {FormData} data
     * @returns {Promise<Object|{error: string}>}
     */

    async store(data){
        const response = await fetch(`${process.env.API_URL}/kehadiran`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_kehadiran" : data.get("nama_kehadiran"),
                "keterangan" : data.get("keterangan")
            })
        });

        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async update(){
        const response = await fetch(`${process.env.API_URL}/kehadiran`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({

            })
        });
    }

    async destroy(id){
        const response = await fetch(`${process.env.API_URL}/kehadiran/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(!response.ok) return { error: "Terjadi kesalahan saat menghapus data" }
        return response.ok
    }
}

export { Attendances }