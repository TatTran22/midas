import zxcvbn from 'zxcvbn'
import validator from 'validator'

type Validate = {
  isValid: boolean
  errorMessage: string
  suggestions?: string[]
}

export function validateUsername(username: string): Validate {
  if (validator.isEmpty(username)) {
    return {
      isValid: false,
      errorMessage: 'Username is required',
    }
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/

  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      errorMessage: 'Username must be between 3 and 20 characters and only contain letters, numbers and underscores',
      suggestions: ['Try a different username'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  }
}

export function validatePassword(password: string): Validate {
  if (typeof password !== 'string' || password.length < 8) {
    return {
      isValid: false,
      errorMessage: 'Password must be at least 8 characters',
      suggestions: ['Try a different password'],
    }
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      errorMessage:
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
      suggestions: ['Try a different password'],
    }
  }

  const passwordStrength = zxcvbn(password)

  if (passwordStrength.score < 2) {
    return {
      isValid: false,
      errorMessage: 'Password is too weak',
      suggestions: passwordStrength.feedback.suggestions,
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  }
}

export function validateEmail(email: string): Validate {
  if (validator.isEmpty(email)) {
    return {
      isValid: false,
      errorMessage: 'Email is required',
    }
  }

  if (!validator.isEmail(email)) {
    return {
      isValid: false,
      errorMessage: 'Email is invalid',
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  }
}
