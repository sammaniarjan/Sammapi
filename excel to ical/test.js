const XLSX = require('xlsx');
const fs = require('fs');

// Simple hash function for stable UIDs
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Generate stable UID based on content
function generateStableUID(event) {
  const key = `${event.dateKey}-${event.timeKey}-${event.module}-${event.lesson}`;
  return `ama-${hashCode(key)}@ama-rooster.nl`;
}

// Excel serial date naar JavaScript Date
function excelDateToJS(serial) {
  const utcDays = serial - 25569;
  const utcValue = utcDays * 86400 * 1000;
  return new Date(utcValue);
}

// Format date as key (YYYY-MM-DD)
function formatDateKey(date) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Parse tijd string
function parseTime(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const clean = timeStr.trim();
  if (clean.toLowerCase().startsWith('dzv')) return null;

  const match = clean.match(/(\d{2}):?(\d{2})-(\d{2}):?(\d{2})/);
  if (match) {
    return {
      startH: parseInt(match[1]),
      startM: parseInt(match[2]),
      endH: parseInt(match[3]),
      endM: parseInt(match[4])
    };
  }
  return null;
}

// Format datum voor iCal
function formatICalDate(date) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

// Maak event titel
function createTitle(module, lesson, teacher) {
  const parts = [];
  if (module && module.trim() && !['', '-'].includes(module.trim())) {
    parts.push(`[${module.trim()}]`);
  }
  if (lesson && lesson.trim()) {
    parts.push(lesson.trim());
  }
  if (teacher && teacher.trim()) {
    parts.push(`- ${teacher.trim()}`);
  }
  return parts.length > 0 ? parts.join(' ') : 'AMA Les';
}

// Parse Excel data naar events with stable UIDs
function parseExcelData(data) {
  const events = [];

  for (const row of data) {
    if (!row || row.length < 5) continue;
    if (row[0] === 'Dag' || row[1] === 'Datum') continue;

    const dateSerial = row[1];
    if (typeof dateSerial !== 'number') continue;

    const baseDate = excelDateToJS(dateSerial);
    if (isNaN(baseDate.getTime())) continue;

    const timeStr = row[2];
    const timeData = parseTime(timeStr);
    const location = (row[3] || '').toString().trim();
    const module = (row[4] || '').toString().trim();
    const lesson = (row[5] || '').toString().trim();
    const teacher = (row[6] || '').toString().trim();

    if (!lesson && !module) continue;

    let startTime, endTime, timeKey;

    if (timeData) {
      startTime = new Date(baseDate);
      startTime.setHours(timeData.startH, timeData.startM, 0, 0);
      endTime = new Date(baseDate);
      endTime.setHours(timeData.endH, timeData.endM, 0, 0);
      timeKey = `${timeData.startH.toString().padStart(2,'0')}${timeData.startM.toString().padStart(2,'0')}`;
    } else {
      startTime = new Date(baseDate);
      startTime.setHours(8, 0, 0, 0);
      endTime = new Date(baseDate);
      endTime.setHours(16, 0, 0, 0);
      timeKey = '0800';
    }

    const title = createTitle(module, lesson, teacher);
    const dateKey = formatDateKey(baseDate);

    const event = {
      start: startTime,
      end: endTime,
      title: title,
      location: location,
      dateKey: dateKey,
      timeKey: timeKey,
      module: module,
      lesson: lesson,
      teacher: teacher
    };

    event.uid = generateStableUID(event);
    events.push(event);
  }

  return events;
}

// Genereer iCal with stable UIDs
function generateICal(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AMA Rooster Converter//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:AMA Rooster',
    'X-WR-TIMEZONE:Europe/Amsterdam'
  ];

  events.forEach((event) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.uid}`);
    lines.push(`DTSTAMP:${formatICalDate(new Date())}`);
    lines.push(`DTSTART:${formatICalDate(event.start)}`);
    lines.push(`DTEND:${formatICalDate(event.end)}`);
    lines.push(`SUMMARY:${event.title}`);
    if (event.location) {
      lines.push(`LOCATION:${event.location}`);
    }
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

// Test
console.log('=== TEST: Excel naar iCal Convertor met Stabiele UIDs ===\n');

const workbook = XLSX.readFile('./voorbeeld rooster/test rooster 2502.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log(`Sheet: ${sheetName}`);
console.log(`Totaal rijen: ${rows.length}\n`);

const events = parseExcelData(rows);
console.log(`Events gevonden: ${events.length}\n`);

console.log('=== Eerste 10 events met UIDs ===');
events.slice(0, 10).forEach((e, i) => {
  console.log(`${i + 1}. ${e.start.toLocaleDateString('nl-NL')} ${e.start.toLocaleTimeString('nl-NL', {hour:'2-digit', minute:'2-digit'})}-${e.end.toLocaleTimeString('nl-NL', {hour:'2-digit', minute:'2-digit'})} | ${e.title}`);
  console.log(`   UID: ${e.uid}`);
  if (e.location) console.log(`   Locatie: ${e.location}`);
});

// Genereer en schrijf iCal
const icsContent = generateICal(events);
fs.writeFileSync('./test-output.ics', icsContent);
console.log('\n=== iCal bestand geschreven naar test-output.ics ===');

// Validatie check
console.log('\n=== Validatie ===');
console.log(`- VCALENDAR header: ${icsContent.includes('BEGIN:VCALENDAR') ? 'OK' : 'FAIL'}`);
console.log(`- VCALENDAR footer: ${icsContent.includes('END:VCALENDAR') ? 'OK' : 'FAIL'}`);
console.log(`- VEVENT count: ${(icsContent.match(/BEGIN:VEVENT/g) || []).length} (verwacht: ${events.length})`);
console.log(`- Timezone: ${icsContent.includes('Europe/Amsterdam') ? 'OK' : 'FAIL'}`);

// Test UID stabiliteit
console.log('\n=== UID Stabiliteit Test ===');
const events2 = parseExcelData(rows); // Parse opnieuw
const stableUIDs = events.every((e, i) => e.uid === events2[i].uid);
console.log(`- UIDs blijven stabiel bij re-parse: ${stableUIDs ? 'OK' : 'FAIL'}`);

// Check for unique UIDs
const uniqueUIDs = new Set(events.map(e => e.uid));
console.log(`- Unieke UIDs: ${uniqueUIDs.size} van ${events.length} (${uniqueUIDs.size === events.length ? 'OK - geen duplicaten' : 'WAARSCHUWING - duplicaten gevonden'})`);

if (uniqueUIDs.size !== events.length) {
  // Find duplicates
  const uidCounts = {};
  events.forEach(e => { uidCounts[e.uid] = (uidCounts[e.uid] || 0) + 1; });
  const duplicates = Object.entries(uidCounts).filter(([, count]) => count > 1);
  console.log('  Duplicaat UIDs:');
  duplicates.forEach(([uid, count]) => {
    const dupeEvents = events.filter(e => e.uid === uid);
    console.log(`  - ${uid} (${count}x):`);
    dupeEvents.forEach(e => console.log(`    ${e.dateKey} | ${e.title}`));
  });
}
