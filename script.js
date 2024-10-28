function hitungUsia() {
    const nama = document.getElementById("nama").value;
    const tanggalLahir = parseInt(document.getElementById("tanggal").value);
    let bulanLahir = document.getElementById("bulan").value;
    const tahunLahir = parseInt(document.getElementById("tahun").value);

    bulanLahir = konversiBulan(bulanLahir);

    if (bulanLahir === null || tanggalLahir < 1 || tanggalLahir > 31) {
        alert("Masukkan bulan atau tanggal yang valid!");
        return;
    }

    const sekarang = new Date();
    const lahir = new Date(tahunLahir, bulanLahir - 1, tanggalLahir);

    let tahun = sekarang.getFullYear() - lahir.getFullYear();
    let bulan = sekarang.getMonth() - lahir.getMonth();
    let hari = sekarang.getDate() - lahir.getDate();
    let detik = Math.floor((sekarang - lahir) / 1000);

    if (bulan < 0) {
        tahun--;
        bulan += 12;
    }

    if (hari < 0) {
        bulan--;
        const bulanSebelumnya = new Date(sekarang.getFullYear(), sekarang.getMonth(), 0).getDate();
        hari += bulanSebelumnya;
    }

    const hasilText = `Halo ${nama}, usia kamu saat ini adalah ${tahun} tahun, ${bulan} bulan, ${hari} hari, dikonversi menjadi: ${detik} detik.`;
    
    simpanHasilKeFile(hasilText);
}

function simpanHasilKeFile(hasil) {

    const hasilDiv = document.getElementById("hasil");
    hasilDiv.innerHTML = '<p class="loading">Loading...</p>';

    setTimeout(() => {
        const blob = new Blob([hasil], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'hasil_usia.txt';
        downloadLink.innerHTML = `<button class="download-button">Unduh Hasil Perhitungan</button>`;

        const ukuranFile = document.createElement('p');
        ukuranFile.className = 'download-info';
        ukuranFile.textContent = `(ukuran: ${(blob.size / 1024).toFixed(1)} KB)`;

        hasilDiv.innerHTML = '';
        hasilDiv.appendChild(downloadLink); 
        hasilDiv.appendChild(ukuranFile); 
    }, 1000); 
}


function konversiBulan(bulan) {
    const bulanMapping = {
        "januari": 1, "februari": 2, "maret": 3, "april": 4,
        "mei": 5, "juni": 6, "juli": 7, "agustus": 8,
        "september": 9, "oktober": 10, "november": 11, "desember": 12
    };

    if (!isNaN(bulan)) {
        const nomorBulan = parseInt(bulan);
        return nomorBulan >= 1 && nomorBulan <= 12 ? nomorBulan : null;
    }

    bulan = bulan.toLowerCase();
    return bulanMapping[bulan] || null;
}
