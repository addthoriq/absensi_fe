import { fail } from '@sveltejs/kit';
import { me } from '../../../models/users';

/** @type {import('./$types').Actions} */
const actions = {
    default: async ({ request, cookies }) => {
        try{
            // Ambil data form
            const formData  = await request.formData();
            const email     = formData.get('email');
            const password  = formData.get('password');

            // Kirim data ke API
            const response = await fetch(`${process.env.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email" : email,
                    "password" : password
                })
            });

            const result = await response.json();
            if(!response.ok){
                // Jika respons tidak ok, kembalikan error
                cookies.set('message', result.message, {
                    path: '/',
                    maxAge: 3.5
                });

                cookies.set('type', "error", {
                    path: '/',
                    maxAge: 3.5
                });
                
                return fail(response.status, {
                    success: false,
                    message: result.message || 'Terjadi kesalahan saat menyimpan data',
                    errors: result.errors || [],
                    // values: { email, password } // Mengembalikan nilai input untuk mengisi kembali form
                });
            }

            // Set cookie token dan user
            cookies.set('auth_token', `${result.token}`, {
                httpOnly: true,
                path: '/',
                maxAge: (60 * 60) * 24 // 1 Hari
            });

            cookies.set('user_name', result.nama, {
                httpOnly: true,
                path: '/',
                maxAge: (60 * 60) * 24 // 1 Hari
            });

            cookies.set("user_id", result.id, {
                httpOnly: true,
                path: "/",
                maxAge: (60 * 60) * 24
            })

            const user = await me(cookies)

            if(!user.token){
                throw redirect(302, "/auth/login")
            }

            cookies.set("role", user.jabatan, {
                httpOnly: true,
                path: "/",
                maxAge: (60 * 60) * 24
            })

            // Set message
            cookies.set('message', "Login Berhasil", {
                httpOnly: true,
                path: '/',
                maxAge: 3.5
            });

            cookies.set('type', "success", {
                httpOnly: true,
                path: '/',
                maxAge: 3.5
            });

            if(user.jabatan != "Admin"){
                return redirect(302, "/dashboard/attendances")
            }

            // Jika berhasil, return success
            return { success: true };

        } catch(error){
            return fail(500, { 
                success: false,
                message: 'Internal Server Error', 
            });
        }
    }
};

export { actions }