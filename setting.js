//Pairing Code
global.pairingCode = true; //true = gausah scan qr cukup 1 hp || false = harus scan qr dan 2 hp

//Orderkuota
global.merchantId = "OK1327220"; //Merchant id Orderkuota lu
global.apikey_orkut =
  "291922617332091731327220OKCTFD78799B61B5BB6CD8833DE5347192AF"; //Apikey Orderkuota lu
global.codeqr =
  "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214502464528065320303UMI51440014ID.CO.QRIS.WWW0215ID20232921324120303UMI5204541153033605802ID5924AFANDI DIGITAL OK13272206011TASIKMALAYA61054611162070703A016304CE51"; //Code QR lu

//Other
global.botName = "GtsaBOT-WhatsApp"; //Nama bot
global.owner = ["6289663455926", "6282129329896"]; //Ganti agar fitur owner bisa digunakan
global.ownerNomer = "6289663455926"; //Nomor lu
global.ownerName = "Afandi"; //Nama lu
global.packname = "GtsaBOTPack"; //Seterah
global.author = "from Payment Gtsa"; //Seterah
global.sessionName = "session"; //Ngga usah di ganti
global.linkGroup = "https://chat.whatsapp.com/Cdk8bAMNOYeAKacaUiFFKK"; //Link gc lu

//Image
global.thumbnail = "./options/image/thumbnail.jpg";

//Message
global.mess = {
  sukses: "Done🤗",
  admin: "Command ini hanya bisa digunakan oleh Admin Grup",
  botAdmin: "Bot Harus menjadi admin",
  owner: "Command ini hanya dapat digunakan oleh owner bot",
  prem: "Command ini khusus member premium",
  group: "Command ini hanya bisa digunakan di grup",
  private: "Command ini hanya bisa digunakan di Private Chat",
  wait: "⏳ Mohon tunggu sebentar...",
  error: {
    lv: "Link yang kamu berikan tidak valid",
    api: "Maaf terjadi kesalahan",
  },
};

//Function buat menu
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment-timezone");
const { runtime } = require("./function/myfunc");

const d = new Date(new Date() + 3600000);
const dateIslam = Intl.DateTimeFormat("id" + "-TN-u-ca-islamic", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(d);

//Tampilan menu
global.menu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
*📖 LIST MENU 📖*
☛ ${prefix}allmenu
☛ ${prefix}groupmenu
☛ ${prefix}infobot
☛ ${prefix}ordermenu
☛ ${prefix}ownermenu
☛ ${prefix}storemenu

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.allmenu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *GROUP MENU* 」
│☛ ${prefix}ceksewa
│☛ ${prefix}kick
│☛ ${prefix}open
│☛ ${prefix}close
│☛ ${prefix}tagall
│☛ ${prefix}hidetag
│☛ ${prefix}delete
│☛ ${prefix}revoke
│☛ ${prefix}antilink
│☛ ${prefix}antilinkv2
│☛ ${prefix}welcome
│☛ ${prefix}promote
│☛ ${prefix}demote
│☛ ${prefix}setdesc
│☛ ${prefix}linkgc
│☛ ${prefix}setppgc
╰─────╼

╭─────╼「 *INFO BOT* 」
│☛ ${prefix}creator
│☛ ${prefix}owner
│☛ ${prefix}ping
│☛ ${prefix}runtime
│☛ ${prefix}script
╰─────╼

╭─────╼「 *ORDER MENU* 」
│☛ ${prefix}stok
│☛ ${prefix}buy
╰─────╼

╭─────╼「 *OWNER MENU* 」
│☛ ${prefix}addproduk
│☛ ${prefix}delproduk
│☛ ${prefix}setharga
│☛ ${prefix}addstok
│☛ ${prefix}delstok
│☛ ${prefix}addsewa
│☛ ${prefix}delsewa
│☛ ${prefix}listsewa
│☛ ${prefix}block
│☛ ${prefix}unblock
╰─────╼

╭─────╼「 *STORE MENU* 」
│☛ ${prefix}testi
│☛ ${prefix}addtesti
│☛ ${prefix}deltesti
│☛ ${prefix}settesti
│☛ ${prefix}kalkulator
│☛ ${prefix}done
│☛ ${prefix}setdone
│☛ ${prefix}deldone
│☛ ${prefix}changedone
│☛ ${prefix}proses
│☛ ${prefix}setproses
│☛ ${prefix}delproses
│☛ ${prefix}changeproses
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.groupmenu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *GROUP MENU* 」
│☛ ${prefix}ceksewa
│☛ ${prefix}kick
│☛ ${prefix}open
│☛ ${prefix}close
│☛ ${prefix}tagall
│☛ ${prefix}hidetag
│☛ ${prefix}delete
│☛ ${prefix}revoke
│☛ ${prefix}antilink
│☛ ${prefix}antilinkv2
│☛ ${prefix}welcome
│☛ ${prefix}promote
│☛ ${prefix}demote
│☛ ${prefix}setdesc
│☛ ${prefix}linkgc
│☛ ${prefix}setppgc
│☛ ${prefix}setnamegc
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.infobot = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *INFO BOT* 」
│☛ ${prefix}creator
│☛ ${prefix}owner
│☛ ${prefix}ping
│☛ ${prefix}runtime
│☛ ${prefix}script
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.ownermenu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *OWNER MENU* 」
│☛ ${prefix}addproduk
│☛ ${prefix}delproduk
│☛ ${prefix}setharga
│☛ ${prefix}addstok
│☛ ${prefix}delstok
│☛ ${prefix}addsewa
│☛ ${prefix}delsewa
│☛ ${prefix}listsewa
│☛ ${prefix}block
│☛ ${prefix}unblock
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.storemenu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *STORE MENU* 」
│☛ ${prefix}testi
│☛ ${prefix}addtesti
│☛ ${prefix}deltesti
│☛ ${prefix}settesti
│☛ ${prefix}kalkulator
│☛ ${prefix}done
│☛ ${prefix}setdone
│☛ ${prefix}deldone
│☛ ${prefix}changedone
│☛ ${prefix}proses
│☛ ${prefix}setproses
│☛ ${prefix}delproses
│☛ ${prefix}changeproses
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

global.ordermenu = (prefix, sender, pushname, bio) => {
  let more = String.fromCharCode(8206);
  let readmore = more.repeat(4001);
  return `*🤖 BOT INFO 🤖*
• Bot Name: ${botName}
• Runtime: ${runtime(process.uptime())}
• Owner: @${ownerNomer}

*👤 USER INFO 👤*
• Tag: @${sender.split("@")[0]}
• Name: ${pushname}
• Bio: ${bio ? bio : "-"}

*📆 DATE INFO 📆*
• Masehi: ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY")}
• Hijriah: ${dateIslam}

*⏰ TIME INFO ⏰*
• WIB: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}
• WITA: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}
• WIT: ${moment.tz("Asia/Jayapura").format("HH:mm:ss")}
${readmore}
╭─────╼「 *ORDER MENU* 」
│☛ ${prefix}stok
│☛ ${prefix}buy
╰─────╼

*☘ ᴛʜᴀɴᴋs ᴛᴏ ☘*
• @Whiskeysockets (Baileys)
• Ronzz YT (Creator)
• ${ownerName} (Owner)
• All pengguna bot`;
};

let time = moment(new Date()).format("HH:mm:ss DD/MM/YYYY");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.greenBright(`[ ${botName} ]  `) +
      time +
      chalk.cyanBright(` "${file}" Telah diupdate!`)
  );
  delete require.cache[file];
  require(file);
});
