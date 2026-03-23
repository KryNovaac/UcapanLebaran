// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Total 134 nama modern/urban
const urbanNames =[
  "William", "Daniel", "Jason", "Kevin", "Richard", "Michael", "Steven", "Christian", "Bryan", "Andrew",
  "Nicholas", "Matthew", "Jonathan", "Christopher", "Darren", "Vincent", "Albert", "Edward", "Raymond", "Stanley",
  "Marcell", "Calvin", "Dennis", "Felix", "Glenn", "Alexander", "Anthony", "Bernard", "Charles", "David",
  "Eric", "Franky", "George", "Harry", "Ivan", "James", "Ken", "Leon", "Martin", "Nathan",
  "Oscar", "Peter", "Quincy", "Robert", "Samuel", "Thomas", "Victor", "Winston", "Xaverius", "Yohan",
  "Zachary", "Adrian", "Bobby", "Chris", "Donny", "Evan", "Fred", "Garry", "Hans", "Ian",
  "Jimmy", "Kelvin", "Louis", "Mario", "Nelson", "Oliver", "Paul", "Ricky", "Simon", "Tony",
  "Willy", "Jessica", "Michelle", "Valencia", "Stephanie", "Natasha", "Felicia", "Gabriella", "Clarissa", "Evelyn",
  "Vanessa", "Nadine", "Patricia", "Amanda", "Cindy", "Celine", "Audrey", "Giselle", "Valerie", "Priscilla",
  "Caroline", "Angelina", "Bella", "Chika", "Grace", "Kelly", "Alice", "Brenda", "Clara", "Diana",
  "Elaine", "Fiona", "Gloria", "Helen", "Irene", "Jane", "Karen", "Laura", "Maria", "Nancy",
  "Olivia", "Pamela", "Queenie", "Rachel", "Sarah", "Teresa", "Ursula", "Vania", "Wendy", "Xena",
  "Yolanda", "Zara", "Agnes", "Betty", "Chloe", "Daisy", "Emma", "Flora", "Gwen", "Hana",
  "Inez", "Julia", "Keira", "Lily"
];

// Fungsi bantuan untuk membuat IP IPv4 Acak (contoh: 114.25.x.x)
function generateRandomIP() {
  const segment1 = Math.floor(Math.random() * 255) + 1; // 1-255
  const segment2 = Math.floor(Math.random() * 256);     // 0-255
  const segment3 = Math.floor(Math.random() * 256);
  const segment4 = Math.floor(Math.random() * 256);
  return `${segment1}.${segment2}.${segment3}.${segment4}`;
}

async function main() {
  console.log(`Memulai proses seeding ${urbanNames.length} user beserta IP Acak & Status Check-In...`);

  // Mengambil total pengunjung saat ini dari database (jika sudah ada isinya)
  const currentState = await prisma.globalState.findUnique({ where: { key: 'visitor_count' } });
  let startSequence = (currentState?.value || 0) + 1;
  let successCount = 0;

  for (const name of urbanNames) {
    const keyName = name.toLowerCase();
    const randomIp = generateRandomIP();

    // 1. Simpan Data User (Sekaligus dianggap SUDAH CHECK-IN)
    await prisma.user.upsert({
      where: { username: keyName },
      update: {
        hasCheckedIn: true,
        sequence: startSequence // Menyesuaikan urutan pengunjung ke-berapa
      }, 
      create: {
        username: keyName,
        isVip: false,
        hasCheckedIn: true,
        sequence: startSequence
      },
    });

    // 2. Simpan Pemetaan IP (IP Acak -> Username)
    await prisma.ipMapping.upsert({
      where: { ip: randomIp },
      update: { username: keyName },
      create: {
        ip: randomIp,
        username: keyName
      }
    });
    
    console.log(`[${successCount + 1}/${urbanNames.length}] ${name} | IP: ${randomIp} | Urutan ke-${startSequence}`);
    
    startSequence++;
    successCount++;
  }

  // 3. Simpan Angka Total Pengunjung Terakhir ke GlobalState
  const finalVisitorCount = startSequence - 1;
  await prisma.globalState.upsert({
    where: { key: 'visitor_count' },
    update: { value: finalVisitorCount },
    create: { key: 'visitor_count', value: finalVisitorCount }
  });

  console.log('=========================================');
  console.log(`✅ SEEDING SELESAI!`);
  console.log(`Total Visitor Count di database sekarang: ${finalVisitorCount}`);
  console.log('=========================================');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat menjalankan seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });