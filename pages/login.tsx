import type { NextPage } from 'next'
import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Layout from '~/components/Layout'
import { supabase } from '~/lib/supabaseClient'
import { validateEmail, validatePassword, validateUsername } from '~/lib/validateInput'
import Connecting from '~/components/Loading/Loading'

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSignInWithLink, setIsSignInWithLink] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleFirstNameOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value.length === 0) {
      // toaster.danger('Vui lòng điền vào tên của bạn.', {
      //   id: 'first-name-required',
      // })
      console.log('first name required')
    }
    if (value !== firstName) setFirstName(value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleLastNameOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    if (value.length === 0) {
      // toaster.danger('Vui lòng điền vào họ của bạn.', {
      //   id: 'last-name-required',
      // })
      console.log('last name required')
    }
    if (value !== lastName) setLastName(value)
  }

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setEmail(value)
  }

  const handEmailOnBlur = () => {
    if (!validateEmail(email).isValid) {
      // toaster.danger('Vui lòng nhập địa chỉ email hợp lệ', {
      //   id: 'invalid-email',
      // })
      console.log('invalid email')
    }
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value
    setPassword(password)
  }

  const handlePasswordOnBlur = () => {
    if (!isSignUp) return

    const passwordCheckResult = validatePassword(password)
    if (!passwordCheckResult.isValid) {
      // toaster.danger(zxcvbnResult.feedback.warning, {
      //   id: 'weak-password',
      //   description: zxcvbnResult.feedback.suggestions.join('\n'),
      // })
      console.log('weak password')
    }
  }

  const handleConfirmPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const handleConfirmPasswordOnBlur = () => {
    if (confirmPassword !== password) {
      // toaster.danger('Mật khẩu nhập lại không khớp', {
      //   id: 'sign-up-error',
      // })
      console.log('confirm password not match')
    }
  }

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      let valid = true
      if (!validateEmail(email).isValid) {
        // toaster.danger('Vui lòng nhập địa chỉ email hợp lệ', {
        //   id: 'invalid-email',
        // })
        console.log('invalid email')
        valid = false
      }

      if (firstName.length === 0) {
        // toaster.danger('Vui lòng nhập vào tên của bạn.', {
        //   id: 'first-name-required',
        // })
        valid = false
      }

      if (lastName.length === 0) {
        // toaster.danger('Vui lòng nhập vào họ của bạn.', {
        //   id: 'last-name-required',
        // })
        console.log('last name required')
        valid = false
      }

      if (password !== confirmPassword) {
        // toaster.danger('Mật khẩu nhập lại không khớp', {
        //   id: 'sign-up-error',
        // })
        console.log('confirm password not match')
        valid = false
      }

      if (!validatePassword(password).isValid) {
        // toaster.danger('Mật khẩu của bạn quá yếu', {
        //   id: 'weak-password',
        //   description: passwordStrength.feedback.warning,
        // })
        console.log('weak password')
        valid = false
      }

      if (!valid) return

      const { user, error } = await supabase.auth.signUp(
        { email, password },
        {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        }
      )
      if (error) throw error
      // toaster.success('Đăng ký thành công!', {
      //   description: 'Vui lòng kiểm tra hộp thư của bạn để kích hoạt tài khoản.',
      //   id: 'sign-up-success',
      // })
      console.log('sign up success', user)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error signing up:', error)
      // toaster.danger(error.message, {
      //   id: 'sign-up-error',
      // })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      if (email === '' || password === '') {
        // toaster.danger('Vui lòng nhập địa chỉ email và mật khẩu', {
        //   id: 'sign-in-error',
        // })
        console.log('sign in error: email or password is empty')
        return
      }
      const { user, session, error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      // toaster.success('Đăng nhập thành công!', {
      //   id: 'sign-in-success',
      // })
      console.log('logged in', user)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error signing in:', error)
      let message = error.error_description || error.message
      if (error.status === 400 && error.message === 'Email not confirmed') {
        message = 'Vui lòng kiểm tra hộp thư của bạn để kích hoạt tài khoản.'
      }
      if (error.status === 400 && error.message === 'Invalid login credentials') {
        message = 'Email hoặc mật khẩu không đúng.'
      }
      // toaster.danger(message, {
      //   id: 'sign-in-error',
      //   duration: 7,
      // })
      console.log('sign in error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async (email: string) => {
    try {
      setLoading(true)
      if (email === '') {
        throw new Error('Bạn cần nhập vào địa chỉ email.')
      }

      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      // toaster.success('Kiểm tra email của bạn để lấy liên kết!', {
      //   id: 'send-email',
      // })
      console.log('send email success')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error sending email:', error)
      // toaster.danger(error.error_description || error.message, {
      //   id: 'send-email',
      // })
      console.log('send email error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Login">
       <div className="text-gray-800 dark:text-stone-50 dark:text-gray-100"><Connecting /></div>
    </Layout>
  )
}

export default Home
