class Statistic{
    constructor(cookies = null) {
        this.token = cookies.get("auth_token")
    }

    async monthly(role, startDate, endDate){
        let url
        if(role == "Admin"){
            url = `${process.env.API_URL}/dashboard/admin/volume-month?start_date=${startDate}&end_date=${endDate}`
        } else{
            url = `${process.env.API_URL}/dashboard/user/volume-month?start_date=${startDate}&end_date=${endDate}`
        }
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        const result = await response.json()
        if(!response.ok){
            return { error: "Terjadi kesalahan saat mendapatkan data" }
        }

        return result
    }

    async daily(role,  startDate, endDate){

        let url
        if(role == "Admin"){
            url = `${process.env.API_URL}/dashboard/admin/count-day?start_date=${startDate}&end_date=${endDate}`
        } else{
            url = `${process.env.API_URL}/dashboard/user/count-day?start_date=${startDate}&end_date=${endDate}`
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        
        const result = await response.json()
        if(!response.ok){
            return { error: "Terjadi kesalahan saat mendapatkan data" }
        }

        return result
    }
}

export { Statistic }