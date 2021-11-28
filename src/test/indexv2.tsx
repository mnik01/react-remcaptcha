import React, { useRef } from "react"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { ConfigV2, RecaptchaVersionEnum } from "../hooks/useRecaptcha/types"

export const Test = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const reCaptchaConfigV2: ConfigV2 = {
    apiKey: 'lol',
    version: RecaptchaVersionEnum.V2,
    container: containerRef.current,
    onError: () => {},
    onLoad: () => {},
    onVerify: () => {},
  }

  const { forceSubmit } = useRecaptcha(reCaptchaConfigV2)


  return (
    <div>
      <button onClick={forceSubmit}>
        Submit captcha
      </button>


      <div ref={containerRef}>
        loading
      </div>
    </div>
  )
}
