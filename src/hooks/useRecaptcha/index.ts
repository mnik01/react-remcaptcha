import { useEffect, useState } from "react";
import useScript from "react-script-hook";
import { v3ApiBasePath } from "./constants";
import { injectStyle, isBrowser } from "./helpers";
import {
  ConfigV2,
  ConfigV2Specific,
  ConfigV3,
  ConfigV3Specific,
  RecaptchaApi,
  RecaptchaApiV2,
  RecaptchaApiV3,
  RecaptchaConfig,
  RecaptchaV3Instance,
  RecaptchaVersionEnum,
} from "./types";

/**
 * @docs https://github.com/mnik01/react-remcaptcha
 * @example
 *  TODO: write example
 */
export function useRecaptcha(config: ConfigV2): RecaptchaApiV2;
export function useRecaptcha(config: ConfigV3): RecaptchaApiV3;
export function useRecaptcha({
  apiKey,
  version = RecaptchaVersionEnum.V3,
  onLoad = () => {},
  onError = () => {},
  checkForExisting = true,
  ...restConfigs
}: RecaptchaConfig): RecaptchaApi {
    const isValidVersion =
      version === RecaptchaVersionEnum.V2 || version === RecaptchaVersionEnum.V3
    if (!isValidVersion) throw new Error('Invalid reCaptcha version provided')

    const isV2 = version === RecaptchaVersionEnum.V2
    const [recaptcha, setRecaptcha] = useState<RecaptchaV3Instance | null>(null)
    const [recaptchaLoaded, setRecaptchaLoaded] = useState<boolean>(false)
    const [scriptInjectError, setScriptInjectError] = useState(null)
    const [shouldHideDefaultBadge, setShouldHideDefaultBadge] = useState(false)
    // TODO: ask for refactor ideas
    let error: any = null;

    if(isV2) {
      // @ts-ignore TODO: implement
      const { container, onVerify } = restConfigs as Omit<ConfigV2Specific, 'version'>
    } else {
      const { hideDefaultBadge } = restConfigs as Omit<ConfigV3Specific, 'version'>

      if (hideDefaultBadge) {
        setShouldHideDefaultBadge(true)
      }
    }

    useEffect(() => {
      if (isBrowser && shouldHideDefaultBadge) {
        injectStyle('.grecaptcha-badge { visibility: hidden; }');
      }
    }, [shouldHideDefaultBadge])

    const updateCaptchaInstance = () => {
      (window as any).grecaptcha.ready(() => {
        setRecaptcha((window as any).grecaptcha);
      })
    }

    const onLoadHandler = () => {
      setRecaptchaLoaded(true);
      updateCaptchaInstance();
      onLoad()
    }

    // Both useScript and useEffect needed
    useEffect(() => {
      if ((window as any).grecaptcha) {
        onLoadHandler()
      }
    }, []);
    // TODO: check script inject error logic. Ask for refactoring ideas
    error = useScript({
      src: `${v3ApiBasePath}${apiKey}`,
      onload: () => {
        onLoadHandler()
      },
      checkForExisting
    })[1];

    // TODO: check script inject error logic. Ask for refactoring ideas
    useEffect(() => {
      if (scriptInjectError) {
        onError({message: error?.message ?? 'Unknown error'})
      }
    }, [scriptInjectError]);
    useEffect(() => {
      setScriptInjectError(error)
    }, [error]);


    useEffect(() => {
      if (recaptcha) {
        // TODO: inject in container in V2 case
        // In V3 provide execute func setExecute()
      }
    }, [recaptchaLoaded]);



    const v2Api: RecaptchaApiV2 = {
      forceSubmit: () => {}, // forceSubmit ? forceSubmit : stub func or null as func
    }

    const v3Api: RecaptchaApiV3 = {
      // TODO: currently support only `Programmatically invoke the challenge` method
      // But would be nice to have `Automatically bind the challenge` to a button method
      // https://developers.google.com/recaptcha/docs/v3
      execute: async (action: string) => {
        if (!recaptcha) {
          throw new Error('Recaptcha script not available');
        }

        return recaptcha.execute(apiKey, { action })
      }
    }

    return isV2 ? v2Api : v3Api
}
