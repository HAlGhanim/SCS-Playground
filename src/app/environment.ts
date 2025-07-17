export const environment = {
  production: false,
  baseUrl: 'http://192.168.100.158:8080/',
  employedAbroad: 'https://websvcs01.pifss.devlocal/CoreBizApi/',
  scsbackendUrl: 'https://websvcs01.pifss.devlocal/',
  // pifssApiDocUrl: 'http://192.168.101.192:3000/toPDF/',
  endpoints: {
    certificates: 'certificates/',
    unenrolledData: 'unenrolledData/',
    gcc: {
      certificates: 'GCC/certificates/',
      gccRpt: 'http://192.168.100.100/GCCReport/',
    },
    pbDapperUrl: 'http://192.168.100.100/PBDapper/',
  },
};
