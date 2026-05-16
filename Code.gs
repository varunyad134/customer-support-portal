function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Customer Support Portal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


var SHEET_ID = '1lArxMCRokGaGt9Sk4XXqQxFFk4hZthiwHhw76Fn5Z68';

function getSheet(sheetName) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(sheetName);
}


function getTickets() {
  try {
    var sheet = getSheet('Tickets');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var tickets = [];
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = String(data[i][j]);
      }
      tickets.push(obj);
    }
    return JSON.stringify({ success: true, tickets: tickets });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}

function getTeamMembers() {
  try {
    var sheet = getSheet('Team');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var members = [];
    
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var val = data[i][j];
        if (val instanceof Date) {
          obj[headers[j]] = val.toLocaleDateString('en-IN');
        } else if (val === null || val === undefined) {
          obj[headers[j]] = '';
        } else {
          obj[headers[j]] = String(val);
        }
      }
      members.push(obj);
    }
    
    return JSON.stringify({ success: true, members: members });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}
function createTicket(data) {
  try {
    var sheet = getSheet('Tickets');
    var ticketId = 'TKT-' + new Date().getTime();
    var createdDate = new Date().toLocaleDateString('en-IN');
    sheet.appendRow([
      ticketId,
      data.customerName,
      data.phone,
      data.email,
      data.orderId,
      data.issueDescription,
      'Pending',
      data.channel,
      data.escalatedTo,
      data.queryTheme,
      data.actionTaken,
      createdDate,
      '',
      data.notes
    ]);
    return JSON.stringify({ success: true, ticketId: ticketId });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}

function updateTicket(ticketId, updatedData) {
  try {
    var sheet = getSheet('Tickets');
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === ticketId) {
        var row = i + 1;
        sheet.getRange(row, 2).setValue(updatedData.customerName);
        sheet.getRange(row, 3).setValue(updatedData.phone);
        sheet.getRange(row, 4).setValue(updatedData.email);
        sheet.getRange(row, 5).setValue(updatedData.orderId);
        sheet.getRange(row, 6).setValue(updatedData.issueDescription);
        sheet.getRange(row, 7).setValue(updatedData.status);
        sheet.getRange(row, 8).setValue(updatedData.channel);
        sheet.getRange(row, 9).setValue(updatedData.escalatedTo);
        sheet.getRange(row, 10).setValue(updatedData.queryTheme);
        sheet.getRange(row, 11).setValue(updatedData.actionTaken);
        sheet.getRange(row, 14).setValue(updatedData.notes);
        if (updatedData.status === 'Resolved') {
          sheet.getRange(row, 13).setValue(new Date().toLocaleDateString('en-IN'));
        }
        return JSON.stringify({ success: true });
      }
    }
    return JSON.stringify({ success: false, error: 'Ticket not found' });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}

function getTickets() {
  try {
    var sheet = getSheet('Tickets');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var tickets = [];
    
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var val = data[i][j];
        // Convert everything safely
        if (val instanceof Date) {
          obj[headers[j]] = val.toLocaleDateString('en-IN');
        } else if (val === null || val === undefined) {
          obj[headers[j]] = '';
        } else {
          obj[headers[j]] = String(val);
        }
      }
      tickets.push(obj);
    }
    
    return JSON.stringify({ success: true, tickets: tickets });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}

function getOrderDetails(orderId) {
  try {
    var sheet = getSheet('Orders');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) == String(orderId)) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = String(data[i][j]);
        }
        return JSON.stringify({ success: true, order: obj });
      }
    }
    return JSON.stringify({ success: false, error: 'Order not found' });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}

function filterTickets(filters) {
  try {
    var result = JSON.parse(getTickets());
    if (!result.success) return JSON.stringify(result);
    var filtered = result.tickets;
    if (filters.status && filters.status !== 'All') {
      var temp = [];
      for (var i = 0; i < filtered.length; i++) {
        if (filtered[i]['Status'] === filters.status) temp.push(filtered[i]);
      }
      filtered = temp;
    }
    if (filters.channel && filters.channel !== 'All') {
      var temp2 = [];
      for (var i = 0; i < filtered.length; i++) {
        if (filtered[i]['Channel'] === filters.channel) temp2.push(filtered[i]);
      }
      filtered = temp2;
    }
    return JSON.stringify({ success: true, tickets: filtered });
  } catch(e) {
    return JSON.stringify({ success: false, error: e.toString() });
  }
}













