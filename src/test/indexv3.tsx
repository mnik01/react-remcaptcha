import React, { useEffect } from "react"
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


  // @ts-ignore
  useEffect(async () => {
    await execute()
  }, [])

  return (
    <div>
      loading
    </div>
  )
}
