const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: '144.76.58.217', // Sunucu IP'si
  port: 33029,           // Sunucu portu
  username: 'Oyuncu',    // Oyuncu ismi
  version: '1.19.3'      // Minecraft sürümü
})

const password = '12AA123'  // Belirlediğin şifre

// Sunucuya bağlandığında çalışır
bot.on('spawn', () => {
  console.log('Bot sunucuya bağlandı ve spawn oldu!')

  // İlk bağlanışta /register komutunu gönder
  bot.chat(`/register ${password} ${password}`)
  console.log('Kayıt komutu gönderildi.')

  // Birkaç saniye bekledikten sonra /login komutunu gönder
  setTimeout(() => {
    bot.chat(`/login ${password}`)
    console.log('Giriş komutu gönderildi.')
  }, 5000)  // 5 saniye bekler
})

// Sohbet mesajlarını dinler
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log(`${username}: ${message}`)
})

// Anti-AFK fonksiyonu
function antiAfk() {
  setInterval(() => {
    bot.setControlState('jump', true)  // Zıplama başlar
    setTimeout(() => {
      bot.setControlState('jump', false)  // Zıplama biter
    }, 1000)  // 1 saniye zıplar
  }, 60000)  // Her 1 dakikada bir
}

// Bot giriş yaptıktan sonra anti-AFK başlar
bot.on('login', () => {
  console.log('Bot giriş yaptı!')
  antiAfk()
})

// Bot bağlantısı kesilirse tekrar bağlanır
bot.on('end', () => {
  console.log('Bot bağlantısı sona erdi, tekrar bağlanıyor...')
  setTimeout(() => bot.connect(), 5000)
})
