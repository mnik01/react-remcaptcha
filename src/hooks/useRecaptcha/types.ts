export type RecaptchaCommonConfig = {
  apiKey: string
}

// TODO: Не помешает ли енам в конечном проекте юзеров? ts/js проверить
export enum RecaptchaVersionEnum {
  V2 = 'V2',
  V3 = 'V3',
}

export type ConfigV2 = RecaptchaCommonConfig & {
  version: RecaptchaVersionEnum.V2
  container: HTMLDivElement | null,
}
export type ConfigV3 = RecaptchaCommonConfig & {
  version: RecaptchaVersionEnum.V3
}

export type RecaptchaConfig = ConfigV2 | ConfigV3

export type RecaptchaApiCommon = {
  onLoad: () => void,
  onError: () => void,
}

export type RecaptchaApiV2 = RecaptchaApiCommon & {
  onVerify: () => void,
  forceSubmit: () => void,
}
export type RecaptchaApiV3 = RecaptchaApiCommon & {
  execute: () => Promise<string>,
}

export type RecaptchaApi = RecaptchaApiV2 | RecaptchaApiV3

export interface RecaptchaV3Instance {
  ready(): Promise<void>;
  render(
      container: HTMLElement,
      config: { theme?: 'dark' | 'light'; size?: 'compact' | 'normal' },
  ): void;
  execute(sitekey: string, config: { action: string }): string;
}