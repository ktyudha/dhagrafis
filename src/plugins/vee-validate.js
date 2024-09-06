import { configure } from 'vee-validate'

export function initVeeValidate() {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true
  })
}
