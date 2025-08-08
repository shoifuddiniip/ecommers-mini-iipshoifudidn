# Frontend System Summary

## Struktur Folder
- `src/` — Semua source code aplikasi React.
  - `pages/` — Halaman utama aplikasi:
    - `Login.tsx` — Halaman login, autentikasi ke backend (Basic Auth, JWT).
    - `Products.tsx` — Menampilkan daftar produk dari backend.
    - `Orders.tsx` — Menampilkan daftar order user (hanya jika login/JWT valid).
  - `store/` — State management (Redux Toolkit):
    - `userSlice.ts` — State user & token.
    - `index.ts` — Setup Redux store.
  - `App.tsx`, `index.tsx` — Entry point aplikasi, routing, integrasi Redux.
- `public/` — File statis dan HTML utama.

## Fitur Utama
- **Login**: Form login menggunakan axios, mengirim Basic Auth ke backend `/login`, menyimpan JWT ke Redux state.
- **Proteksi Route**: Halaman orders hanya bisa diakses jika user sudah login (JWT valid).
- **Products**: Fetch produk dari backend dan tampilkan dengan Material UI.
- **Orders**: Fetch order user dari backend, hanya jika sudah login.
- **State Management**: Redux Toolkit untuk menyimpan user/token.
- **Material UI**: Untuk tampilan modern dan responsif.

## Alur Autentikasi
- User login → backend mengembalikan JWT → JWT disimpan di Redux → setiap request ke endpoint protected (orders) mengirim header `Authorization: Bearer <token>`.

## Catatan Integrasi
- Semua endpoint backend sudah terproteksi JWT, kecuali `/login` dan `/products` (public).
- Jika JWT expired/invalid, user otomatis logout atau diminta login ulang.

## Best Practice
- Struktur folder terpisah (pages, store) untuk maintainability.
- State user/token terpusat di Redux.
- Komunikasi backend via axios, mudah diubah jika ada perubahan endpoint.
- Mudah menambah halaman baru (tinggal tambah di `pages/` dan routing di `App.tsx`).

---

Untuk menambah fitur, cukup tambahkan halaman di `pages/`, update routing di `App.tsx`, dan gunakan Redux jika perlu state global.
