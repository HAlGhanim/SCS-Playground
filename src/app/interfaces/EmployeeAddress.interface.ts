export interface AddressData {
  m_ADDR_ADDRESS_1: string;
  m_ADDR_ADDRESS_2: string;
  m_ADDR_ADDRESS_3?: any;
  m_ADDR_ADDRESS_4?: any;
  m_ADDR_ADDRESS_5?: any;
  m_ADDR_ADDRESS_6: string;
}

export interface Address {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: AddressData;
}
