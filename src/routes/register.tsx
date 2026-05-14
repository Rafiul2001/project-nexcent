import { registerSchema } from '#/validators/user.validator'
import { Button } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

// ─── helpers ────────────────────────────────────────────────────────────────

function fieldError(errors: unknown[], touched: boolean) {
  if (!touched || errors.length === 0) return undefined
  return typeof errors[0] === 'string' ? errors[0] : undefined
}

const inputBase =
  'w-full px-3 py-2.5 rounded-xl border text-sm text-ink bg-surface-soft placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 transition-all'
const inputNormal = `${inputBase} border-border focus:border-brand focus:ring-brand/15`
const inputError = `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-400/15`

function getPasswordStrength(pw: string) {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColor = [
  '',
  'bg-red-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-brand',
]

// ─── sub-components ─────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const score = getPasswordStrength(password)
  if (!password) return null
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? strengthColor[score] : 'bg-border'
            }`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-medium ${score <= 1 ? 'text-red-400' : score === 2 ? 'text-orange-400' : score === 3 ? 'text-yellow-500' : 'text-brand'}`}
      >
        {strengthLabel[score]}
      </span>
    </div>
  )
}

function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col items-center justify-center p-14 bg-linear-to-br from-primary-700 via-primary-600 to-primary-900">
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute top-1/3 -right-10 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative z-10 text-white text-center max-w-sm">
        <img
          src="/Logo.svg"
          alt="Nexcent"
          className="h-9 w-auto mx-auto mb-14 brightness-0 invert"
        />

        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
          <Sparkles size={14} />
          Join thousands of teams
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          Build your community today
        </h1>
        <p className="text-white/65 text-base leading-relaxed">
          Create an account and start growing your audience with Nexcent's
          powerful community tools.
        </p>

        <div className="mt-12 flex flex-col gap-3 text-left">
          {[
            'Free to get started — no credit card required',
            'Unlimited members on the free plan',
            'Analytics and insights from day one',
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-brand-tint-4 shrink-0" />
              <span className="text-sm text-white/75">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

function RegisterPage() {
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    onSubmit: async ({ value }) => {
      // TODO: replace with real auth call
      console.log('Register:', value)
      await navigate({ to: '/' })
    },
  })

  return (
    <div className="min-h-screen flex bg-surface-soft">
      <BrandPanel />

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="w-full max-w-md py-6"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <img src="/Logo.svg" alt="Nexcent" className="h-8 w-auto" />
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-sm p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-ink">Create an account</h2>
              <p className="text-ink-soft text-sm mt-1.5">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-brand font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              {/* First name + Last name */}
              <div className="grid grid-cols-2 gap-3">
                <form.Field
                  name="firstName"
                  validators={{
                    onChange: ({ value }) => {
                      const r = registerSchema.shape.firstName.safeParse(value)
                      return r.success ? undefined : r.error.issues[0]?.message
                    },
                  }}
                >
                  {(field) => {
                    const err = fieldError(
                      field.state.meta.errors,
                      field.state.meta.isTouched,
                    )
                    return (
                      <FormField label="First name" error={err}>
                        <div className="relative">
                          <User
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                          />
                          <input
                            type="text"
                            autoComplete="given-name"
                            placeholder="Jane"
                            className={`${err ? inputError : inputNormal} pl-8`}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                          />
                        </div>
                      </FormField>
                    )
                  }}
                </form.Field>

                <form.Field
                  name="lastName"
                  validators={{
                    onChange: ({ value }) => {
                      const r = registerSchema.shape.lastName.safeParse(value)
                      return r.success ? undefined : r.error.issues[0]?.message
                    },
                  }}
                >
                  {(field) => {
                    const err = fieldError(
                      field.state.meta.errors,
                      field.state.meta.isTouched,
                    )
                    return (
                      <FormField label="Last name" error={err}>
                        <input
                          type="text"
                          autoComplete="family-name"
                          placeholder="Doe"
                          className={err ? inputError : inputNormal}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </FormField>
                    )
                  }}
                </form.Field>
              </div>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const r = registerSchema.shape.email.safeParse(value)
                    return r.success ? undefined : r.error.issues[0]?.message
                  },
                }}
              >
                {(field) => {
                  const err = fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )
                  return (
                    <FormField label="Email address" error={err}>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                        />
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={`${err ? inputError : inputNormal} pl-9`}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </div>
                    </FormField>
                  )
                }}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    const r = registerSchema.shape.password.safeParse(value)
                    return r.success ? undefined : r.error.issues[0]?.message
                  },
                }}
              >
                {(field) => {
                  const err = fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )
                  return (
                    <FormField label="Password" error={err}>
                      <div className="relative">
                        <Lock
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                        />
                        <input
                          type={showPw ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`${err ? inputError : inputNormal} pl-9 pr-10`}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                          aria-label={
                            showPw ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      <PasswordStrength password={field.state.value} />
                    </FormField>
                  )
                }}
              </form.Field>

              {/* Confirm password */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (value !== form.state.values.password)
                      return "Passwords don't match"
                    return undefined
                  },
                }}
              >
                {(field) => {
                  const err = fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )
                  return (
                    <FormField label="Confirm password" error={err}>
                      <div className="relative">
                        <Lock
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                        />
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`${err ? inputError : inputNormal} pl-9 pr-10`}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                          aria-label={
                            showConfirm ? 'Hide password' : 'Show password'
                          }
                        >
                          {showConfirm ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>
                    </FormField>
                  )
                }}
              </form.Field>

              {/* Terms */}
              <form.Field
                name="agreeToTerms"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'You must accept the terms to continue'
                    return undefined
                  },
                }}
              >
                {(field) => {
                  const err = fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )
                  return (
                    <div className="flex flex-col gap-1">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.state.value}
                          onChange={(e) => field.handleChange(e.target.checked)}
                          onBlur={field.handleBlur}
                          className="w-4 h-4 mt-0.5 accent-brand cursor-pointer shrink-0"
                        />
                        <span className="text-sm text-ink-soft leading-snug select-none">
                          I agree to the{' '}
                          <a
                            href="#terms"
                            className="text-brand font-medium hover:underline"
                          >
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a
                            href="#privacy"
                            className="text-brand font-medium hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                      {err && (
                        <p className="flex items-center gap-1 text-xs text-red-500 ml-6">
                          <AlertCircle size={11} className="shrink-0" />
                          {err}
                        </p>
                      )}
                    </div>
                  )
                }}
              </form.Field>

              {/* Submit */}
              <form.Subscribe
                selector={(s) => [s.canSubmit, s.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl mt-1"
                    isDisabled={!canSubmit}
                    isPending={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account…' : 'Create account'}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
