class Shifts {
    constructor(token) {
        this.token = token
    }

    async index() {
        const response = await fetch(`${process.env.API_URL}/shift`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if (!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json()

        return result.results
    }

    async indexPagination({ page = 1, page_size = 10, ...params } = {}) {
        try {
            const queryString = new URLSearchParams({ page, page_size, ...params }).toString();
            const response = await fetch(`${process.env.API_URL}/shift?${queryString}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) throw new Error("Gagal mengambil data");

            const result = await response.json();

            return {
                shifts: result.results,  // Data hasil query
                total: result.count,          // Total seluruh data
                totalPages: result.page_count // Total halaman
            };
        } catch (error) {
            console.error("Error fetching shifts:", error);
            return { shifts: [], total: 0, totalPages: 0, error: error.message };
        }
    }

    async show(id) {
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if (!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json()

        return result
    }

    async store(formData) {
        const response = await fetch(`${process.env.API_URL}/shift`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_shift": formData.get("nama_shift"),
                "jam_mulai": formData.get("jam_mulai") + ":00",
                "jam_akhir": formData.get("jam_akhir") + ":00"
            })
        })
        const result = await response.json()

        if (!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async update(id, formData) {
        console.log(formData);
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_shift": formData.get("nama_shift"),
                "jam_mulai": formData.get("jam_mulai") + ":00",
                "jam_akhir": formData.get("jam_akhir") + ":00",
            })
        })

        const result = await response.json()
        console.log(result.detail);
        if (!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async destroy(id) {
        const response = await fetch(`${process.env.API_URL}/shift/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        if (!response.ok) return { error: "Terjadi kesalahan saat menghapus data" }

        return response.ok
    }

    async assignShift(formData) {
        const response = await fetch(`${process.env.API_URL}/shift/${formData.get("shift_id")}/assign-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "user_id": formData.getAll("users"),
            })
        })

        const result = await response.json()
        if (!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }
}

export { Shifts }