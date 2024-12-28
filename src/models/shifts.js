class Shifts{
    constructor(token){
        this.token = token
    }

    async index(){
        const response = await fetch(`${process.env.API_URL}/shift`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json()

        return result.results
    }

    async show(id){
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json()

        return result
    }

    async store(formData){
        const response = await fetch(`${process.env.API_URL}/shift`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_shift" : formData.get("nama_shift"),
                "jam_mulai" : formData.get("jam_mulai")+":00",
                "jam_akhir" : formData.get("jam_akhir")+":00"
            })
        })
        const result = await response.json()

        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async update(id, formData){
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_shift" : formData.get("nama_shift"),
                "jam_mulai" : formData.get("jam_mulai"),
                "jam_akhir" : formData.get("jam_selesai")
            })
        })

        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }
        const result = await response.json()

        return result
    }

    async destroy(id){
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if(!response.ok) return { error: "Terjadi kesalahan saat menghapus data" }
        const result = await response.json()

        return result
    }
}

export { Shifts }