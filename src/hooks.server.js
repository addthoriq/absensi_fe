import { redirect } from "@sveltejs/kit";
import { me } from "./models/users";

export async function handle({ event, resolve }) {
    const user = await me(event.cookies);
    const { pathname } = event.url;

    const publicPaths = ['/auth/login'];
    const isAdminPath = pathname.startsWith('/dashboard');

    if (pathname === '/') {
        if (user.token) {
            if (user.jabatan.nama_jabatan !== "Admin" && pathname !== '/dashboard') {
                throw redirect(302, '/dashboard');
            }
            if (user.jabatan.nama_jabatan === "Admin" && pathname !== '/dashboard/users') {
                throw redirect(302, '/dashboard/users');
            }
        }
        if (!user.token && pathname !== '/auth/login') {
            throw redirect(302, '/auth/login');
        }
    }

    if (isAdminPath && !user.token) {
        throw redirect(302, '/auth/login');
    }

    if (user.token && publicPaths.includes(pathname)) {
        throw redirect(302, '/dashboard');
    }

    return await resolve(event);
}