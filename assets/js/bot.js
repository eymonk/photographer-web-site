async function sendNotification(text) {
  const url = `https://api.telegram.org/bot6684271386:AAHwLY9D_q5h8AQWPYUWZUR1cA6kmTIoZY4/sendMessage?chat_id=366474517&text=${text || 'user sent no data...'}`

  await fetch(url)
    .then(() => console.log(`Sent this to JaySun0 telegram:\n${text}`))
    .catch(err => {
      console.log(`Can't send you number to JaySun0.\nConnect him via telegram (JaySun0), please.\nError`)
      console.log(err)  
    })
}

export { sendNotification }