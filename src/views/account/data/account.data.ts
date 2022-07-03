import { LoginMethod } from '../types/account.types'

export const loginMethods: LoginMethod[] = [
  {
    icon: '/img/icons/google.svg',
    value: 'google',
    disabled: false,
  },
  {
    icon: '/img/icons/facebook.svg',
    value: 'facebook',
    disabled: false,
  },
  {
    icon: '/img/icons/apple.svg',
    value: 'apple',
    disabled: true,
  },
]
