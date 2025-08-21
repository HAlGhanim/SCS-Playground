// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://192.168.100.158:8080/',
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
  employedAbroad: 'https://websvcs01.pifss.devlocal/CoreBizApi/',
  scsbackendUrl: 'https://websvcs01.pifss.devlocal/',
  // pifssApiDocUrl: 'http://192.168.101.192:3000/toPDF/',
  pifssApiKey: '+~^HaKocPIFSS0F#C+KGCCRPTAPI5',
  endpoints: {
    certificates: 'certificates/',
    unenrolledData: 'unenrolledData/',
    gcc: {
      certificates: 'GCC/certificates/',
      // gccRpt: 'http://192.168.100.100/GCCReport/api/',
      gccRpt: 'https://192.168.100.100/gccproxy/api/',
    },
    pbDapperUrl: 'http://192.168.100.100/PBDapper/',
  },
};
