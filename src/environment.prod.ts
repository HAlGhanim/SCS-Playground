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
    entraId: {
      clientId: '163a6668-d7c7-428d-88a5-0dae8bf35311',
      tenantId: '31819927-6989-4bd0-b5e5-81740d4154c3',
      apiScopes: ['api://163a6668-d7c7-428d-88a5-0dae8bf35311/User.Read'],
      authority:
        'https://login.microsoftonline.com/31819927-6989-4bd0-b5e5-81740d4154c3',
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
      // gccRpt: 'http://websvcs.pifss.local/GCCRPT/api/',
      // gccRpt: 'http://websvcs.pifss.local/GCCProxy/api/',
      gccRpt: 'https://192.168.100.100/gccproxy/api/',
    },
    pbDapperUrl: 'http://websvcs.pifss.local/pbalances/',
  },
};
