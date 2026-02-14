// =====================================================
// Google Apps Script — Scout Complaint Router
// =====================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com → New Project
// 2. Delete default code → paste this entire file
// 3. Click "Deploy" → "New Deployment"
// 4. Type: "Web app"
// 5. Execute as: "Me"
// 6. Who has access: "Anyone"
// 7. Click "Deploy" → copy the Web App URL
// 8. Paste URL into complaints.html (APPS_SCRIPT_URL variable)
// =====================================================

// Google Sheet ID — Replace with your Sheet ID
// (found in the Sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';

// Sheet tab name mapping
const SHEET_MAP = {
    'عام': '🔵 عام',
    'البراعم': '🟡 البراعم',
    'الزهرات': '🩷 الزهرات',
    'الكشاف': '🟢 الكشاف',
    'المتقدم': '🔷 المتقدم',
    'القادة': '⬛ القادة',
    'القائدات': '🟣 القائدات'
};

// Handles POST requests from the complaints form
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.openById(SHEET_ID);

        // Generate complaint ID
        const dashboardSheet = ss.getSheetByName('📊 Dashboard');
        const lastRow = dashboardSheet.getLastRow();
        const id = 'SC-' + String(lastRow).padStart(4, '0');

        // Prepare row data
        const timestamp = new Date();
        const row = [
            id,                              // A: Complaint ID
            timestamp,                       // B: Timestamp
            data.name || '',                 // C: Full Name
            data.phone || '',                // D: Phone
            data.email || '',                // E: Email
            data.group || 'عام',            // F: Group
            data.type || 'شكوى',            // G: Type (شكوى/اقتراح/استفسار)
            data.priority || 'متوسط',       // H: Priority (عالي/متوسط/منخفض)
            data.message || '',              // I: Message
            'جديد',                          // J: Status (New)
            '',                              // K: Response
            ''                               // L: Response Date
        ];

        // 1. Write to Master Dashboard (always)
        dashboardSheet.appendRow(row);

        // 2. Route to group-specific sheet
        const groupSheetName = SHEET_MAP[data.group] || '🔵 عام';
        let groupSheet = ss.getSheetByName(groupSheetName);

        if (!groupSheet) {
            // Auto-create the sheet if it doesn't exist
            groupSheet = ss.insertSheet(groupSheetName);
            addHeaders(groupSheet);
        }

        groupSheet.appendRow(row);

        // 3. Apply conditional formatting for priority
        applyPriorityColor(dashboardSheet, lastRow + 1, data.priority);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true, id: id }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle GET requests (for testing)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'Scout Complaint Router is running' }))
        .setMimeType(ContentService.MimeType.JSON);
}

// =====================================================
// SETUP FUNCTION — Run this ONCE to create all sheets
// =====================================================
function setupSheets() {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // Headers for all sheets
    const headers = [
        'رقم الشكوى',    // A: ID
        'التاريخ والوقت', // B: Timestamp
        'الاسم الكامل',   // C: Name
        'رقم الهاتف',     // D: Phone
        'البريد الإلكتروني', // E: Email
        'المجموعة',       // F: Group
        'نوع الرسالة',    // G: Type
        'الأولوية',       // H: Priority
        'نص الرسالة',     // I: Message
        'الحالة',         // J: Status
        'الرد',           // K: Response
        'تاريخ الرد'      // L: Response Date
    ];

    // Sheet names to create
    const sheetNames = [
        '📊 Dashboard',
        '🔵 عام',
        '🟡 البراعم',
        '🩷 الزهرات',
        '🟢 الكشاف',
        '🔷 المتقدم',
        '⬛ القادة',
        '🟣 القائدات'
    ];

    sheetNames.forEach(name => {
        let sheet = ss.getSheetByName(name);
        if (!sheet) {
            sheet = ss.insertSheet(name);
        }
        addHeaders(sheet);

        // Format header row
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setValues([headers]);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#1a1a1a');
        headerRange.setFontColor('#ffffff');
        headerRange.setFontSize(11);
        headerRange.setHorizontalAlignment('center');

        // Set column widths
        sheet.setColumnWidth(1, 120);  // ID
        sheet.setColumnWidth(2, 160);  // Timestamp
        sheet.setColumnWidth(3, 150);  // Name
        sheet.setColumnWidth(4, 130);  // Phone
        sheet.setColumnWidth(5, 180);  // Email
        sheet.setColumnWidth(6, 100);  // Group
        sheet.setColumnWidth(7, 100);  // Type
        sheet.setColumnWidth(8, 80);   // Priority
        sheet.setColumnWidth(9, 400);  // Message
        sheet.setColumnWidth(10, 100); // Status
        sheet.setColumnWidth(11, 300); // Response
        sheet.setColumnWidth(12, 130); // Response Date

        // Freeze header row
        sheet.setFrozenRows(1);
    });

    // Delete default "Sheet1" if it exists
    const defaultSheet = ss.getSheetByName('Sheet1');
    if (defaultSheet && ss.getSheets().length > 1) {
        ss.deleteSheet(defaultSheet);
    }

    Logger.log('✅ All 8 sheets created and formatted successfully!');
}

// Add headers to a sheet
function addHeaders(sheet) {
    const headers = [
        'رقم الشكوى', 'التاريخ والوقت', 'الاسم الكامل', 'رقم الهاتف',
        'البريد الإلكتروني', 'المجموعة', 'نوع الرسالة', 'الأولوية',
        'نص الرسالة', 'الحالة', 'الرد', 'تاريخ الرد'
    ];

    if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
}

// Apply color coding based on priority
function applyPriorityColor(sheet, row, priority) {
    const priorityCell = sheet.getRange(row, 8); // Column H
    const statusCell = sheet.getRange(row, 10);  // Column J

    switch (priority) {
        case 'عالي':
            priorityCell.setBackground('#fee2e2').setFontColor('#991b1b');
            break;
        case 'متوسط':
            priorityCell.setBackground('#fef9c3').setFontColor('#854d0e');
            break;
        case 'منخفض':
            priorityCell.setBackground('#dcfce7').setFontColor('#166534');
            break;
    }

    // Status = "New" → light blue
    statusCell.setBackground('#dbeafe').setFontColor('#1e40af');
}

// =====================================================
// OPTIONAL: Email notification on new complaint
// =====================================================
function sendNotification(data, id) {
    const adminEmail = 'YOUR_ADMIN_EMAIL@gmail.com'; // Change this
    const subject = `شكوى جديدة #${id} — ${data.group} — ${data.type}`;
    const body = `
    شكوى جديدة وردت:
    
    الرقم: ${id}
    الاسم: ${data.name}
    الهاتف: ${data.phone}
    المجموعة: ${data.group}
    النوع: ${data.type}
    الأولوية: ${data.priority}
    
    الرسالة:
    ${data.message}
  `;

    MailApp.sendEmail(adminEmail, subject, body);
}
