require("./setting.js")
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, jidDecode, delay } = require("@whiskeysockets/baileys");
const chalk = require('chalk');
const readline = require('readline');
const pino = require('pino');
const fs = require("fs");
const figlet = require("figlet");
const PhoneNumber = require('awesome-phonenumber');
const moment = require('moment');
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY');
const yargs = require('yargs/yargs');

const { serialize, getBuffer } = require("./function/myfunc.js");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./function/uploader.js');
const { color } = require('./function/console.js');
const { groupResponseWelcome, groupResponseRemove, groupResponsePromote, groupResponseDemote } = require('./function/respon-group.js');
const { nocache } = require('./function/chache.js');

const emojis = [
  "🥶",
  "🙄",
  "😳",
  "😒",
  "🥰",
  "😎",
  "🫣",
  "😍",
  "😨",
  "😁",
  "😂",
  "👀",
  "👿",
  "🤖",
  "😮",
  "🔥",
  "✨",
  "🤖",
  "🌟",
  "🌞",
  "🎉",
  "🎊",
  "😺",
];

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve) => {
    rl.question(text, resolve)
  })
}

//DATABASE
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new (require('./function/database'))(`${opts._[0] ? opts._[0] + '_' : ''}options/database.json`, null, 2)

if (!db.data.order) db.data.order = {}
if (!db.data.testi) db.data.testi = []
if (!db.data.chat) db.data.chat = {}
if (!db.data.sewa) db.data.sewa = {}
if (!db.data.produk) db.data.produk = {}
if (!db.data.setting) db.data.setting = {}

let lastJSON = JSON.stringify(db.data)
if (!opts['test']) setInterval(async () => {
  if (JSON.stringify(db.data) == lastJSON) return
  await db.save()
  lastJSON = JSON.stringify(db.data)
}, 30 * 1000)

async function startronzz() {

  console.log(chalk.bold.green(figlet.textSync('Velzzy', {
    font: 'Standard',
    horizontalLayout: 'default',
    vertivalLayout: 'default',
    whitespaceBreak: false
  })))
  delay(100)
  console.log(chalk.yellow(`${chalk.red('[ CREATOR RONZZ YT ]')}\n\n${chalk.italic.magenta(`SV Ronzz YT\nNomor: 08817861263\nSebut nama👆,`)}\n\n\n${chalk.red(`ADMIN MENYEDIAKAN`)}\n${chalk.white(`- SC BOT TOPUP\n- SC BOT CPANEL\n- SC BOT CPANEL DEPO OTOMATIS\n- SC BOT PUSH KONTAK\n- ADD FITUR JADIBOT\n- UBAH SC LAMA KE PAIRING CODE\n- FIXS FITUR/SC ERROR\n`)}`))

  require('./index')
  nocache('../index', module => console.log(chalk.greenBright('[ VelzzyBotz ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

  const store = makeInMemoryStore({
    logger: pino().child({
      level: 'silent',
      stream: 'store'
    })
  })

  const { state, saveCreds } = await useMultiFileAuthState('./session')

  const ronzz = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !pairingCode,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04']
  })

  if (pairingCode && !ronzz.authState.creds.registered) {
    const phoneNumber = await question(color('\n\nSilahkan masukkan nomor Whatsapp bot anda, awali dengan 62:\n', 'magenta'));
    const code = await ronzz.requestPairingCode(phoneNumber.trim())
    console.log(color(`⚠︎ Phone number:`, "gold"), color(`${phoneNumber}`, "white"))
    console.log(color(`⚠︎ Pairing code:`, "gold"), color(`${code}`, "white"))
  }

  ronzz.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("CONNECTION OPEN ( +" + ronzz.user?.["id"]["split"](":")[0] + " || " + ronzz.user?.["name"] + " )")
    }
    if (connection === "close") {
      console.log("Connection closed, tolong hapus file session dan scan ulang");
      startronzz()
    }
    if (connection === "connecting") {
      if (ronzz.user) {
        console.log("CONNECTION FOR ( +" + ronzz.user?.["id"]["split"](":")[0] + " || " + ronzz.user?.["name"] + " )")
      }
    }
  })

  store.bind(ronzz.ev)

  ronzz.ev.on('messages.upsert', async m => {
    var msg = m.messages[0]
    if (!m.messages) return;
    if (msg.key && msg.key.remoteJid == "status@broadcast") return
    msg = serialize(ronzz, msg)
    msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
    require('./index')(ronzz, msg)
  })

  ronzz.ev.process(async (events) => {
    if (events['presence.update']) {
      await ronzz.sendPresenceUpdate('available')
    }
    if (events['messages.upsert']) {
      const upsert = events['messages.upsert']
      for (let msg of upsert.messages) {
        if (msg.key.remoteJid === 'status@broadcast') {
          const randomEmoji = getRandomEmoji();
          await ronzz.sendMessage(
            "status@broadcast",
            { react: { text: randomEmoji, key: msg.key } },
            { statusJidList: [msg.key.participant] },
          );
        }
      }
    }
    if (events['creds.update']) {
      await saveCreds()
    }
  })

  ronzz.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (db.data.setting[ronzz.user?.["id"]["split"](":")[0] + "@s.whatsapp.net"].anticall && json.content[0].tag == 'offer') {
      ronzz.sendMessage(callerId, { text: `Kamu telah di blok oleh bot, karena kamu menelpon bot!!\n\nJika tidak sengaja silahkan hubungi owner agar dibuka blocknya!!\nNomor owner : wa.me/${ownerNomer}` })
      setTimeout(() => {
        ronzz.updateBlockStatus(callerId, 'block')
      }, 1000)
    }
  })

  ronzz.ev.on('group-participants.update', async (update) => {
    if (!db.data.chat[update.id].welcome) return
    groupResponseDemote(ronzz, update)
    groupResponsePromote(ronzz, update)
    groupResponseWelcome(ronzz, update)
    groupResponseRemove(ronzz, update)
  })

  ronzz.getName = (jid, withoutContact = false) => {
    var id = ronzz.decodeJid(jid)
    withoutContact = ronzz.withoutContact || withoutContact
    let v
    if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
      v = store.contacts[id] || {}
      if (!(v.name || v.subject)) v = ronzz.groupMetadata(id) || {}
      resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
    })
    else v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } : id === ronzz.decodeJid(ronzz.user.id) ? ronzz.user : (store.contacts[id] || {})
    return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }

  ronzz.sendContact = async (jid, contact, quoted = '', opts = {}) => {
    let list = []
    for (let i of contact) {
      list.push({
        lisplayName: ownerNomer.includes(i) ? ownerName : await ronzz.getName(i + '@s.whatsapp.net'),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${ownerNomer.includes(i) ? ownerName : await ronzz.getName(i + '@s.whatsapp.net')}\nFN:${ownerNomer.includes(i) ? ownerName : await ronzz.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      })
    }
    list.push({
      lisplayName: "Ronzz YT",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nN:Ronzz YT\nFN:Ronzz YT\nitem1.TEL;waid=62882000253706:+62 882-0002-53706\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:admin@ronzzyt.com\nitem2.X-ABLabel:Email\nitem3.URL:https://youtube.com/c/RonzzYT\nitem3.X-ABLabel:YouTube\nitem4.ADR:;;;;;Indonesia\nitem4.X-ABLabel:Region\nEND:VCARD"
    })
    return ronzz.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
  }

  ronzz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await ronzz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
  }

  ronzz.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }

  ronzz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options)
    } else {
      buffer = await imageToWebp(buff)
    }
    await ronzz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted }).then(response => {
      fs.unlinkSync(buffer)
      return response
    })
  }

  ronzz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options)
    } else {
      buffer = await videoToWebp(buff)
    }
    await ronzz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted }).then(response => {
      fs.unlinkSync(buffer)
      return response
    })
  }

  return ronzz
}

startronzz()