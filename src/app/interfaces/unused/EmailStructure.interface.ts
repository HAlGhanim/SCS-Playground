export interface Attachment {
  name: string;
  stream: string;
}

export interface SendMailWithAttach {
  SentTo: string;
  Cc: string;
  Subject: string;
  Message: string;
  Attachment: Attachment;
}

export interface EmailStructure {
  SendMailWithAttach: SendMailWithAttach;
}
