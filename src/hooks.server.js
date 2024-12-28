import { redirect } from '@sveltejs/kit';
import { me } from './models/users';

export async function handle({ event, resolve }) {

    // Ambil cookie 'token'
    const user = await me(event.cookies);

    // Ambil URL
    const { pathname } = event.url;

    // URL yang tidak memerlukan token (login dan register)
    const publicPaths = ['/auth/login'];

    // Pengecekan jika URL dimulai dengan /admin
    const isAdminPath = pathname.startsWith('/dashboard');
    if (event.url.pathname === '/') {
        if(user.token){
            if(user.jabatan.nama_jabatan !== "Admin") throw redirect(302, '/dashboard/attendances');
            throw redirect(302, '/dashboard/users'); // Jika login, ke dashboard}
        }
        throw redirect(302, '/auth/login'); // Jika tidak login, ke login
    }

    if(event.url.pathname === '/dashboard'){
        if(user.token){
            if(user.jabatan.nama_jabatan !== "Admin") throw redirect(302, '/dashboard/attendances');
            throw redirect(302, '/dashboard/users');
        } // Jika login, ke dashboard
        throw redirect(302, '/auth/login'); // Jika tidak login, ke login
    }

    // Jika belum login dan mencoba mengakses /admin, redirect ke login
    if(!user.token && isAdminPath){
        throw redirect(302, '/auth/login');
    }

    // Jika sudah login dan mencoba mengakses halaman login atau register, redirect ke dashboard
    if (user.token && publicPaths.includes(pathname)) {
        throw redirect(302, '/dashboard');
    }

    // Lanjutkan ke permintaan berikutnya
    return await resolve(event);
}