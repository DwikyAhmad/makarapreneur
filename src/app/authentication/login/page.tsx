// src/app/login/page.tsx
import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login | Makarapreneur'
}

export default function LoginPage() {
  return <LoginForm />
}