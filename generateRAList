function generateRAList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet2"); // ubah jika sheet utama beda
  const selectedRA = sheet.getRange("U2").getValue();

  if (!selectedRA) {
    SpreadsheetApp.getUi().alert("⚠️ Pilih nama RA dulu di kolom U2!");
    return;
  }

  const ranges = [
    "A2:A17",
    "E2:E19",
    "I2:I19",
    "M2:M19",
    "Q2:Q19"
  ];

  let results = [];

  // Ambil kamar yang diceklis
  ranges.forEach(rangeText => {
    const range = sheet.getRange(rangeText);
    const values = range.getValues();
    const baseCol = range.getColumn();
    const rowStart = range.getRow();

    for (let r = 0; r < values.length; r++) {
      if (values[r][0] === true) {
        const row = rowStart + r;
        const room = sheet.getRange(row, baseCol + 1).getValue();
        const type = sheet.getRange(row, baseCol + 2).getValue();
        const status = sheet.getRange(row, baseCol + 3).getValue();
        results.push([room, type, status]);
      }
    }
  });

  if (results.length === 0) {
    SpreadsheetApp.getUi().alert("⚠️ Tidak ada kamar yang diceklis!");
    return;
  }

  // Buat sheet baru
  let newSheetName = selectedRA;
  let existing = ss.getSheetByName(newSheetName);
  if (existing) ss.deleteSheet(existing);
  const newSheet = ss.insertSheet(newSheetName);

  // Tambahkan judul & tanggal
  const today = Utilities.formatDate(new Date(), "GMT+7", "dd MMM yyyy");
  newSheet.getRange("A1").setValue("NAMA : " + selectedRA);
  newSheet.getRange("A1")
    .setFontWeight("bold")
    .setFontSize(13)
    .setVerticalAlignment("middle");

  newSheet.getRange("C1").setValue(today);
  newSheet.getRange("C1")
    .setFontSize(12)
    .setFontStyle("italic")
    .setHorizontalAlignment("right")
    .setVerticalAlignment("middle");

  // Header tabel
  newSheet.getRange("A2:C2").setValues([["ROOM", "TYPE ROOM", "ROOM STATUS"]]);
  newSheet.getRange("A2:C2")
    .setFontWeight("bold")
    .setBackground("#d9ead3")
    .setFontSize(11)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true);

  // Isi data
  newSheet.getRange(3, 1, results.length, 3).setValues(results);
  const dataRange = newSheet.getRange(3, 1, results.length, 3);
  dataRange
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontSize(13)
    .setBorder(true, true, true, true, true, true);

  // Auto resize & row height
  newSheet.autoResizeColumns(1, 3);
  for (let r = 1; r <= newSheet.getLastRow(); r++) {
    newSheet.setRowHeight(r, 25);
  }

  // Set lebar kolom manual (biar seimbang)
  newSheet.setColumnWidths(1, 3, 120);

  // Freeze header baris pertama dan kedua
  newSheet.setFrozenRows(2);

  // Reset checklist ke FALSE
  ranges.forEach(rangeText => {
    const range = sheet.getRange(rangeText);
    const rowCount = range.getNumRows();
    const falseValues = Array(rowCount).fill([false]);
    range.setValues(falseValues);
  });

  SpreadsheetApp.getUi().alert("✅ Sheet '" + selectedRA + "' berhasil dibuat dan checklist direset!");
}
