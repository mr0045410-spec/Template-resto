/* ============================================================================
 * brand-config.js — TEMPLATE "My Kitchen" (global template).
 *
 * Cara pakai: cukup ganti nilai-nilai di bawah ini, lalu simpan.
 * Halaman Kasir (pos.html) dan Owner (owner.html) otomatis mengikuti —
 * TIDAK perlu edit file lain.
 *
 * Template ini adalah contoh global: untuk klien resto lain, duplikat
 * folder ini lalu sesuaikan nama, warna, dan logo di file ini saja.
 * ========================================================================== */
(function () {
  'use strict';

  var BRAND = {
    // --- Identitas ---
    name: "My Kitchen",                        // nama pendek (alt logo, dsb)
    nameUpper: "MY KITCHEN",                   // versi kapital
    fullName: "My Kitchen Restaurant",         // dipakai di <title> tiap halaman
    receiptName: "MY KITCHEN",                 // header struk cetak & WA
    tagline: "Masakan Rumahan Penuh Cinta",    // sub-header struk
    address: "Jl. Kemang Raya No. 12, Jakarta Selatan", // alamat di struk
    phone: "0812-0000-0000",                   // no WA/telp di struk
    instagram: "@mykitchen.id",                // IG di struk & pesan WA
    logo: "./assets/logo-my-kitchen.svg",      // path logo (favicon + header + fallback)

    // --- Teknis / penamaan file ---
    slug: "mykitchen",   // dipakai di nama file export & QRIS mock
    orderPrefix: "MYK",  // prefix nomor struk, mis. MYK-20261002-0001

    // --- Warna brand (dipakai tailwind.config tiap halaman) ---
    // Design system: merah appetizing + aksen gold (ui-ux-pro-max)
    primaryColor: "#DC2626",       // 'brand'
    primaryColorHover: "#B91C1C",  // 'brand-hover'
    creamColor: "#FEF2F2",         // 'brand-cream' (latar hangat)
    darkColor: "#450A0A",          // 'brand-dark' (marun tua)
    accentColor: "#A16207",        // aksen gold

    // --- Font brand ---
    headingFont: "'Playfair Display SC', serif",
    bodyFont: "'Karla', sans-serif",

    // --- Judul halaman (<title>) ---
    pageTitles: {
      pos: "Kasir POS",
      owner: "Owner Dashboard",
      admin: "Admin Dashboard"
    },

    // --- Label-label khusus ---
    qrisLabel: "Scan QRIS My Kitchen",      // label di modal bayar QRIS
    insightLabel: "INSIGHT BISNIS MY KITCHEN", // header kartu insight owner
    portalName: "My Kitchen Owner Portal",  // tanda tangan pesan WA laporan
    adminHeading: "Admin My Kitchen",        // judul kartu login admin
    receiptThanks: "Terima kasih! Ditunggu kedatangannya kembali \uD83C\uDF7D\uFE0F\u2728" // footer pesan WA struk
  };

  window.BRAND = BRAND;

  /* Terapkan branding ke elemen statis HTML. Dijalankan otomatis;
   * kegagalan di sini TIDAK boleh merusak aplikasi. */
  function applyBranding() {
    try {
      // <title data-brand-page="pos|owner|admin">
      var titleEl = document.querySelector('title[data-brand-page]');
      if (titleEl) {
        var page = titleEl.getAttribute('data-brand-page');
        var label = (BRAND.pageTitles && BRAND.pageTitles[page]) || page;
        document.title = label + ' \u00B7 ' + BRAND.fullName;
      }
      // Favicon
      var fav = document.querySelector('link[rel="icon"]');
      if (fav && BRAND.logo) fav.href = BRAND.logo;
      // Logo <img data-brand-logo>
      var logos = document.querySelectorAll('img[data-brand-logo]');
      for (var i = 0; i < logos.length; i++) {
        if (BRAND.logo) logos[i].src = BRAND.logo;
        logos[i].alt = BRAND.name;
      }
      // Teks <... data-brand-text="namaField">
      var texts = document.querySelectorAll('[data-brand-text]');
      for (var j = 0; j < texts.length; j++) {
        var key = texts[j].getAttribute('data-brand-text');
        if (BRAND[key] !== undefined && BRAND[key] !== null) texts[j].textContent = BRAND[key];
      }
      // QRIS mock <img data-brand-qris>
      var qrisImgs = document.querySelectorAll('img[data-brand-qris]');
      for (var k = 0; k < qrisImgs.length; k++) {
        qrisImgs[k].src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='
          + encodeURIComponent(String(BRAND.slug).toUpperCase() + '-QRIS-MOCK');
        qrisImgs[k].alt = 'QRIS ' + BRAND.name;
      }
      // Link download Excel <a data-brand-excel>
      var excels = document.querySelectorAll('a[data-brand-excel]');
      for (var m = 0; m < excels.length; m++) {
        excels[m].setAttribute('download', 'laporan-penjualan-' + BRAND.slug + '.xlsx');
      }
    } catch (e) { /* branding gagal -> biarkan tampilan default, app tetap jalan */ }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyBranding);
    else applyBranding();
  }

  // Diekspos agar gampang dites / rebrand dinamis dari console: applyBranding()
  window.applyBranding = applyBranding;
})();
