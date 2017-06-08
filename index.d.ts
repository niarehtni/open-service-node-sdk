export type CallbackQueryParams = {
  signature: string,
  timestamp: number | string,
  nonce?: string
};

export type CallbackBody = { encrypt: string };

export function verifySignature(query: CallbackQueryParams, body: CallbackBody, token: string): boolean;

export function sign(...rests: Array<string>): string;

export function randomEncodingAESKey(): string;

export interface AES {
  encrypt: (encodingAESKey: string,
            appId: string,
            clearData: string) => string,
  decrypt: (encodingAESKey: string, appId: string,
            encrypt: string) => { before: string, content?: any, after: string },
}
