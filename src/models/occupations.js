class Occupations {
    constructor(token) {
        this.token = token

        return "testing"
    }

    async index() {
        const response = await fetch(`${process.env.API_URL}/jabatan`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if (!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json();

        return result.results
    }

    async indexPagination({ page = 1, page_size = 10, ...params } = {}) {
        try {
            const queryString = new URLSearchParams({ page, page_size, ...params }).toString();
            const response = await fetch(`${process.env.API_URL}/jabatan?${queryString}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) throw new Error("Gagal mengambil data");

            const result = await response.json();

            return {
                occupations: result.results,  // Data hasil query
                total: result.count,          // Total seluruh data
                totalPages: result.page_count // Total halaman
            };
        } catch (error) {
            console.error("Error fetching occupations:", error);
            return { occupations: [], total: 0, totalPages: 0, error: error.message };
        }
    }

    async show(id) {
        const response = await fetch(`${process.env.API_URL}/jabatan/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if (!response.ok) return { error: "Terjadi kesalahan saat mengambil data" }
        const result = await response.json();

        return result
    }

    async store(formData) {
        const response = await fetch(`${process.env.API_URL}/jabatan/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_jabatan": formData.get("nama_jabatan")
            })
        });

        const result = await response.json();

        if (!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async update(id, formData) {
        const response = await fetch(`${process.env.API_URL}/jabatan/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                "nama_jabatan": formData.get("nama_jabatan")
            })
        });

        const result = await response.json();
        if (!response.ok) return { error: "Terjadi kesalahan saat menyimpan data" }

        return result
    }

    async delete(id) {
        const response = await fetch(`${process.env.API_URL}/jabatan/${parseInt(id)}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if (!response.ok) return { error: "Terjadi kesalahan saat menghapus data" }

        return response.ok
    }
}

export { Occupations }
