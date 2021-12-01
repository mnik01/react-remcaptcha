import React, { useEffect, useState } from "react"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { ConfigV3, RecaptchaVersionEnum } from "../hooks/useRecaptcha/types"

enum CaptchaActionsEnum {
  SUBMIT_COMMENT = 'submit_comment',
  LOGIN = 'login',
  SEND_SMS_RESTORE_PASS = 'send_sms',
  SEND_SMS_SIGN_ON = 'send_sms',
}

export const Test = ({ onToken }: {onToken: (token: string) => void }) => {
  const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false)
  const reCaptchaConfig: ConfigV3 = {
    version: RecaptchaVersionEnum.V3,
    apiKey: 'lol',
    onError: () => {
      alert('It looks like there is an error in the captcha')
    },
    onLoad: () => {
      setIsCaptchaLoaded(true)
    },
  }

  const { execute } = useRecaptcha(reCaptchaConfig)


  // @ts-ignore
  useEffect(async () => {
    const token = await execute<CaptchaActionsEnum>(
      CaptchaActionsEnum.SEND_SMS_SIGN_ON
    )

    // TODO: check is token verifying need and may be included in hook
    onToken(token)
  }, [])

  return (
    <div>
      {isCaptchaLoaded ?
      <p>
      loaded
    </p> : <p>
        loading
      </p>
        }
    </div>
  )
}
