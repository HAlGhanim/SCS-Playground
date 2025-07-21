export const environment = {
  production: true,
  baseUrl: 'http://10.114.1.77:8080/',
  employedAbroad: 'http://10.114.1.70/CoreBizApi/',
  scsbackendUrl: 'https://websvcs01.pifss.devlocal/',
  endpoints: {
    certificates: 'certificates/',
    unenrolledData: 'unenrolledData/',
    gcc: {
      certificates: 'GCC/certificates/',
      gccRpt: 'http://websvcs.pifss.local/GCCRPT/api/',
    },
    pbDapperUrl: 'http://websvcs.pifss.local/pbalances/',
    // the one in dev is gccreports or not
  },
};
