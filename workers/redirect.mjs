const worker = {
  /** @param {Request} request */
  fetch(request) {
    const url = new URL(request.url);
    if (!url.hostname.startsWith("www.")) return new Response("Not found", { status: 404 });
    url.hostname = url.hostname.slice(4);
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }
};
export default worker;
