import React, { useState, useRef } from 'react';
import { Download, FileText, Calendar, CheckCircle, AlertCircle, Upload } from 'lucide-react';

export default function AMAScheduleConverter() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [message, setMessage] = useState('');
  const [eventCount, setEventCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [debugText, setDebugText] = useState('');
  const [icsContent, setIcsContent] = useState('');
  const [icsFilename, setIcsFilename] = useState('');
  const fileInputRef = useRef(null);

  // Laad PDF.js library
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Parse Nederlandse datum
  const parseDutchDate = (dateStr) => {
    const match = dateStr.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
    if (match) {
      const [, day, month, year] = match;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
  };

  // Parse tijd
  const parseTime = (timeStr) => {
    if (!timeStr || timeStr.trim() === '' || timeStr.trim() === 'dzv') return null;
    const match = timeStr.trim().match(/(\d{2}):?(\d{2})-(\d{2}):?(\d{2})/);
    if (match) {
      const [, startH, startM, endH, endM] = match;
      return {
        start: [parseInt(startH), parseInt(startM)],
        end: [parseInt(endH), parseInt(endM)]
      };
    }
    return null;
  };

  // Format datetime voor iCal
  const formatDateTimeICal = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  };

  // Maak event titel
  const createEventTitle = (module, lesson, teacher) => {
    const parts = [];
    if (module && module.trim() && !['', '-', 'None'].includes(module.trim())) {
      parts.push(`[${module.trim()}]`);
    }
    if (lesson && lesson.trim() && !['', '-', 'None'].includes(lesson.trim())) {
      parts.push(lesson.trim());
    }
    if (teacher && teacher.trim() && !['', '-', 'None'].includes(teacher.trim())) {
      parts.push(parts.length > 0 ? `- ${teacher.trim()}` : teacher.trim());
    }
    return parts.length > 0 ? parts.join(' ') : 'AMA Les';
  };

  // Parse PDF text naar events - robuustere versie
  const parseScheduleText = (text) => {
    const events = [];
    
    // Clean up multiple spaces
    const lines = text.split('\n')
      .map(l => l.replace(/\s+/g, ' ').trim())
      .filter(l => l.length > 0);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip headers en opmerkingen
      if (line.match(/Dag.*Tijd.*Locatie/i)) continue;
      if (line.startsWith('Opmerkingen')) continue;
      if (line === 'via Frontoffice' || line === 'HOP gereserveerd') continue;
      
      // Zoek datum in de regel (met of zonder weekdag)
      const dateMatch = line.match(/(\d{1,2}-\d{1,2}-\d{4})/);
      if (!dateMatch) continue;
      
      const dateStr = dateMatch[1];
      const currentDate = parseDutchDate(dateStr);
      if (!currentDate) continue;
      
      // Alles na de datum
      const afterDate = line.substring(dateMatch.index + dateStr.length).trim();
      if (!afterDate) continue;
      
      const parts = afterDate.split(' ');
      if (parts.length < 2) continue;
      
      // Eerste deel is tijd (of dzv of andere tekst)
      const timeStr = parts[0];
      const timeData = parseTime(timeStr);
      
      // Als eerste deel geen tijd is, probeer tweede deel
      let remaining;
      if (!timeData && timeStr !== 'dzv') {
        // Skip deze regel als er geen tijd patroon is
        continue;
      }
      
      remaining = parts.slice(1);
      
      if (remaining.length === 0) continue;
      
      const location = remaining[0] || '';
      const module = remaining.length > 1 ? remaining[1] : '';
      const lessonAndTeacher = remaining.slice(2).join(' ');
      
      let lesson = lessonAndTeacher;
      let teacher = '';
      
      // Probeer docent te extraheren
      const words = lessonAndTeacher.split(' ');
      if (words.length > 2) {
        const lastFew = words.slice(-4);
        const namePattern = /^[A-Z]\.?[A-Z]?\.?|^[A-Z][a-z]+|^(van|de|den|der)$/;
        
        let nameWordCount = 0;
        for (let j = lastFew.length - 1; j >= 0; j--) {
          if (lastFew[j].match(namePattern)) {
            nameWordCount++;
          } else {
            break;
          }
        }
        
        if (nameWordCount > 0 && nameWordCount < words.length - 1) {
          teacher = words.slice(-nameWordCount).join(' ');
          lesson = words.slice(0, -nameWordCount).join(' ');
        }
      }
      
      let startTime, endTime;
      if (!timeData || timeStr === 'dzv') {
        startTime = new Date(currentDate);
        startTime.setHours(8, 0, 0, 0);
        endTime = new Date(currentDate);
        endTime.setHours(16, 0, 0, 0);
        lesson = `(hele dag?) ${lesson}`.trim();
      } else {
        startTime = new Date(currentDate);
        startTime.setHours(timeData.start[0], timeData.start[1], 0, 0);
        endTime = new Date(currentDate);
        endTime.setHours(timeData.end[0], timeData.end[1], 0, 0);
      }
      
      const title = createEventTitle(module, lesson, teacher);
      
      events.push({
        start: startTime,
        end: endTime,
        title,
        location: location || ''
      });
    }
    
    return events;
  };

  // Genereer iCal bestand
  const generateICalendar = (events) => {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AMA Rooster Converter//NL',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:AMA Rooster',
      'X-WR-TIMEZONE:Europe/Amsterdam'
    ];

    events.forEach((event, i) => {
      const uid = `ama-${formatDateTimeICal(event.start)}-${i}@ama-rooster.nl`;
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${formatDateTimeICal(new Date())}`);
      lines.push(`DTSTART:${formatDateTimeICal(event.start)}`);
      lines.push(`DTEND:${formatDateTimeICal(event.end)}`);
      lines.push(`SUMMARY:${event.title}`);
      if (event.location) {
        lines.push(`LOCATION:${event.location}`);
      }
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  };

  // Download iCal bestand
  const downloadICS = (icsContent, filename) => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Verwerk PDF met pdfjs
  const processPDF = async (file) => {
    setStatus('processing');
    setMessage('PDF wordt verwerkt...');

    try {
      // Laad pdfjs-dist
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      // Lees file als ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      // Extraheer text van alle pagina's
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      // Debug: toon eerste 2000 chars
      setDebugText(fullText.substring(0, 2000) + '...');
      
      // Parse text naar events
      const events = parseScheduleText(fullText);
      
      if (events.length === 0) {
        throw new Error('Geen events gevonden in PDF');
      }

      // Genereer iCal
      const icsContent = generateICalendar(events);
      const filename = file.name.replace('.pdf', '.ics');
      
      // Bewaar voor download knop
      setIcsContent(icsContent);
      setIcsFilename(filename);
      
      // Ook direct downloaden
      downloadICS(icsContent, filename);
      
      setEventCount(events.length);
      setStatus('success');
      setMessage(`${events.length} events succesvol geconverteerd!`);
    } catch (error) {
      setStatus('error');
      setMessage(`Fout: ${error.message}`);
    }
  };

  // Drag & drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setFile(files[0]);
      processPDF(files[0]);
    } else {
      setStatus('error');
      setMessage('Upload alleen PDF bestanden');
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFile(files[0]);
      processPDF(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              AMA Rooster
            </h1>
          </div>
          <p className="text-slate-300 text-lg">
            PDF → iCalendar Converter
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/50 rounded-full border border-emerald-700/30">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-mono">DGOTC CLSK/MGD</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Drop Zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`p-12 border-2 border-dashed transition-all duration-300 ${
              isDragging
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-slate-600/50 bg-slate-900/30'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDragging ? 'bg-emerald-600 scale-110' : 'bg-slate-700'
              }`}>
                {status === 'processing' ? (
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Upload className={`w-10 h-10 transition-all duration-300 ${
                    isDragging ? 'text-white scale-110' : 'text-slate-400'
                  }`} />
                )}
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold text-white mb-2">
                  {isDragging ? 'Laat PDF los...' : 'Sleep je rooster hier'}
                </p>
                <p className="text-slate-400 mb-4">of</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={status === 'processing'}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 disabled:cursor-not-allowed"
                >
                  Selecteer PDF
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-300 font-mono text-sm">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {status !== 'idle' && (
            <div className="p-6 border-t border-slate-700/50">
              <div className={`flex items-start gap-4 p-4 rounded-xl ${
                status === 'success' ? 'bg-emerald-950/30 border border-emerald-700/30' :
                status === 'error' ? 'bg-red-950/30 border border-red-700/30' :
                'bg-slate-900/30 border border-slate-700/30'
              }`}>
                <div className="flex-shrink-0 mt-0.5">
                  {status === 'success' && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                  {status === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
                  {status === 'processing' && (
                    <div className="w-6 h-6 border-3 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold mb-1 ${
                    status === 'success' ? 'text-emerald-400' :
                    status === 'error' ? 'text-red-400' :
                    'text-slate-400'
                  }`}>
                    {message}
                  </p>
                  {status === 'success' && eventCount > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-slate-300">
                          .ics bestand automatisch gedownload
                        </span>
                      </div>
                      <button
                        onClick={() => downloadICS(icsContent, icsFilename)}
                        className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download opnieuw
                      </button>
                    </div>
                  )}
                  {(status === 'error' || status === 'success') && debugText && (
                    <details className="mt-3">
                      <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                        Debug: bekijk geëxtraheerde text ({eventCount} events gevonden)
                      </summary>
                      <pre className="mt-2 p-3 bg-slate-950 rounded text-xs text-slate-400 overflow-auto max-h-60 font-mono">
                        {debugText}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex flex-col gap-2 px-6 py-4 bg-slate-800/30 backdrop-blur rounded-xl border border-slate-700/30">
            <p className="text-slate-400 text-sm">
              <span className="font-mono text-emerald-500">✓</span> Formaat: <strong className="text-white">[MODULE]</strong> Lesnaam <strong className="text-white">- Docent</strong>
            </p>
            <p className="text-slate-400 text-sm">
              <span className="font-mono text-emerald-500">✓</span> Items zonder tijd: <strong className="text-white">08:00-16:00</strong> met prefix <strong className="text-white">(hele dag?)</strong>
            </p>
            <p className="text-slate-400 text-sm">
              <span className="font-mono text-emerald-500">✓</span> Compatibel met Apple Calendar, Google Calendar, Outlook
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}