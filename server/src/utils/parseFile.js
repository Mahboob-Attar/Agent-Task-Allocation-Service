const xlsx = require("xlsx");

const parseFile = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  if (!rows || rows.length === 0) {
    const error = new Error("Uploaded file is empty");
    error.statusCode = 400;
    throw error;
  }

  const requiredColumns = ["FirstName", "Phone", "Notes"];

  for (let row of rows) {
    for (let column of requiredColumns) {
      if (!(column in row)) {
        const error = new Error(
          "Invalid file format. Required columns: FirstName, Phone, Notes"
        );
        error.statusCode = 400;
        throw error;
      }
    }
  }

  return rows;
};

module.exports = parseFile;
