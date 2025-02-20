class Attendances{
    constructor(token){
        this.token = token
    }

    async index(role, search = null){
        let url

        if(role == "Admin"){
            url = `${process.env.API_URL}/absensi/laporan`
        } else{
            url = `${process.env.API_URL}/absensi`
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        const result = await response.json()
        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }

        return result.results
    }

    async show(id) {
        const response = await fetch(`${process.env.API_URL}/absensi/laporan/${id}/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }

        return result
    }

    /**
     * Store a newly created attendance in storage.
     *
     * @param {FormData} data
     * @returns {Promise<Object|{error: string}>}
     */

    async store(data){
        const response = await fetch(`${process.env.API_URL}/kehadiran/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_kehadiran": data.get("nama_kehadiran"),
                "keterangan": data.get("keterangan")
            })
        });

        
        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async restore(data){
        const response = await fetch(`${process.env.API_URL}/absensi/masuk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "lokasi_masuk" : data.get("lokasi_masuk"),
                "keterangan" : data.get("keterangan"),
                "shift_id" : data.get("shift_id"),
                "kehadiran_id" : data.get('kehadiran_id'),
            })
        });

        const result = await response.json();
        if(response.status >= 500) return { error: "Terjadi kesalahan saat menyimpan data" }
        else if(!response.ok) return { error: result.message }

        return result
    }

    async update(id, data){
        const response = await fetch(`${process.env.API_URL}/absensi/keluar/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "lokasi_keluar": data.get("lokasi_keluar"),
            })
        });

        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
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