
// http://localhost:8888/script.js -> http://localhost:8888/content-b/script.js
// http://localhost:8888 -> http://localhost:8888/content-b
export default async (request: Request, context: any) => {
  let [,host, pathname] = request.url.match(/(https?:\/\/[^\/]*)(.*)/)!

  if(pathname.includes('/content-b')) return
  
  // /script.js -> /content-b/script.js
  const bUrl = request.url.replace(host, '/content-b' + pathname)

  return context.rewrite(bUrl)
};