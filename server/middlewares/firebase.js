const admin = require('firebase-admin');

const serviceAccount = {
    type: "service_account",
    project_id: "atra-de68e",
    private_key_id: "6ac6a8deb841bcdbf15971d9b5c02ccac7bceba6",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC24z2nlxnWa2dC\nC2YAkH94hNg0kUc5+u9L2aRuZ3ovbc/u42rpAWQeeTNWgMkVYCO5IdXTQ5LsUC8Y\n1PRef5QYVCHA2OVGfTgtipX3rEQFC//7JYWr3dC9MmQsovfOTHjDjfdDd0STjA/T\nkETE12gA1gWmilm/bdf3tKUktqWSNkEjGCXy8mm7CSE/jOgiDjmsgYDDuSemxUqX\nb3D/OXJiFa1qpw8DLgpAYGYZkZ7MJxaU+F8+d5ZQyjuQxwuocBnypKOmLV4mN9we\nM1UA2gD+J9eS+Y840NT9+E+MxFuKDOtspFYEBe8M4xkcdiQPYUWTIcdCp1Ek9738\nGTFUn36FAgMBAAECggEACZaoaNz3MdK3uzK1ylnJFRyB6V+kiFmrqiJjCJbMRShQ\nuomZ1VWJVj+sfWCLKl+7/7zSZR0p2tHpZjfkCABQV2YxztaQTr3J8DlP24hgmJMk\nfJpfA7/BbenybpSswVgpDLeouxTJt6KkQcdSk69neIPAEBc41VyA8i+6aM5ap+ux\nlba4d1vsgglArtE53TMUv7pCWyOeh9um5PeLPKTqI/EnlQGWsBNk1Z47GKUmNQiz\nF/NPq0sbEAMMzL+7m8VMQ+zVf11z0zIpZKOS6Bm5y13B/RXBZj1AGhjtj1RLgYN5\nS/6MpJW/5ekajWpUOttm94yGD+PCkb+Q+HvLFqDAEQKBgQDbJaEdVLU+/lnx9tht\nCsJJryFW1O+o8JND3a7oXHWPJ6DJ/WIzigEHcKDZxcq8nHCJgJvcdSRzVnFyBcem\naRSEN7KrPQ1StOrc0K06y0/JYJZrZkKLCMebFE3hfVO7LUNKG0IOT/ouFEkL8q+k\nLV6SejokgE3PIrvL62KjCfaETwKBgQDVpKHJSGE8xTIcgOOEcmuuN0P+nZQGWaV0\nDZzBizXSebCHLWe/oiXKaQAqXLMAa/6ppCBWyIWf6him/M1NJRB7HYIbQ6cbyRGl\nsBjDNha98QwbMv4O6rKgLrrYu47QNYZdtO8yT29BvdEmmvUqj3x0SwKiuncgcYju\nL/LJtybW6wKBgQC8RefVOyE7rWm450mo5MVmaH9MCkSb75OViq7qEgUtp+4LmxTz\nEm0v5yNJ9RPoVr6YY1WEYV+fd3SfcTfFUCHANdnaI+l+VNAyRVWOXX1+lOyl+ITS\nzgguw5LlVrbI6GoXELP/d9aIIAVhrm4XrqLBVSD+mvw+KKkO2Hs1dynDIQKBgD6j\ngWfxl8jojFO9GngH0DiJLZ9mdjMSb6dCInbAqSwnz7Eih+uwz+GzvX+uJDF4eHcm\njvDC5CLJ0SaMsmju+BEQysfRoxpLbqgkpG3/2tUf6ovC/KhE+dBrQw8ulqXHO7kX\nxpX6okUlMUBfaIhs/3FdWM17XFgf0aT8W/P2hiW3AoGBAKeyvfY5AGaCVa/lMPCU\nQPFChGnPohAwcrCzoZtRVUJa7W6nw3l90RgaJgjkfUdMN4alXUbzb9xuZej5QH1N\nGLKGex3rc5oOeFQYGlEtbK5KSnDTlTl2mx2qGfdpFaZ4kGjY67aTcD/RAn74vXYr\nbNLLOIWkRym7djYKr2Im2HnF\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-1s8bc@atra-de68e.iam.gserviceaccount.com",
    client_id: "107357205408034783341",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1s8bc%40atra-de68e.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clientProject.firebaseio.com',
});

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  // console.log(header+"header from firbase")
  if (header !== 'Bearer null' && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    // console.log(idToken)
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // console.log("vfffffff")
      // console.log(decodedToken)
      req['currentUser'] = decodedToken;
      // console.log(req.currentUser.user_id)
    } catch (err) {
      console.log(err);
    }
  }
  next();
}
module.exports = decodeIDToken;

