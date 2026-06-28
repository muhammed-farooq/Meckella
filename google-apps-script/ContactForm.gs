/**
 * Meckella Contact Form — Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file content, replacing any existing code
 * 3. Save (Ctrl+S), then Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy → Copy the Web App URL
 * 5. Paste the URL into your .env file as GOOGLE_SCRIPT_URL=<url>
 *
 * The sheet must have headers in Row 1:
 *   Timestamp | Name | Email | Message
 */

const SHEET_NAME = "Contact Submissions"; // Change this if your sheet tab has a different name

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create the sheet + headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test via GET (open the script URL in browser)
function doGet(e) {
  return ContentService.createTextOutput("Meckella Contact Form endpoint is live.");
}
