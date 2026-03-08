const { writeFileSync } = require("fs");
const { createCanvas } = require("canvas");

// Generate a dummy Handwritten Referral Letter (Surat Rujukan) Image
const width = 800;
const height = 1000;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Background (slightly yellowish paper)
ctx.fillStyle = "#fdfbf7";
ctx.fillRect(0, 0, width, height);

// Draw some lines
ctx.strokeStyle = "#e5e5e5";
ctx.lineWidth = 1;
for (let i = 100; i < height; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
}

// Emulate handwritten text (Manglish/Malay mix)
ctx.fillStyle = "#1a1a24";
ctx.font = '24px "Chalkboard SE", "Comic Sans MS", cursive';
ctx.fillText("KLINIK KESIHATAN KUALA LUMPUR", 200, 60);
ctx.fillText("SURAT RUJUKAN", 300, 120);

ctx.font = '20px "Chalkboard SE", "Comic Sans MS", cursive';
ctx.fillText("Date: 08/03/2026", 550, 160);
ctx.fillText("Nama: En. Ahmad bin Ali", 50, 200);
ctx.fillText("Umur: 54", 50, 240);

ctx.fillText("Dear MO on call,", 50, 300);
ctx.fillText("Ref: Pak cik Ahmad came to KK complaining of chest pain.", 50, 340);
ctx.fillText("Dia cakap sakit dada since semalam, rasa macam kena tindih.", 50, 380);
ctx.fillText("Also got some SOB bila jalan jauh sikit.", 50, 420);

ctx.fillText("O/E:", 50, 480);
ctx.fillText("BP: 160/95 mmHg  HR: 92 bpm", 80, 520);
ctx.fillText("Temp: 37.1 C   SpO2: 97% on room air", 80, 560);

ctx.fillText("H/o HPT and T2DM. On Metformin and Amlodipine c/c.", 50, 620);

ctx.fillText("ECG done - sinus rhythm, inverted T in V1-V4.", 50, 680);
ctx.fillText("Refer for further mx r/o ACS.", 50, 720);

ctx.fillText("Terima kasih.", 50, 800);
ctx.fillText("Dr. Amin", 50, 840);

// Save to file
const buffer = canvas.toBuffer("image/jpeg");
writeFileSync("sample_surat_rujukan.jpg", buffer);
console.log("Mock handwritten notes attached.");
