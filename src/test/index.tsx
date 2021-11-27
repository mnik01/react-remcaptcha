import React, { useRef } from "react"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { ConfigV2, ConfigV3, RecaptchaVersionEnum } from "../hooks/useRecaptcha/types"

export const Test = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const reCaptchaConfigV2: ConfigV2 = {
    apiKey: 'lol',
    version: RecaptchaVersionEnum.V2,
    container: containerRef.current
  }
  const reCaptchaConfigV3: ConfigV3 = {
    version: RecaptchaVersionEnum.V3,
    apiKey: 'lol',
  }

  const v2 = useRecaptcha(reCaptchaConfigV2)
  const v3 = useRecaptcha(reCaptchaConfigV3)

  console.log('v2 :>> ', v2);
  console.log('v3 :>> ', v3);

  return (
    <div ref={containerRef}>
      loading
    </div>
  )
}
