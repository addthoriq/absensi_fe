class Occupations{
    constructor(token){
        this.token = token

        return "testing"
    }

    async index(){
        const response = await fetch(`${process.env.API_URL}/jabatan`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
    
        if(!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json();
    
        return result.results
    }

    async show(id){
        const response = await fetch(`${process.env.API_URL}/jabatan/${id}`, {
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

    async store(formData){
        const response = await fetch(`${process.env.API_URL}/jabatan/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_jabatan" : formData.get("nama_jabatan")
            })
        });
    
        const result = await response.json();
    
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }
    
        return result
    }

    async update(id, formData){
        const response = await fetch(`${process.env.API_URL}/jabatan/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_jabatan" : formData.get("nama_jabatan")
            })
        });

        const result = await response.json();
        if(!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }    
    
        return result
    }

    async delete(id){
        const response = await fetch(`${process.env.API_URL}/jabatan/${parseInt(id)}`, {
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

export { Occupations }