//Credit By JRENN
//Partner by Ronzz
//Copyright police joeva from turk

require("./setting.js")
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs");
const speed = require("performance-now");
const moment = require("moment-timezone");
const toMs = require('ms');
const ms = require('parse-ms');
const os = require('os');
const { sizeFormatter } = require('human-readable');
const { exec } = require("child_process");
const util = require('util');
const crypto = require("crypto");
const axios = require('axios')
const jimp_1 = require('jimp');
const cron = require("node-cron");

const { getGroupAdmins, runtime, sleep } = require("./function/myfunc");
const { color } = require('./function/console');
const { addResponTesti, delResponTesti, isAlreadyResponTesti, updateResponTesti, getDataResponTesti } = require('./function/respon-testi');
const { expiredCheck, getAllSewa } = require("./function/sewa");
const { TelegraPh } = require('./function/uploader');
const { qrisDinamis } = require("./function/dinamis");
global.prefa = ['', '.']

moment.tz.setDefault("Asia/Jakarta").locale("id");
const d = new Date
const tanggal = d.toLocaleDateString('id', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

module.exports = async (ronzz, msg) => {
  try {
    const { type, quotedMsg, fromMe } = msg
    if (msg.isBaileys) return
    const jamwib = moment.tz('asia/jakarta').format('HH:mm:ss')
    const dt = moment.tz('Asia/Jakarta').format('HH')
    const content = JSON.stringify(msg.message)
    const from = msg.key.remoteJid
    const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
    const toJSON = j => JSON.stringify(j, null, '\t')
    const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? '#'
    const isGroup = msg.key.remoteJid.endsWith('@g.us')
    const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
    const isOwner = [ronzz.user.id, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender) ? true : false
    const pushname = msg.pushName
    const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
    const args = chats.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    const botNumber = ronzz.user.id.split(':')[0] + '@s.whatsapp.net'
    const groupMetadata = isGroup ? await ronzz.groupMetadata(from) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const groupId = isGroup ? groupMetadata.id : ''
    const groupMembers = isGroup ? groupMetadata.participants : ''
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    const isGroupAdmins = groupAdmins.includes(sender)
    const participants = isGroup ? await groupMetadata.participants : ''

    const isImage = (type == 'imageMessage')
    const isQuotedMsg = (type == 'extendedTextMessage')
    const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
    const isVideo = (type == 'videoMessage')
    const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
    const isSewa = db.data.sewa[from] ? true : false

    function parseMention(text = '') {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

    const reply = (teks, options = {}) => { ronzz.sendMessage(from, { text: teks, ...options }, { quoted: msg }) }
    const Reply = (teks) => ronzz.sendMessage(from, { text: Styles(teks), contextInfo: { mentionedJid: parseMention(teks), externalAdReply: { showAdAttribution: true, title: `${botName} © ${ownerName}`, body: ownerName + botName, thumbnail: fs.readFileSync(thumbnail), sourceUrl: linkGroup, mediaType: 1, renderLargerThumbnail: true } } }, { quoted: msg })

    const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
    const mention = typeof (mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
    mention != undefined ? mention.push(mentionByReply) : []

    async function downloadAndSaveMediaMessage(type_file, path_file) {
      if (type_file === 'image') {
        var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
      }
      else if (type_file === 'video') {
        var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
      } else if (type_file === 'sticker') {
        var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
      } else if (type_file === 'audio') {
        var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
      }
    }

    async function pepe(media) {
      const jimp = await jimp_1.read(media)
      const min = jimp.getWidth()
      const max = jimp.getHeight()
      const cropped = jimp.crop(0, 0, min, max)
      return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
      }
    }

    function digit() {
      const characters = '0123456789';
      const length = 2;
      let haha = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        haha += characters[randomIndex];
      }
      return haha;
    }

    const formatp = sizeFormatter({
      std: 'JEDEC',
      decimalPlaces: 2,
      keepTrailingZeroes: false,
      render: (literal, symbol) => `${literal} ${symbol}B`,
    })

    //Ucapan waktu
    if (dt >= 0) {
      var ucapanWaktu = ('Selamat Malam🌃')
    }
    if (dt >= 4) {
      var ucapanWaktu = ('Selamat Pagi🌄')
    }
    if (dt >= 12) {
      var ucapanWaktu = ('Selamat Siang☀️')
    }
    if (dt >= 16) {
      var ucapanWaktu = ('️ Selamat Sore🌇')
    }
    if (dt >= 23) {
      var ucapanWaktu = ('Selamat Malam🌙')
    }
    
    setInterval(async () => {
      ronzz.sendMessage(ownerNomer + "@s.whatsapp.net", { document: fs.readFileSync("./options/database.json"), fileName: "database.json", mimetype: "text/json" })
      console.log("Sukses mengirim file database ke owner.");
    }, 24 * 60 * 60000)

    if (!db.data.setting[botNumber]) db.data.setting[botNumber] = {
      autoread: true,
      autoketik: false,
      anticall: true
    }
    if (isGroup && !db.data.chat[from]) db.data.chat[from] = {
      welcome: false,
      antilink: false,
      antilink2: false,
      sDone: "",
      sProses: ""
    }

    function Styles(text, style = 1) {
      var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
      var yStr = Object.freeze({
        1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
      });
      var replacer = [];
      xStr.map((v, i) => replacer.push({
        original: v,
        convert: yStr[style].split('')[i]
      }));
      var str = text.toLowerCase().split('');
      var output = [];
      str.map(v => {
        const find = replacer.find(x => x.original == v);
        find ? output.push(find.convert) : output.push(v);
      });
      return output.join('');
    }

    function toRupiah(angka) {
      var saldo = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
      return '' + saldo.split('', saldo.length - 1).reverse().join('');
    }

    expiredCheck(ronzz, msg, groupId)

    if (isAlreadyResponTesti(chats.toLowerCase())) {
      var get_data_respon = getDataResponTesti(chats.toLowerCase())
      ronzz.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
    }

    if (isGroup && db.data.chat[from].antilink) {
      let gc = await ronzz.groupInviteCode(from)
      if (chats.match(/(`https:\/\/chat.whatsapp.com\/${gc}`)/gi)) {
        if (!isBotGroupAdmins) return
        reply(`*GROUP LINK DETECTOR*\n\nAnda tidak akan dikick oleh bot, karena yang anda kirim adalah link group ini.`)
      } else if (/^http(s|):\/\/$/.test(chats?.toLowerCase()) && !chats.match(/(`https:\/\/chat.whatsapp.com\/${gc}`)/gi)) {
        if (!isBotGroupAdmins) return
        if (!isOwner && !isGroupAdmins) {
          await ronzz.sendMessage(from, { delete: msg.key })
          ronzz.sendMessage(from, { text: `*GROUP LINK DETECTOR*\n\nMaaf @${sender.split('@')[0]}, sepertinya kamu mengirimkan link, maaf kamu akan di kick.`, mentions: [sender] })
          await sleep(500)
          ronzz.groupParticipantsUpdate(from, [sender], "remove")
        }
      }
    }

    if (isGroup && db.data.chat[from].antilink2) {
      let gc = await ronzz.groupInviteCode(from)
      if (/^http(s|):\/\/$/.test(chats?.toLowerCase()) && !chats.match(/(`https:\/\/chat.whatsapp.com\/${gc}`)/gi)) {
        if (!isBotGroupAdmins) return
        if (!isOwner && !isGroupAdmins) {
          await ronzz.sendMessage(from, { delete: msg.key })
          ronzz.sendMessage(from, { text: `*GROUP LINK DETECTOR*\n\nMaaf @${sender.split('@')[0]}, sepertinya kamu mengirimkan link, lain kali jangan kirim link yaa.`, mentions: [sender] })
        }
      }
    }

    if (db.data.setting[botNumber].autoread) ronzz.readMessages([msg.key])
    if (db.data.setting[botNumber].autoketik) ronzz.sendPresenceUpdate('composing', from)
    if (msg) console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix + command} [${args.length}]`), 'from', color(pushname), isGroup ? 'in ' + color(groupName) : '')

    switch (command) {
      case 'menu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.menu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'allmenu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.allmenu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'groupmenu': case 'grupmenu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.groupmenu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'infobot': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.infobot(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'ownermenu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.ownermenu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'storemenu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.storemenu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'ordermenu': {
        let bio = (await ronzz.fetchStatus(sender).catch(console.error) || {}).status || '-'
        let teks = global.ordermenu(prefix, sender, pushname, bio)
        Reply(teks)
      }
        break

      case 'stok': {
        if (Object.keys(db.data.produk).length == 0) return reply("Belum ada produk di database")

        let teks = `----- *PRODUCT LIST* -----
• Cara membeli produk ketik perintah berikut
• ${prefix}buy kodeproduk,jumlah
• Contoh: ${prefix}buy yt3b,2
• Pastikan kode dan jumlah akun sudah benar
• Kontak Admin: @${ownerNomer}\n\n`

        Object.keys(db.data.produk).forEach(i => {
          teks += `--- *${db.data.produk[i].name}*\n*• Kode:* ${db.data.produk[i].id}\n*• Harga:* Rp${toRupiah(db.data.produk[i].price)}\n*• Stok:* ${db.data.produk[i].stok.length}\n*• Deskripsi:* ${db.data.produk[i].desc}\n*• Ketik:* ${prefix}buy ${db.data.produk[i].id},1\n\n`
        })

        ronzz.sendMessage(from, { text: teks, mentions: [ownerNomer + "@s.whatsapp.net"] }, { quoted: msg })
      }
        break

      case 'addproduk': {
        if (!isOwner) return reply(mess.owner)
        let data = q.split(",")
        if (!data[4]) return reply(`Contoh: ${prefix + command} id,namaproduk,deskripsi,snk,harga`)
        if (db.data.produk[data[0]]) return reply(`Produk dengan ID ${data[0]} sudah ada di database`)

        db.data.produk[data[0]] = {
          id: data[0],
          name: data[1],
          desc: data[2],
          snk: data[3],
          price: data[4],
          stok: []
        }

        reply(`Berhasil menambahkan produk *${data[1]}*`)
      }
        break

      case 'delproduk': {
        if (!isOwner) return reply(mess.owner)
        if (!q) return reply(`Contoh: ${prefix + command} idproduk`)
        if (!db.data.produk[q]) return reply(`Produk dengan ID *${q}* tidak ada di database`)

        delete db.data.produk[q]

        reply(`Berhasil delete produk *${q}*`)
      }
        break
        
      case 'setharga': {
        if (!isOwner) return reply(mess.owner)
        let data = q.split(",")
        if (!data[1]) return reply(`Contoh: ${prefix + command} idproduk,harga`)
        if (!db.data.produk[data[0]]) return reply(`Produk dengan ID *${data[0]}* tidak ada di database`)
        
        db.data.produk[data[0]].price = Number(data[1])
        reply(`Berhasil set harga produk dengan ID ${data[0]} menjadi Rp${toRupiah(Number(data[1]))}`)
      }
        break

      case 'addstok': {
        if (!isOwner) return reply(mess.owner)
        let data = q.split(",")
        if (!data[1]) return reply(`Contoh: ${prefix + command} idproduk,email1@gmail.com:password1\nemail2@gmail.com:password2`)
        if (!db.data.produk[data[0]]) return reply(`Produk dengan ID *${data[0]}* tidak ada`)

        let dataStok = data[1].split("\n").map(i => i.trim())
        db.data.produk[data[0]].stok.push(...dataStok)

        reply(`Berhasil menambahkan stok sebanyak ${dataStok.length}`)
      }
        break

      case 'delstok': {
        if (!isOwner) return reply(mess.owner)
        if (!q) return reply(`Contoh: ${prefix + command} idproduk`)
        if (!db.data.produk[q]) return reply(`Produk dengan ID *${q}* tidak ada`)

        db.data.produk[q].stok = []

        reply(`Berhasil delete stok produk *${q}*`)
      }
        break

      case 'buy': {
        if (db.data.order[sender]) return reply(`Kamu sedang melakukan order, harap tunggu sampai proses selesai. Atau ketik *${prefix}batal* untuk membatalkan pembayaran.`)
        let data = q.split(",")
        if (!data[1]) return reply(`Contoh: ${prefix + command} idproduk,jumlah`)
        if (!db.data.produk[data[0]]) return reply(`Produk dengan ID *${data[0]}* tidak ada`)

        let stok = db.data.produk[data[0]].stok
        if (stok.length <= 0) return reply("Stok habis, silahkan hubungi Owner untuk restok")
        if (stok.length < data[1]) return reply(`Stok tersedia ${stok.length}, jadi harap jumlah tidak melebihi stok`)

        reply("Sedang membuat QR Code...")

        let amount = Number(db.data.produk[data[0]].price) * Number(data[1])
        let fee = digit()
        let totalAmount = Number(amount) + Number(fee)

        let pay = await qrisDinamis(`${totalAmount}`, "./options/sticker/qris.jpg")
        let time = Date.now() + toMs("10m");
        let expirationTime = new Date(time);
        let timeLeft = Math.max(0, Math.floor((expirationTime - new Date()) / 60000));
        let currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        let expireTimeJakarta = new Date(currentTime.getTime() + timeLeft * 60000);
        let hours = expireTimeJakarta.getHours().toString().padStart(2, '0');
        let minutes = expireTimeJakarta.getMinutes().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes}`

        await sleep(1000)
        let cap = `*🧾 MENUNGGU PEMBAYARAN 🧾*\n\n*Produk ID:* ${data[0]}\n*Produk Name:* ${db.data.produk[data[0]].name}\n*Harga:* Rp${toRupiah(db.data.produk[data[0]].price)}\n*Jumlah:* ${data[1]}\n*Biaya Admin:* Rp${toRupiah(Number(fee))}\n*Total:* Rp${toRupiah(totalAmount)}\n*Waktu:* ${timeLeft} menit\n\nSilahkan scan Qris di atas sebelum ${formattedTime} untuk melakukan pembayaran.\n\nJika ingin membatalkan pembayaran ketik *${prefix}batal*`;
        let mess = await ronzz.sendMessage(from, { image: fs.readFileSync(pay), caption: Styles(cap) }, { quoted: msg })

        db.data.order[sender] = {
          id: data[0],
          jumlah: data[1]
        }

        let statusPay = false;
        while (db.data.order[sender] !== null && !statusPay) {
          await sleep(7000)
          if (Date.now() >= time) {
            statusPay = true

            await ronzz.sendMessage(from, { delete: mess.key })
            reply("Pembayaran dibatalkan karena telah melewati batas expired.")
            delete db.data.order[sender]
          }
          try {
            let response = await axios.get(`https://gateway.okeconnect.com/api/mutasi/qris/${merchantId}/${apikey_orkut}`)
            let result = response.data.data[0]
            console.log(result)

            if (result && result.amount && parseInt(result.amount) === parseInt(totalAmount)) {
              statusPay = true;

              await ronzz.sendMessage(from, { delete: mess.key })
              reply("Pembayaran berhasil, data akun akan segera diproses, silahkan tunggu")

              await sleep(500)
              let dataStok = []
              for (let i = 0; i < data[1]; i++) {
                dataStok.push(db.data.produk[data[0]].stok.shift())
              }

              let teks = `Tanggal Transaksi: ${tanggal}\n\n----- ACCOUNT DETAIL -----\n`

              dataStok.forEach(i => {
                let dataAkun = i.split(":")
                teks += `• Email: ${dataAkun[0]}\n• Password: ${dataAkun[1]}\n\n`
              })

              fs.writeFileSync(`./options/TRX-${sender.split("@")[0]}.txt`, teks, "utf8")
              ronzz.sendMessage(sender, {
                document: fs.readFileSync(`./options/TRX-${sender.split("@")[0]}.txt`),
                mimetype: "text/plain",
                fileName: `TRX-${sender.split("@")[0]}.txt`,
                caption: `----- *ACCOUNT DETAIL* -----\n\nSilahkan buka file txt yang sudah diberikan\n\n----- *TRANSAKSI DETAIL* -----\n\n*• Jumlah Order:* ${data[1]}\n*• Tanggal:* ${tanggal}\n\n----- *SNK PRODUCT* -----\n\n${db.data.produk[data[0]].snk}`
              }, { quoted: msg })

              fs.unlinkSync(`./options/TRX-${sender.split("@")[0]}.txt`)
              delete db.data.order[sender]
            }
          } catch (error) {
            statusPay = true

            reply("Pesanan dibatalkan!")
            console.log("Error checking transaction status:", error);
            delete db.data.order[sender]
          }
        }
      }
        break

      case 'batal': {
        if (!db.data.order[sender]) return

        delete db.data.order[sender]
        reply("Berhasil membatalkan pembayaran")
      }
        break

      case 'sticker': case 's': case 'stiker': {
        if (isImage || isQuotedImage) {
          let media = await downloadAndSaveMediaMessage('image', `./options/sticker/${tanggal}.jpg`)
          reply(mess.wait)
          ronzz.sendImageAsSticker(from, media, msg, { packname: `${packname}`, author: `${author}` })
        } else if (isVideo || isQuotedVideo) {
          let media = await downloadAndSaveMediaMessage('video', `./options/sticker/${tanggal}.mp4`)
          reply(mess.wait)
          ronzz.sendVideoAsSticker(from, media, msg, { packname: `${packname}`, author: `${author}` })
        } else {
          reply(`Kirim/reply gambar/vidio dengan caption *${prefix + command}*`)
        }
      }
        break

      case 'addsewa': {
        if (!isOwner) return reply(mess.owner)
        if (!isGroup) return reply(mess.group)
        if (!q) return reply(`Ex: ${prefix + command} hari\n\nContoh: ${prefix + command} 30d`)
        db.data.sewa[from] = {
          id: from,
          expired: Date.now() + toMs(q)
        }
        Reply(`*SEWA ADDED*\n\n*ID*: ${groupId}\n*EXPIRED*: ${ms(toMs(q)).days} days ${ms(toMs(q)).hours} hours ${ms(toMs(q)).minutes} minutes\n\nBot akan keluar secara otomatis dalam waktu yang sudah di tentukan.`)
      }
        break

      case 'delsewa': {
        if (!isOwner) return reply(mess.owner)
        if (!isGroup) return reply(mess.group)
        delete db.data.sewa[from]
        reply('Sukses delete sewa di group ini.')
      }
        break

      case 'ceksewa': {
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!isGroup) return reply(mess.group)
        if (!isSewa) return reply('Kamu belum sewa bot.')
        let cekExp = ms(db.data.sewa[from].expired - Date.now())
        Reply(`*SEWA EXPIRED*\n\n*ID*: ${groupId}\n*SEWA EXPIRED*: ${cekExp.days} days ${cekExp.hours} hours ${cekExp.minutes} minutes`)
      }
        break

      case 'listsewa': {
        if (!isOwner) return reply(mess.owner)
        if (db.data.sewa == 0) return reply('Belum ada list sewa di database')
        let teks = '*LIST SEWA BOT*\n\n'
        let sewaKe = 0
        for (let i = 0; i < getAllSewa().length; i++) {
          sewaKe++
          teks += `${sewaKe}. ${getAllSewa()[i]}\n\n`
        }
        Reply(teks)
      }
        break

      case 'kalkulator': {
        if (!q) return reply(`Contoh: ${prefix + command} + 5 6\n\nList kalkulator:\n+\n-\n÷\n×`)
        if (q.split(" ")[0] == "+") {
          let q1 = Number(q.split(" ")[1])
          let q2 = Number(q.split(" ")[2])
          reply(`${q1 + q2}`)
        } else if (q.split(" ")[0] == "-") {
          let q1 = Number(q.split(" ")[1])
          let q2 = Number(q.split(" ")[2])
          reply(`${q1 - q2}`)
        } else if (q.split(" ")[0] == "÷") {
          let q1 = Number(q.split(" ")[1])
          let q2 = Number(q.split(" ")[2])
          reply(`${q1 / q2}`)
        } else if (q.split(" ")[0] == "×") {
          let q1 = Number(q.split(" ")[1])
          let q2 = Number(q.split(" ")[2])
          reply(`${q1 * q2}`)
        }
      }
        break

      case 'welcome': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!q) return reply(`Contoh: ${prefix + command} on/off`)
        if (q.toLowerCase() == "on") {
          if (db.data.chat[from].welcome) return reply('Welcome sudah aktif di grup ini.')
          db.data.chat[from].welcome = true
          reply('Sukses mengaktifkan welcome di grup ini.')
        } else if (q.toLowerCase() == "off") {
          if (!db.data.chat[from].welcome) return reply('Welcome sudah tidak aktif di grup ini.')
          db.data.chat[from].welcome = false
          reply('Sukses menonaktifkan welcome di grup ini.')
        }
      }
        break

      case 'antilink': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!q) return reply(`Contoh: ${prefix + command} on/off`)
        if (q.toLowerCase() == "on") {
          if (db.data.chat[from].antilink) return reply('Antilink sudah aktif di grup ini.')
          db.data.chat[from].antilink = true
          reply('Sukses mengaktifkan antilink di grup ini.')
        } else if (q.toLowerCase() == "off") {
          if (!db.data.chat[from].antilink) return reply('Antilink sudah tidak aktif di grup ini.')
          db.data.chat[from].antilink = false
          reply('Sukses menonaktifkan antilink di grup ini.')
        }
      }
        break

      case 'antilinkv2': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!q) return reply(`Contoh: ${prefix + command} on/off`)
        if (q.toLowerCase() == "on") {
          if (db.data.chat[from].antilink2) return reply('Antilinkv2 sudah aktif di grup ini.')
          db.data.chat[from].antilink2 = true
          reply('Sukses mengaktifkan antilinkv2 di grup ini.')
        } else if (q.toLowerCase() == "off") {
          if (!db.data.chat[from].antilink2) return reply('Antilinkv2 sudah tidak aktif di grup ini.')
          db.data.chat[from].antilink2 = false
          reply('Sukses menonaktifkan antilinkv2 di grup ini.')
        }
      }
        break

      case 'anticall': {
        if (!isOwner) return reply(mess.owner)
        if (!q) return reply(`Contoh: ${prefix + command} on/off`)
        if (q.toLowerCase() == "on") {
          if (db.data.chat[from].anticall) return reply('Anticall sudah aktif.')
          db.data.chat[from].anticall = true
          reply('Sukses mengaktifkan anticall.')
        } else if (q.toLowerCase() == "off") {
          if (!db.data.chat[from].anticall) return reply('Anticall sudah tidak aktif.')
          db.data.chat[from].anticall = false
          reply('Sukses menonaktifkan anticall.')
        }
      }
        break

      case 'kick': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        let number;
        if (q.length !== 0) {
          number = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          ronzz.groupParticipantsUpdate(from, [number], "remove")
            .then(res => reply('Sukses...'))
            .catch((err) => reply(mess.error.api))
        } else if (isQuotedMsg) {
          number = quotedMsg.sender
          ronzz.groupParticipantsUpdate(from, [number], "remove")
            .then(res => reply('Sukses...'))
            .catch((err) => reply(mess.error.api))
        } else {
          reply('Tag atau balas pesan orang yang ingin dikeluarkan dari grup.')
        }
      }
        break

      case 'promote': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        let number;
        if (q.length !== 0) {
          number = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          ronzz.groupParticipantsUpdate(from, [number], "promote")
            .then(res => ronzz.sendMessage(from, { text: `Sukses menjadikan @${number.split("@")[0]} sebagai admin`, mentions: [number] }, { quoted: msg }))
            .catch((err) => reply(mess.error.api))
        } else if (isQuotedMsg) {
          number = quotedMsg.sender
          ronzz.groupParticipantsUpdate(from, [number], "promote")
            .then(res => ronzz.sendMessage(from, { text: `Sukses menjadikan @${number.split("@")[0]} sebagai admin`, mentions: [number] }, { quoted: msg }))
            .catch((err) => reply(mess.error.api))
        } else {
          reply('Tag atau balas pesan orang yang ingin dijadikan admin.')
        }
      }
        break

      case 'demote': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        let number;
        if (q.length !== 0) {
          number = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          ronzz.groupParticipantsUpdate(from, [number], "demote")
            .then(res => ronzz.sendMessage(from, { text: `Sukses menjadikan @${number.split("@")[0]} sebagai anggota group`, mentions: [number] }, { quoted: msg }))
            .catch((err) => reply(mess.error.api))
        } else if (isQuotedMsg) {
          number = quotedMsg.sender
          ronzz.groupParticipantsUpdate(from, [number], "demote")
            .then(res => ronzz.sendMessage(from, { text: `Sukses menjadikan @${number.split("@")[0]} sebagai anggota group`, mentions: [number] }, { quoted: msg }))
            .catch((err) => reply(mess.error.api))
        } else {
          reply('Tag atau balas pesan orang yang ingin dijadikan anggota group.')
        }
      }
        break

      case 'revoke':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        await ronzz.groupRevokeInvite(from)
          .then(res => {
            reply('Sukses menyetel tautan undangan grup ini.')
          }).catch(() => reply(mess.error.api))
        break

      case 'linkgrup': case 'linkgroup': case 'linkgc': {
        if (!isGroup) return reply(mess.group)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        let url = await ronzz.groupInviteCode(from).catch(() => reply(mess.errorApi))
        url = 'https://chat.whatsapp.com/' + url
        reply(url)
      }
        break

      case 'del': case 'delete': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!quotedMsg) return reply(`Reply chat yang ingin dihapus dengan caption *${prefix + command}*`)
        if (quotedMsg.fromMe) {
          await ronzz.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from } })
        } else if (!quotedMsg.fromMe) {
          if (!isBotGroupAdmins) return reply(mess.botAdmin)
          await ronzz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: quotedMsg.id, participant: quotedMsg.sender } })
        }
      }
        break

      case 'blok': case 'block':
        if (!isOwner && !fromMe) return reply(mess.owner)
        if (!q) return reply(`Contoh: ${prefix + command} 628xxx`)
        await ronzz.updateBlockStatus(q.replace(/[^0-9]/g, '') + '@s.whatsapp.net', "block") // Block user
        reply('Sukses block nomor.')
        break

      case 'unblok': case 'unblock':
        if (!isOwner && !fromMe) return reply(mess.owner)
        if (!q) return reply(`Contoh: ${prefix + command} 628xxx`)
        await ronzz.updateBlockStatus(q.replace(/[^0-9]/g, '') + '@s.whatsapp.net', "unblock") // Block user
        reply('Sukses unblock nomor.')
        break

      case 'script': case 'sc':
        reply(`*SCRIPT NO ENC*\nMau beli scriptnya?\n\n*Contact Person 📞*\nwa.me/62882000253706\nwa.me/628817839722\n\n*Harga* 💰\nRp50.000 (50k)\nHarga terlalu mahal?\nNego tipis aja\n\n*Payment* 💳\n_Qris / Dana_\n\nSudah termasuk tutorial.\nKalau error difixs.\nPasti dapet update dari *Rienn.*\nSize script ringan.\nAnti ngelag/delay.`)
        break

      case 'owner':
        ronzz.sendContact(from, [ownerNomer], msg)
        break

      case 'creator':
        ronzz.sendMessage(from, { text: 'Creator sc ini adalah\n@6288153182400 (Rienn)', mentions: ['6288153182400@s.whatsapp.net'] }, { quoted: msg })
        break

      case 'tes': case 'runtime':
        reply(`*STATUS : BOT ONLINE*\n_Runtime : ${runtime(process.uptime())}_`)
        break

      case 'ping':
        let timestamp = speed()
        let latensi = speed() - timestamp
        reply(`Kecepatan respon _${latensi.toFixed(4)} Second_\n\n*💻 INFO SERVER*\nHOSTNAME: ${os.hostname}\nRAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\nCPUs: ${os.cpus().length} core`)
        break

      case 'setdone':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (db.data.chat[from].sDone.length !== 0) return reply(`Set done sudah ada di group ini.`)
        if (!q) return reply(`Gunakan dengan cara *${prefix + command} teks*\n\nList function:\n@tag : untuk tag orang\n@tanggal\n@jam\n@status`)
        db.data.chat[from].sDone = q
        reply(`Sukses set done`)
        break

      case 'deldone':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (db.data.chat[from].sDone.length == 0) return reply(`Belum ada set done di sini.`)
        db.data.chat[from].sDone = ""
        reply(`Sukses delete set done`)
        break

      case 'changedone':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!q) return reply(`Gunakan dengan cara *${prefix + command} teks*\n\nList function:\n@tag : untuk tag orang\n@tanggal\n@jam\n@status`)
        db.data.chat[from].sDone = q
        reply(`Sukses mengganti teks set done`)
        break

      case 'setproses':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (db.data.chat[from].sProses.length !== 0) return reply(`Set proses sudah ada di group ini.`)
        if (!q) return reply(`Gunakan dengan cara *${prefix + command} teks*\n\nList function:\n@tag : untuk tag orang\n@tanggal\n@jam\n@status`)
        db.data.chat[from].sProses = q
        reply(`Sukses set proses`)
        break

      case 'delproses':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (db.data.chat[from].sProses.length == 0) return reply(`Belum ada set proses di sini.`)
        db.data.chat[from].sProses = ""
        reply(`Sukses delete set proses`)
        break

      case 'changeproses':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!q) return reply(`Gunakan dengan cara *${prefix + command} teks*\n\nList function:\n@tag : untuk tag orang\n@tanggal\n@jam\n@status`)
        db.data.chat[from].sProses = q
        reply(`Sukses ganti teks set proses`)
        break

      case 'done': {
        if (!isGroup) return (mess.group)
        if (!isGroupAdmins && !isOwner) return (mess.admin)
        if (q.startsWith("@")) {
          if (db.data.chat[from].sDone.length !== 0) {
            let textDone = db.data.chat[from].sDone
            ronzz.sendMessage(from, { text: textDone.replace('tag', q.replace(/[^0-9]/g, '')).replace('@jam', jamwib).replace('@tanggal', tanggal).replace('@status', 'Berhasil'), mentions: [q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'] });
          } else {
            ronzz.sendMessage(from, { text: `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jamwib}\n✨ STATUS: Berhasil\`\`\`\n\nTerimakasih @${q.replace(/[^0-9]/g, '')} next order yaa🙏`, mentions: [q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'] }, { quoted: msg });
          }
        } else if (isQuotedMsg) {
          if (db.data.chat[from].sDone.length !== 0) {
            let textDone = db.data.chat[from].sDone
            ronzz.sendMessage(from, { text: textDone.replace('tag', quotedMsg.sender.split("@")[0]).replace('@jam', jamwib).replace('@tanggal', tanggal).replace('@status', 'Berhasil'), mentions: [quotedMsg.sender] }, { quoted: msg })
          } else {
            ronzz.sendMessage(from, { text: `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jamwib}\n✨ STATUS: Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} next order yaa🙏`, mentions: [quotedMsg.sender] })
          }
        } else {
          reply('Reply atau tag orangnya')
        }
      }
        break

      case 'proses':
        if (!isGroup) return (mess.group)
        if (!isGroupAdmins && !isOwner) return (mess.admin)
        if (isQuotedMsg) {
          if (db.data.chat[from].sProses.length !== 0) {
            let textProses = db.data.chat[from].sProses
            ronzz.sendMessage(from, { text: textProses.replace('tag', quotedMsg.sender.split("@")[0]).replace('@jam', jamwib).replace('@tanggal', tanggal).replace('@status', 'Pending'), mentions: [quotedMsg.sender] }, { quoted: msg });
          } else {
            ronzz.sendMessage(from, { text: `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jamwib}\n✨ STATUS: Pending\`\`\`\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang diproses🙏`, mentions: [quotedMsg.sender] });
          }
        } else if (q.startsWith("@")) {
          if (db.data.chat[from].sProses.length !== 0) {
            let textProses = db.data.chat[from].sProses
            ronzz.sendMessage(from, { text: textProses.replace('tag', q.replace(/[^0-9]/g, '')).replace('@jam', jamwib).replace('@tanggal', tanggal).replace('@status', 'Pending'), mentions: [q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'] });
          } else {
            ronzz.sendMessage(from, { text: `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jamwib}\n✨ STATUS: Pending\`\`\`\n\nPesanan @${q.replace(/[^0-9]/g, '')} sedang diproses🙏`, mentions: [q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'] }, { quoted: msg });
          }
        } else {
          reply('Reply atau tag orangnya')
        }
        break

      case 'testi': {
        if (Object.keys(db.data.testi).length === 0) return reply(`Belum ada list testi di database`)
        let teks = `Hai @${sender.split("@")[0]}\nBerikut list testi owner saya\n\n`
        for (let x of db.data.testi) {
          teks += `*LIST KEY:* ${x.key}\n\n`
        }
        teks += `_Ingin melihat listnya?_\n_Ketik key saja_\n\n_Contoh:_\n${db.data.testi[0].key}`
        ronzz.sendMessage(from, { text: teks, mentions: [sender] }, { quoted: msg })
      }
        break

      case 'addtesti': {
        if (isGroup) return reply(mess.private)
        if (!isOwner) return reply(mess.owner)
        if (isImage || isQuotedImage) {
          if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix + command} *key@response*\n\n_Contoh_\n\n${prefix + command} tes@apa`)
          if (isAlreadyResponTesti(q.split("@")[0])) return reply(`List respon dengan key : *${q.split("@")[0]}* sudah ada.`)
          let media = await downloadAndSaveMediaMessage('image', `./options/sticker/${sender}.jpg`)
          let tph = await TelegraPh(media)
          addResponTesti(q.split("@")[0], q.split("@")[1], true, tph)
          reply(`Berhasil menambah list testi *${q.split("@")[0]}*`)
          fs.unlinkSync(media)
        } else {
          reply(`Kirim gambar dengan caption ${prefix + command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix + command} *key@response*`)
        }
      }
        break

      case 'deltesti':
        if (isGroup) return reply(mess.private)
        if (!isOwner) return reply(mess.owner)
        if (db.data.testi.length === 0) return reply(`Belum ada list testi di database`)
        if (!q) return reply(`Gunakan dengan cara ${prefix + command} *key*\n\n_Contoh_\n\n${prefix + command} hello`)
        if (!isAlreadyResponTesti(q)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
        delResponTesti(q)
        reply(`Sukses delete list testi dengan key *${q}*`)
        break

      case 'settesti': {
        if (!isOwner) return reply(mess.owner)
        if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix + command} *key@response*\n\n_Contoh_\n\n${prefix + command} tes@apa`)
        if (!isAlreadyResponTesti(q.split("@")[0])) return reply(`List testi dengan key *${q.split("@")[0]}* tidak ada di database.`)
        if (isImage || isQuotedImage) {
          let media = await downloadAndSaveMediaMessage('image', `./options/sticker/${sender}.jpg`)
          let tph = await TelegraPh(media)
          updateResponTesti(q.split("@")[0], q.split("@")[1], true, tph)
          reply(`Berhasil mengganti list testi *${q.split("@")[0]}*`)
          fs.unlinkSync(media)
        } else {
          reply(`Kirim gambar dengan caption ${prefix + command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix + command} *key@response*`)
        }
      }
        break

      case 'open':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        await ronzz.groupSettingUpdate(from, 'not_announcement')
        await reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini.`)
        break

      case 'close':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        await ronzz.groupSettingUpdate(from, 'announcement')
        await reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini.`)
        break

      case 'tagall':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        let teks = `══✪〘 *👥 TAG ALL* 〙✪══\n\n${q ? q : 'Tidak ada pesan'}\n`
        for (let mem of participants) {
          teks += `➲ @${mem.id.split('@')[0]}\n`
        }
        ronzz.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) })
        break

      case 'hidetag': case 'ht': case 'h': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        let mem = groupMembers.map(i => i.id)
        ronzz.sendMessage(from, { text: q ? q : '', mentions: mem })
      }
        break

      case 'setdesc':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        if (!q) return reply(`Contoh: ${prefix + command} New Description by ${ownerName}`)
        await ronzz.groupUpdateDescription(from, q)
          .then(res => {
            reply(`Sukses set deskripsi group.`)
          }).catch(() => reply(mess.error.api))
        break

      case 'setppgrup': case 'setppgc':
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        if (!isBotGroupAdmins) return reply(mess.botAdmin)
        if (isImage || isQuotedImage) {
          var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
          try {
            let { img } = await pepe(media)
            await ronzz.query({ tag: 'iq', attrs: { to: from, type: 'set', xmlns: 'w:profile:picture' }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
            fs.unlinkSync(media)
            reply(`Sukses set pp group.`)
          } catch {
            var data = await ronzz.updateProfilePicture(from, { url: media })
            fs.unlinkSync(media)
            reply(`Sukses set pp group.`)
          }
        } else {
          reply(`Kirim/balas gambar dengan caption ${prefix + command} untuk mengubah foto profil grup`)
        }
        break

      default:
        if (budy.startsWith('=>')) {
          if (!isOwner) return
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
          } catch (e) {
            reply(String(e))
          }
        }
        if (budy.startsWith('>')) {
          if (!isOwner) return
          try {
            let evaled = await eval(budy.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await reply(evaled)
          } catch (err) {
            reply(String(err))
          }
        }
        if (budy.startsWith('$')) {
          if (!isOwner) return
          let qur = budy.slice(2)
          exec(qur, (err, stdout) => {
            if (err) return reply(err)
            if (stdout) {
              reply(stdout)
            }
          })
        }
    }
  } catch (err) {
    console.log(color('[ERROR]', 'red'), err)
  }
}