export type LoadingError = {
  message: string
}

// Нигде не экспортиться из index.d.ts
// TODO: Не помешает ли енам в конечном проекте юзеров? ts/js проверить
export enum RecaptchaVersionEnum {
  V2 = 'V2',
  V3 = 'V3',
}

// Config
export type RecaptchaCommonConfig = {
  apiKey: string
  onLoad?: () => void,
  onError?: (error: LoadingError) => void,
  checkForExisting?: boolean,
}
export type ConfigV2Specific = {
  version: RecaptchaVersionEnum.V2
  container: HTMLDivElement | null,
  onVerify: () => void,
}
export type ConfigV3Specific = {
  version: RecaptchaVersionEnum.V3
  hideDefaultBadge?: boolean
}
export type ConfigV2 = RecaptchaCommonConfig & ConfigV2Specific
export type ConfigV3 = RecaptchaCommonConfig & ConfigV3Specific
export type RecaptchaConfig = ConfigV2 | ConfigV3


// Api returned to user
export type RecaptchaApiCommon = {}
export type RecaptchaApiV2 = RecaptchaApiCommon & {
  forceSubmit: () => void,
}
export type RecaptchaApiV3 = RecaptchaApiCommon & {
  execute: <T extends string>(action?: T) => Promise<string>,
}
export type RecaptchaApi = RecaptchaApiV2 | RecaptchaApiV3


// Internal. Incapsulated in hook
export interface RecaptchaV3Instance {
  ready(): Promise<void>;
  render(
      container: HTMLElement,
      config: { theme?: 'dark' | 'light'; size?: 'compact' | 'normal' },
  ): void;
  execute<T extends string>(sitekey: string, config: { action: T }): Promise<string>;
}
