export const validationSchema = {
  email(value: string): [] | string {
    const isValid: boolean = !!value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    return isValid ? [] : 'Invalid email'
  },
  password(value: string): [] | string {
    if (value.length < 6) {
      return 'Must be at least 6 characters'
    } else if (value.search(/[a-z]/i) < 0) {
      return 'Must contain at least one letter.'
    } else if (value.search(/[0-9]/) < 0) {
      return 'Must contain at least one digit.'
    } else {
      return []
    }
  },
}
