import React from "react"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { ConfigV3, RecaptchaVersionEnum } from "../hooks/useRecaptcha/types"

export const Test = () => {
  const reCaptchaConfigV3: ConfigV3 = {
    version: RecaptchaVersionEnum.V3,
    apiKey: 'lol',
    onError: () => {},
    onLoad: () => {},
  }

  const { execute } = useRecaptcha(reCaptchaConfigV3)


  return (
    <div>
      loading
    </div>
  )
}
