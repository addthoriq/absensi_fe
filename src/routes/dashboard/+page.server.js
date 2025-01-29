import { MONTH_IN_YEAR } from "../../lib/months"
import { Statistic } from "../../models/statistic"
import { me } from "../../models/users"

async function load({ cookies }){
    const user = await me(cookies)

    if(!user.token) throw redirect(302, "/auth/login")

    const now = new Date()
    const statistic = new Statistic(cookies)
    
    let dailyData = [], dailyLabels = [], monthlyData = [], monthlyLabels = []
    
    // Ambil data monthly hanya untuk bulan saat ini
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // Bulan dalam format 1-12
    const lastDay = new Date(currentYear, currentMonth, 0).getDate() // Hari terakhir bulan ini
    
    const firstDateMonthly = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`
    const lastDateMonthly = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${lastDay}`    
    const dataMonthly = await statistic.monthly(user.jabatan, firstDateMonthly, lastDateMonthly)
    // monthly.push(dataMonthly)

    console.log(dataMonthly);
    dataMonthly.data.map((data) => {
        monthlyLabels.push(data.tanggal_absen)
        monthlyData.push(data.count)
    })
    
    // Loop untuk mendapatkan data harian dari 2 bulan terakhir hingga saat ini
    for (let i = 2; i >= 0; i--) {
        let date = new Date(now)
        date.setMonth(now.getMonth() - i)
    
        let year = date.getFullYear()
        let month = date.getMonth() + 1 
        let last = new Date(year, month, 0).getDate()
    
        let firstDate = `${year}-${String(month).padStart(2, '0')}-01`
        let lastDate = `${year}-${String(month).padStart(2, '0')}-${last}`
    
        const dataDaily = await statistic.daily(user.jabatan, firstDate, lastDate)
        dailyLabels.push(MONTH_IN_YEAR[month -1])
        dailyData.push(dataDaily.count)
    }
    
    return {
        monthlyData,
        monthlyLabels,
        dailyData,
        dailyLabels
    }
}

export { load }