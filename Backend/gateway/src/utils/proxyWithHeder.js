import Proxy from "express-http-proxy";

export function proxyWithHeder(serviceUrl) {
  return Proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userID;
      }
      return proxyReqOpts
    },
  });
}
