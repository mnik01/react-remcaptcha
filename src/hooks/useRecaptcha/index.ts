import { useEffect, useState } from "react";
import useScript from "react-script-hook";
import { v3ApiBasePath } from "./constants";
import {
  ConfigV2,
  ConfigV3,
  RecaptchaApiV2,
  RecaptchaApiV3,
  RecaptchaConfig,
  RecaptchaV3Instance,
  RecaptchaVersionEnum,
} from "./types";

/**
 * Get and use Google reCaptcha via this hook
 * @example
 *  const captchaConfigV2 = {
 *    version: 'V2',
 *    apiKey: 'YOUR_V2_TOKEN'
 *    container: document.getElementById('captcha-container')
 *  }
 *
 *  const {
 *    onLoad,
 *    onError,
 *    onVerify,
 *    forceSubmit
 *  } = useRecaptcha(captchaConfigV2)
 *
 *  return (
 *    <div id="captcha-container">
 *      <Loading>This will be displayed while loading</Loading>
 *    </div>
 *  )
 */
export function useRecaptcha(config: ConfigV2): RecaptchaApiV2;
export function useRecaptcha(config: ConfigV3): RecaptchaApiV3;
export function useRecaptcha(
  { version }: RecaptchaConfig
): RecaptchaApiV2 | RecaptchaApiV3 {
    const isV2 = version === RecaptchaVersionEnum.V2
    const [recaptcha, setRecaptcha] = useState<RecaptchaV3Instance | null>(null)
console.log('recaptcha :>> ', recaptcha);
    useScript({
      src: v3ApiBasePath + '${sitekey}',
      onload: () =>
          (window as any).grecaptcha.ready(() => {
              setRecaptcha((window as any).grecaptcha);
          }),
    });
    useEffect(() => {
      if ((window as any).grecaptcha) {
          (window as any).grecaptcha.ready(() => {
              setRecaptcha((window as any).grecaptcha);
          });
      }
  }, []);

    const v2Api: RecaptchaApiV2 = {
      onLoad: () => {},
      onError: () => {},
      onVerify: () => {},
      forceSubmit: () => {},
    }

  // execute =
  //   (action: string) => {
  //     return new Promise<string>((resolve, reject) => {
  //         if (recaptcha) {
  //             resolve(recaptcha.execute(sitekey, { action }));
  //         } else {
  //             reject(new Error('Recaptcha script not available'));
  //         }
  //     });
  //   }
    const v3Api: RecaptchaApiV3 = {
      onLoad: () => {},
      onError: () => {},
      execute: () => new Promise(() => {}),
    }

    return isV2 ? v2Api : v3Api
}
