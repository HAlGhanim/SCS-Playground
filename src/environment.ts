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
      redirectUri: 'http://192.168.100.100/gcceab',
      postLogoutRedirectUri: 'http://192.168.100.100/gcceab',
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
      gccRpt: 'http://192.168.100.100/GCCReport/api/',
    },
    pbDapperUrl: 'http://192.168.100.100/PBDapper/',
  },
};
