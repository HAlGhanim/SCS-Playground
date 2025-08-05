export const environment = {
  production: true,
  baseUrl: 'http://10.114.1.77:8080/',
  msal: {
    local: {
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'http://localhost:4200',
    },
    dev: {
      redirectUri: 'https://192.168.100.100/gcceab',
      postLogoutRedirectUri: 'https://192.168.100.100/gcceab',
    },
  },
  employedAbroad: 'http://10.114.1.70/CoreBizApi/',
  scsbackendUrl: 'https://websvcs01.pifss.devlocal/',
  pifssApiKey: '+~^HaKocPIFSS0F#C+KGCCRPTAPI5',
  endpoints: {
    certificates: 'certificates/',
    unenrolledData: 'unenrolledData/',
    gcc: {
      certificates: 'GCC/certificates/',
      gccRpt: 'http://websvcs.pifss.local/GCCRPT/api/',
    },
    pbDapperUrl: 'http://websvcs.pifss.local/pbalances/',
  },
};
