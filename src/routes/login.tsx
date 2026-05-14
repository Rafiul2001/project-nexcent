import { loginSchema } from '#/validators/user.validator'
import { Button } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { AlertCircle, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
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
          Community Platform
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          Welcome back to Nexcent
        </h1>
        <p className="text-white/65 text-base leading-relaxed">
          Sign in to manage your community, track growth, and connect with your
          audience.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '10K+', label: 'Communities' },
            { value: '2M+', label: 'Members' },
            { value: '99.9%', label: 'Uptime' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3">
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

function LoginPage() {
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { email: '', password: '', rememberMe: false },
    onSubmit: async ({ value }) => {
      // TODO: replace with real auth call
      console.log('Login:', value)
      await navigate({ to: '/' })
    },
  })

  return (
    <div className="min-h-screen flex bg-surface-soft">
      <BrandPanel />

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <img src="/Logo.svg" alt="Nexcent" className="h-8 w-auto" />
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-sm p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-ink">Sign in</h2>
              <p className="text-ink-soft text-sm mt-1.5">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-brand font-semibold hover:underline"
                >
                  Create one free
                </Link>
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-5"
            >
              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const r = loginSchema.shape.email.safeParse(value)
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
                    const r = loginSchema.shape.password.safeParse(value)
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
                          autoComplete="current-password"
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
                    </FormField>
                  )
                }}
              </form.Field>

              {/* Remember me + forgot */}
              <div className="flex items-center justify-between">
                <form.Field name="rememberMe">
                  {(field) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className="w-4 h-4 rounded accent-brand cursor-pointer"
                      />
                      <span className="text-sm text-ink-soft select-none">
                        Remember me
                      </span>
                    </label>
                  )}
                </form.Field>
                <a
                  href="#forgot"
                  className="text-sm text-brand font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <form.Subscribe
                selector={(s) => [s.canSubmit, s.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl"
                    isDisabled={!canSubmit}
                    isPending={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-ink-muted">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* OAuth placeholders */}
            <div className="grid grid-cols-2 gap-3">
              {(['Google', 'GitHub'] as const).map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-sm font-medium text-ink hover:bg-surface-soft transition-colors"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
