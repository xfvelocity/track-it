export interface LoginMethod {
  icon: string
  value: string
}

export interface SignUpForm {
  email: string
  password: string
}

export interface LogInForm extends SignUpForm {}
