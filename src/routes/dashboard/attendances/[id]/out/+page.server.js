import { fail, redirect } from '@sveltejs/kit'
import { me } from '../../../../../models/users';
import { Attendances } from '../../../../../models/attendances';

async function load({ cookies, url }) {
    const user = await me(cookies)

    if (!user.token) {
        cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
        cookies.set("type", "error", { path: "/", maxAge: 3.5 });
        throw redirect(302, "/auth/login")
    }

    const attendances = new Attendances(user.token)

    // Ambil koordinat dari parameter URL (dikirim oleh frontend)
    const latitude = url.searchParams.get("lat");
    const longitude = url.searchParams.get("lng");

    let location = null;
    if (latitude && longitude) {
        location = await attendances.checkCoordinate(latitude, longitude);
    }

    //check-shift
    const response = await fetch(`${process.env.API_URL}/absensi/check-shift`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const shift = await response.json();

    return {
        user: { name: user.name },
        location: location,
        check_shift: shift,
    }
}

let actions = {
    /**
     * Handle default action for this route. This action will be call when
     * user submit the form with method POST.
     * @param {import('@sveltejs/kit').RequestEvent} event
     * @returns {import('@sveltejs/kit').Response} response
     */
    default: async ({ request, cookies, params }) => {
        const user = await me(cookies)

        if (!user.token) {
            cookies.set("message", "Anda harus login terlebih dahulu", { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            throw redirect(302, "/auth/login")
        }

        const formData = await request.formData()
        formData.set("nama_kehadiran", user.name)
        formData.set("keterangan", "Hadir")
        formData.set("lokasi_keluar", `${formData.get("lat")},${formData.get("long")}`)

        const attendances = new Attendances(user.token)
        const result = await attendances.update(params.id, formData)

        if (result.error) {
            cookies.set("message", result.error, { path: "/", maxAge: 3.5 });
            cookies.set("type", "error", { path: "/", maxAge: 3.5 });
            return fail(400, {
                message: result.error,
                values: {
                    nama_kehadiran: formData.get("nama_kehadiran"),
                    keterangan: formData.get("keterangan")
                }
            })
        }

        cookies.set("message", "Absensi Berhasil Disimpan", { path: "/", maxAge: 3.5 });
        cookies.set("type", "success", { path: "/", maxAge: 3.5 });

        return redirect(302, "/dashboard/attendances")
    }
}

export { load, actions }