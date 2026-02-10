const xlsx = require("xlsx");

const parseFile = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  if (!rows || rows.length === 0) {
    throw new Error("Uploaded file is empty");
  }

  // Validate required fields
  for (let row of rows) {
    if (!row.FirstName || !row.Phone) {
      throw new Error(
        "Invalid file format. Required columns: FirstName, Phone"
      );
    }
  }

  return rows;
};

module.exports = parseFile;
