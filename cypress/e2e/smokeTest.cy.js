it('testin1', function () {
    cy.visit('https://aps-rejanglebong.skwn.dev/dev/');
    cy.on('uncaught:exception', () => false);

    cy.get('[name="username"]').type('candidat');

    cy.get('#password').type('password123');
    cy.get('#kt_login_signin_submit').click();
    cy.get('#kt_aside_menu li:nth-child(3) .menu-text').click();
    cy.get('#cardDataPemilih .font-weight-bolder').click();

    cy.get('[name="pemilih_kk"]').type('1234567892222222');

    cy.get('[name="pemilih_nik"]').type('1234567892222222');
    //cy.get('#form_inputpemilih div:nth-child(3) .col-lg-8').click();

    cy.get('[name="pemilih_nama"]').type('Testing');
    cy.get('#pemilih_alamat')
        .should('be.visible')
        .clear()
        .type('Jl. Merdeka No. 1, Bogor');

    cy.get('[name="pemilih_rt"]').type('03');

    cy.get('[name="pemilih_rw"]').type('004');
    cy.get('#select2-pemilih_kelurahan_id-container').click();
    cy.contains('.select2-results__option', 'Adirejo')
        .should('be.visible')
        .click();

    cy.get('[name="pemilih_tempat_lahir"]').type('TESTING');
    cy.get('[name="pemilih_tgl_lahir"]')
        .scrollIntoView()
        .clear()
        .type('02092025{enter}{esc}')
        .trigger('change')
        .blur();
    cy.get('#select2-pemilih_status_kawin-container').click();
    cy.get('.select2-results__option').contains('Sudah Kawin').click();
    cy.get('#select2-pemilih_caleg_id-container').click();
    cy.get('.select2-results__option').contains('Dummy').click();
    cy.get('#select2-pemilih_tps_id-container').click().type('{esc}');
    cy.get('div[data-field="pemilih_tps_id"].fv-help-block')
        .should('be.visible')
        .and('contain', 'TPS  tidak boleh kosong.');
});

it.only('testing2', function () {
    cy.visit('https://aps-rejanglebong.skwn.dev/dev/');
    cy.on('uncaught:exception', () => false);

    cy.get('[name="username"]').type('candidat');

    cy.get('#password').type('password123');
    cy.get('#kt_login_signin_submit').click();
    cy.get('#kt_aside_menu li:nth-child(3) .menu-text').click();
    cy.get('#cardDataPemilih .font-weight-bolder').click();

    cy.get('[name="pemilih_kk"]').type('1234567892222222');

    cy.get('[name="pemilih_nik"]').type('1234567892222222');
    cy.get('#form_inputpemilih div:nth-child(3) .col-lg-8').click();

    cy.get('[name="pemilih_nama"]').type('Testing');
    cy.get('#pemilih_alamat')
        .should('be.visible')
        .clear()
        .type('Jl. Merdeka No. 1, Bogor');

    cy.get('[name="pemilih_rt"]').type('03');

    cy.get('[name="pemilih_rw"]').type('04');
    cy.get('#select2-pemilih_kelurahan_id-container').click();
    cy.contains('.select2-results__option', 'Tasik Malaya')
        .should('be.visible')
        .click();

    cy.get('[name="pemilih_tempat_lahir"]').type('TESTING');
    // cy.get('[name="pemilih_tgl_lahir"]')
    //     .scrollIntoView()
    //     .clear()
    //     .type('04/092002{enter}{esc}')
    //     .trigger('change')
    //     .blur();
    // Baris 35: Buka datepicker
    cy.get('#pemilih_tgl_lahir').click();

    // --- Navigasi ke Tampilan Dekade (Tahun) ---
    // 1. Klik header (misalnya: September 2025) untuk pindah ke tampilan Bulan
    cy.get('.datepicker-days .datepicker-switch').click();

    // 2. Klik header (misalnya: 2025) untuk pindah ke tampilan Tahun/Dekade
    cy.get('.datepicker-months .datepicker-switch').click();

    // --- Navigasi ke Rentang Tahun 2000-2009 ---
    // Kita berada di sekitar 2020-2029. Perlu mundur 2 kali.
    cy.log('Mundur ke dekade 2000-2009');

    // Mengklik panah kiri (Previous) 2 kali
    cy.get('.datepicker-years .prev').click(); // Mundur ke 2010-2019
    cy.get('.datepicker-years .prev').click(); // Mundur ke 2000-2009

    // --- Pilih Tahun 2002 ---
    // Selector untuk tahun di tampilan dekade
    cy.get('.datepicker-years .year').contains('2002').click();

    // --- Pilih Bulan April (04) ---
    // Selector untuk bulan di tampilan bulan
    cy.get('.datepicker-months .month').contains('Apr').click();

    // --- Pilih Tanggal 9 ---
    // Selector untuk hari/tanggal 9 (pastikan tidak termasuk .old atau .new)
    cy.get('.datepicker-days .day:not(.old):not(.new)').contains('9').click();

    // --- Assertion untuk Memastikan Nilai Tersimpan ---
    // Berdasarkan format placeholder dd/mm/yyyy
    cy.get('#pemilih_tgl_lahir').should('have.value', '09042002');

    // Pastikan pop-up kalender hilang (jika klik tanggal tidak menghilangkannya)
    cy.get('body').click(0, 0); // Klik area kosong untuk menghilangkan fokus secara paksa.
    cy.contains('label', 'Laki-laki').click();
    cy.get('#select2-pemilih_status_kawin-container').click();
    cy.get('.select2-results__option').contains('Sudah Kawin').click();
    cy.get('#select2-pemilih_caleg_id-container').click();
    cy.get('.select2-results__option').contains('Dummy').click();
    cy.get('#select2-pemilih_tps_id-container').click();
    cy.get('.select2-results__options', { timeout: 10000 }).should(
        'be.visible'
    );
    cy.get('.select2-results__option')
        .should('have.length', 1)
        .first()
        .should('contain.text', 'Testing TPS')
        .click();
    cy.get('#select2-pemilih_tps_id-container').should(
        'contain.text',
        'Testing TPS'
    );
    cy.contains('label', 'PEMILIH').click();
    cy.get('#btn-simpan').click();
});
