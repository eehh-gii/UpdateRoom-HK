function updateSelectedRooms() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  // Ganti "Sheet2" dengan sheet kamu
  if (sheet.getName() !== "Sheet2") return;

  const targetCell = sheet.getRange("U4");
  const targetStatus = String(targetCell.getValue()).trim();
  let targetColor = targetCell.getBackground();

  if (!targetStatus) {
    SpreadsheetApp.getUi().alert("⚠️ Pilih status dulu di kolom U4");
    return;
  }

  // fallback warna otomatis kalau dropdown tidak punya warna manual
  const defaultColors = {
    "VC": "#00FFFF",
    "VD": "#ff0000",
    "ED": "#FFD580", 
    "OC": "#ffff00",
    "OO": "#ffff00",
    "MOD": "#ff9900"
  };
  if (targetColor === "#ffffff" && defaultColors[targetStatus]) {
    targetColor = defaultColors[targetStatus];
  }

  // area kamar A2:T19
  const startRow = 2;
  const endRow = 19;
  const startCol = 1;
  const endCol = 20; // kolom T = 20

  // blok setiap 4 kolom (A-D, E-H, I-L, M-P, Q-T)
  const blockWidth = 4;

  let changedRooms = [];

  for (let col = startCol; col <= endCol; col += blockWidth) {
    const checkboxCol = col;
    const roomCol = col + 1;
    const statusCol = col + 3;

    for (let row = startRow; row <= endRow; row++) {
      const checkCell = sheet.getRange(row, checkboxCol);
      const isChecked = checkCell.getValue();

      if (isChecked === true) {
        const roomNumber = sheet.getRange(row, roomCol).getValue();
        const statusCell = sheet.getRange(row, statusCol);

        // ubah status + warna
        statusCell.setValue(targetStatus);
        statusCell.setBackground(targetColor);
        statusCell.setFontWeight("bold");
        statusCell.setHorizontalAlignment("center");
        statusCell.setVerticalAlignment("middle");

        // ubah warna teks otomatis jika warna gelap
        const darkColors = ["#000000"];
        statusCell.setFontColor(
          darkColors.includes(targetColor.toLowerCase()) ? "white" : "black"
        );

        // uncheck otomatis
        checkCell.setValue(false);
        changedRooms.push(roomNumber || `(baris ${row})`);
      }
    }
  }

  if (changedRooms.length > 0) {
    SpreadsheetApp.getUi().alert(
      `✅ ${changedRooms.length} kamar berhasil diubah ke "${targetStatus}".\n\nKamar: ${changedRooms.join(", ")}`
    );
  } else {
    SpreadsheetApp.getUi().alert("⚠️ Tidak ada kamar yang ceklist!");
  }
}
