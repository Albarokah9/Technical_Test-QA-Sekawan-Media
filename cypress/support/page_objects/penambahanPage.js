const SELECTORS = {
    buttonTambah: 'button.btn.btn-aps.btn-sm[onclick="onAdd()"]',
    buttonSimpan: '#btn-simpan',
    fieldNoKK: '[name="pemilih_kk"]',
    fieldNoNIK: '[name="pemilih_nik"]',
    fieldNama: '[name="pemilih_nama"]',
    fieldAlamat: '#pemilih_alamat',
    fieldRT: '[name="pemilih_rt"]',
    fieldRW: '[name="pemilih_rw"]',
    fieldKelurahan: '#select2-pemilih_kelurahan_id-container',
    searchInputKelurahan: '.select2-search__field',
    resultKelurahan: '.select2-results__option',
    fieldTempatLahir: '[name="pemilih_tempat_lahir"]',
    fieldTanggalLahir: '#pemilih_tgl_lahir',
    dpHeaderSwitch: '.datepicker-switch',
    dpPrevButton: '.prev',
    dpYearSelector: '.datepicker-years .year',
    dpMonthSelector: '.datepicker-months .month',
    dpDaySelector: '.datepicker-days .day:not(.old):not(.new)',
    fieldStatusKawin: '#select2-pemilih_status_kawin-container',
    resulSudahKawin: '.select2-results__option',
    fieldCaleg: '#select2-pemilih_caleg_id-container',
    resultCaleg: '.select2-results__option',
    pilihTPS: '#select2-pemilih_tps_id-container',
    resultTPS: '.select2-results__options',
    errorNoKK : '#error_kk',
    errorNoNIK: '#error_nik',

};

class PenambahanPage {
    klikButtonTambah() {
        cy.get(SELECTORS.buttonTambah).click();
        return this;
    }
    assertFormInputPemilih() {
        cy.contains('h3.card-label', 'Form Input Pemilih').should('be.visible');
        return this;
    }
    klikButtonSimpan() {
        cy.get(SELECTORS.buttonSimpan).click();
    }
    inputNoKK(noKK) {
    cy.get(SELECTORS.fieldNoKK).clear().type(noKK);
    return this;
    }
    inputNoNIK(noNIK) {
        cy.get(SELECTORS.fieldNoNIK).clear().type(noNIK);
        return this;
    }
    inputNama() {
        cy.get(SELECTORS.fieldNama).type('Testing');
        return this;
    }
    inputAlamat() {
        cy.get(SELECTORS.fieldAlamat).type('Jl. Merdeka No. 1, Bogor');
        return this;
    }
    inputRT() {
        cy.get(SELECTORS.fieldRT).type('03');
        return this;
    }
    inputRW() {
        cy.get(SELECTORS.fieldRW).type('04');
        return this;
    }
    searchKelurahan() {
        cy.get(SELECTORS.fieldKelurahan).click();
        cy.get(SELECTORS.searchInputKelurahan)
            .should('be.visible')
            .type('Tasik Malaya', { delay: 100 });
        return this;
    }
    pilihKelurahan() {
        cy.contains(SELECTORS.resultKelurahan, 'Tasik Malaya')
            .should('be.visible')
            .click();
        return this;
    }
    inputTempatLahir() {
        cy.get(SELECTORS.fieldTempatLahir).type('Tempat Testing');
        return this;
    }
    // --- GETTER UNTUK DATEPICKER ---
    getFieldTanggalLahirSelector() {
        return SELECTORS.fieldTanggalLahir; 
    }
    getDPHeaderSwitchSelector() {
        return SELECTORS.dpHeaderSwitch;
    }
    getDPPrevButtonSelector() {
        return SELECTORS.dpPrevButton;
    }
    getDPYearSelector() {
        return SELECTORS.dpYearSelector;
    }
    getDPMonthSelector() {
        return SELECTORS.dpMonthSelector;
    }
    getDPDaySelector() {
        return SELECTORS.dpDaySelector;
    }
    piliJenisKelamin () {
        cy.contains('label', 'Laki-laki').click();
        return this;
    }
    pilihStatusKawin () {
        cy.get(SELECTORS.fieldStatusKawin).click();
        cy.contains(SELECTORS.resulSudahKawin, 'S - Sudah Kawin').click();
        return this;
    }
    pilihCaleg () {
        cy.get(SELECTORS.fieldCaleg).click();
        cy.contains(SELECTORS.resultCaleg, 'Dummy').click();
        return this;
    }
    pilihTPS () {
        cy.get(SELECTORS.pilihTPS).click();
        cy.contains(SELECTORS.resultTPS, 'Testing TPS').click();
        return this;
    }
    pilihStatus () {
        cy.contains('label', 'PEMILIH').click();
        return this;
    }
    asserErrorNoKKharus16 () {
        cy.get(SELECTORS.errorNoKK)
        .should('be.visible').and('contain.text', 'Jumlah karakter KK').and('contain.text', '16 karakter');
        return this;
    }
    assertErrorNoNIKHarus16 () {
    cy.get(SELECTORS.errorNoNIK)
        .should('be.visible')
        .and('contain.text', 'Jumlah karakter NIK')
        .and('contain.text', '16 karakter');
        return this;
}




    // Di dalam class PenambahanPage, method inputTanggalLahirTCPD001()

    // inputTanggalLahirTCPD001() {
    //     const TARGET_TAHUN = '2002';
    //     const TARGET_BULAN_SINGKAT = 'Apr';
    //     const TARGET_HARI = '9';
    //     const EXPECTED_VALUE = '09042002';

    //     cy.log(`Memilih tanggal lahir 09/04/2002 via Navigasi UI`);

    //     // 1. Buka Datepicker
    //     cy.get(SELECTORS.fieldTanggalLahir).click();

    //     // --- NAVIGASI TAMPILAN ---

    //     // 2. Klik Pertama: Hari -> Bulan
    //     cy.get('.datepicker-days ' + SELECTORS.dpHeaderSwitch)
    //       .should('be.visible') // Tunggu hingga header hari terlihat
    //       .click();

    //     // 3. Klik Kedua: Bulan -> Dekade Tahun
    //     // Penting: Sekarang kita berada di view 'Bulan', kita harus menargetkan header yang baru
    //     cy.get('.datepicker-months ' + SELECTORS.dpHeaderSwitch)
    //       .should('be.visible') // Tunggu hingga header bulan terlihat
    //       .click();

    //     // 4. Navigasi ke Rentang Tahun (Dekade)
    //     cy.log(`Mundur ke dekade ${TARGET_TAHUN}`);
    //     // Navigasi mundur 2 kali. Targetkan tombol .prev yang visible.
    //     cy.get('.datepicker-years ' + SELECTORS.dpPrevButton)
    //       .should('be.visible')
    //       .click();
    //     cy.get('.datepicker-years ' + SELECTORS.dpPrevButton).click();

    //     // 5. Pilih Tahun, Bulan, dan Hari
    //     cy.get(SELECTORS.dpYearSelector).contains(TARGET_TAHUN).click();
    //     cy.get(SELECTORS.dpMonthSelector).contains(TARGET_BULAN_SINGKAT).click();
    //     cy.get(SELECTORS.dpDaySelector).contains(TARGET_HARI).click();

    //     // 6. Assertion & Membersihkan Fokus
    //     cy.get(SELECTORS.fieldTanggalLahir).should('have.value', EXPECTED_VALUE);
    //     cy.get('body').click(0, 0);

    //     return this;
    // }
}

export default new PenambahanPage();
