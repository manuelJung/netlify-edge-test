
// list of ab-test locales
const locales = new Set(['/de-de'])


// http://localhost:8888/de-de/script.js -> http://localhost:8888/content-b/de-de/script.js
export default async (request: Request, context: any) => {
  let [,host, pathname] = request.url.match(/(https?:\/\/[^\/]*)(.*)/)!


  const cookieName = 'server-ab-mode'
  let cookieValue = context.cookies.get(cookieName)

  if(!cookieValue) {
    cookieValue = Math.random() > 0.5 ? 'a' : 'b'
    context.cookies.set({
      name: cookieName,
      value: cookieValue
    })
  }

  if(cookieValue === 'a') return
  
  // /de-de -> /de-de/content-b
  const bUrl = request.url.replace(host, '/content-b' + pathname)
  
  console.log('-------------------------------')
  console.log(request.url)
  console.log(cookieName, cookieValue)
  console.log('host', host)
  console.log('pathname', pathname)


  return context.rewrite(bUrl)
};