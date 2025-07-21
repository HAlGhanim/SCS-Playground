// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://192.168.100.158:8080/',
  employedAbroad: 'https://websvcs01.pifss.devlocal/CoreBizApi/',
  scsbackendUrl: 'https://websvcs01.pifss.devlocal/',
  // pifssApiDocUrl: 'http://192.168.101.192:3000/toPDF/',
  pifssApiKey: '+~^HaKocPIFSS0F#C+KGCCRPTAPI5',
  accountApiKey:
    '19c771d93b32bbc762015b0b2a91b9bdb178c1841bcc0522617b08cbc52ac047',
  accountApiKeySecret:
    '6a0a922b61ef20b1aec36f3e5523d5656b78d1fb7e954d7f91e4b0eda09364d2',
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
