import { useState } from "react";
import type { FormEvent } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { sendLoginCode, verifyLoginCode } from "../../lib/api/auth";
import { useAuthStore } from "../../stores/auth-store";
import "./auth-login.css";

type Language = "en" | "es";
type Step = "email" | "code" | "success";

const copy = {
  en: {
    admin: "Admin portal",
    switchLanguage: "Español",
    eyebrow: "ADMIN ACCESS",
    title: "A little gratitude goes a long way.",
    description:
      "Sign in to the TipPal admin portal with a secure, one-time email code.",
    trust: "No password needed",
    signIn: "Sign in to TipPal",
    emailIntro: "Enter your work email and we’ll send you a six-digit code.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    sendCode: "Send sign-in code",
    sending: "Sending code…",
    codeTitle: "Check your email",
    codeIntro: "Enter the six-digit code sent to",
    codeLabel: "Verification code",
    codePlaceholder: "000000",
    verify: "Verify and continue",
    verifying: "Verifying…",
    resend: "Send a new code",
    resendSent: "A new code was sent.",
    changeEmail: "Use a different email",
    successTitle: "Email verified",
    successIntro: "Your email has been verified.",
    permissionTitle: "Admin access",
    permissionIntro:
      "The backend must confirm that your account has admin permissions before the dashboard can open.",
    startOver: "Start over",
    requiredEmail: "Enter a valid email address.",
    invalidCode: "That code is incorrect or has expired. Check it and try again.",
    locked: "Too many incorrect attempts. Your account is temporarily locked.",
    tooMany: "Too many requests. Wait a moment before trying again.",
    network:
      "We couldn’t reach TipPal right now. Check your connection and try again.",
    generic: "Something went wrong. Please try again.",
  },
  es: {
    admin: "Portal de administración",
    switchLanguage: "English",
    eyebrow: "ACCESO DE ADMINISTRADOR",
    title: "Un poco de gratitud hace mucho.",
    description:
      "Entra al portal de administración de TipPal con un código seguro enviado a tu correo.",
    trust: "Sin contraseña",
    signIn: "Inicia sesión en TipPal",
    emailIntro: "Escribe tu correo de trabajo y te enviaremos un código de seis dígitos.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@empresa.com",
    sendCode: "Enviar código",
    sending: "Enviando código…",
    codeTitle: "Revisa tu correo",
    codeIntro: "Escribe el código de seis dígitos que enviamos a",
    codeLabel: "Código de verificación",
    codePlaceholder: "000000",
    verify: "Verificar y continuar",
    verifying: "Verificando…",
    resend: "Enviar otro código",
    resendSent: "Enviamos un código nuevo.",
    changeEmail: "Usar otro correo",
    successTitle: "Correo verificado",
    successIntro: "Verificamos tu correo electrónico.",
    permissionTitle: "Acceso de administrador",
    permissionIntro:
      "El backend debe confirmar que tu cuenta tiene permisos de administrador antes de abrir el panel.",
    startOver: "Volver a empezar",
    requiredEmail: "Escribe un correo electrónico válido.",
    invalidCode: "El código es incorrecto o venció. Revísalo e inténtalo de nuevo.",
    locked: "Hubo demasiados intentos incorrectos. Tu cuenta está bloqueada temporalmente.",
    tooMany: "Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.",
    network:
      "No pudimos conectar con TipPal. Revisa tu conexión e inténtalo de nuevo.",
    generic: "Algo salió mal. Inténtalo de nuevo.",
  },
} satisfies Record<Language, Record<string, string>>;

function getErrorMessage(
  error: unknown,
  text: (typeof copy)[Language],
  action: "send" | "verify",
): string {
  if (!axios.isAxiosError(error)) return text.generic;
  if (!error.response) return text.network;

  switch (error.response.status) {
    case 401:
      return action === "verify" ? text.invalidCode : text.generic;
    case 423:
      return text.locked;
    case 429:
      return text.tooMany;
    default:
      return text.generic;
  }
}

function LoginFlow({ language }: { language: Language }) {
  const text = copy[language];
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const sendMutation = useMutation({
    mutationFn: sendLoginCode,
    retry: false,
  });

  const verifyMutation = useMutation({
    mutationFn: ({ emailAddress, otp }: { emailAddress: string; otp: string }) =>
      verifyLoginCode(emailAddress, otp),
    retry: false,
    onSuccess: ({ accessToken, user: verifiedUser }) => {
      setSession(accessToken, verifiedUser);
      queryClient.setQueryData(["auth", "me"], verifiedUser);
      setStep("success");
    },
  });

  const isBusy = sendMutation.isPending || verifyMutation.isPending;
  const errorMessage = sendMutation.error
    ? getErrorMessage(sendMutation.error, text, "send")
    : verifyMutation.error
      ? getErrorMessage(verifyMutation.error, text, "verify")
      : "";

  function handleSendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setResendMessage("");
    sendMutation.reset();
    verifyMutation.reset();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFormError(text.requiredEmail);
      return;
    }

    setEmail(normalizedEmail);
    sendMutation.mutate(normalizedEmail, {
      onSuccess: () => {
        setCode("");
        setStep("code");
      },
    });
  }

  function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    verifyMutation.reset();
    sendMutation.reset();
    const normalizedCode = code.replace(/\D/g, "");
    if (normalizedCode.length !== 6) return;

    verifyMutation.mutate({ emailAddress: email, otp: normalizedCode });
  }

  function handleResendCode() {
    setResendMessage("");
    sendMutation.reset();
    sendMutation.mutate(email, {
      onSuccess: () => {
        setCode("");
        setResendMessage(text.resendSent);
      },
    });
  }

  function handleStartOver() {
    clearSession();
    setEmail("");
    setCode("");
    sendMutation.reset();
    verifyMutation.reset();
    setStep("email");
  }

  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <a className="auth-brand" href={language === "es" ? "/es/" : "/"} aria-label="TipPal home">
          <img src="/assets/logo.png" alt="TipPal" />
        </a>
        <div className="auth-topbar-actions">
          <span className="auth-portal-label">{text.admin}</span>
          <a
            className="auth-language-link"
            href={language === "es" ? "/admin/login" : "/es/admin/login"}
            lang={language === "es" ? "en" : "es"}
            aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {text.switchLanguage}
          </a>
        </div>
      </header>

      <div className="auth-content">
        <section className="auth-story" aria-labelledby="auth-story-title">
          <span className="auth-eyebrow">
            <span className="auth-eyebrow-dot" />
            {text.eyebrow}
          </span>
          <h1 id="auth-story-title">{text.title}</h1>
          <p>{text.description}</p>
          <div className="auth-story-footer">
            <span className="auth-lock-icon" aria-hidden="true">✦</span>
            <span>{text.trust}</span>
          </div>
          <span className="auth-orbit auth-orbit-one" aria-hidden="true" />
          <span className="auth-orbit auth-orbit-two" aria-hidden="true" />
        </section>

        <section className="auth-card" aria-live="polite">
          {step === "email" && (
            <>
              <div className="auth-card-heading">
                <span className="auth-step-label">01 / 02</span>
                <h2>{text.signIn}</h2>
                <p>{text.emailIntro}</p>
              </div>
              <form className="auth-form" onSubmit={handleSendCode}>
                <label htmlFor="admin-email">{text.emailLabel}</label>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={text.emailPlaceholder}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFormError("");
                  }}
                  required
                  disabled={isBusy}
                />
                {formError && <p className="auth-error" role="alert">{formError}</p>}
                {sendMutation.isError && (
                  <p className="auth-error" role="alert">{errorMessage}</p>
                )}
                <button className="auth-primary-button" type="submit" disabled={isBusy}>
                  {sendMutation.isPending ? text.sending : text.sendCode}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              <p className="auth-card-note">
                {language === "es"
                  ? "Te enviaremos un código de un solo uso. Nunca te pediremos una contraseña."
                  : "We’ll send a one-time code. We’ll never ask you for a password."}
              </p>
            </>
          )}

          {step === "code" && (
            <>
              <div className="auth-card-heading">
                <span className="auth-step-label">02 / 02</span>
                <h2>{text.codeTitle}</h2>
                <p>{text.codeIntro} <strong>{email}</strong>.</p>
              </div>
              <form className="auth-form" onSubmit={handleVerifyCode}>
                <label htmlFor="admin-code">{text.codeLabel}</label>
                <input
                  id="admin-code"
                  name="one-time-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder={text.codePlaceholder}
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  disabled={isBusy}
                  className="auth-code-input"
                />
                {verifyMutation.isError && (
                  <p className="auth-error" role="alert">{errorMessage}</p>
                )}
                {resendMessage && (
                  <p className="auth-success-message" role="status">{resendMessage}</p>
                )}
                <button className="auth-primary-button" type="submit" disabled={isBusy || code.length !== 6}>
                  {verifyMutation.isPending ? text.verifying : text.verify}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              <div className="auth-code-actions">
                <button type="button" className="auth-text-button" onClick={handleResendCode} disabled={isBusy}>
                  {sendMutation.isPending ? text.sending : text.resend}
                </button>
                <button type="button" className="auth-text-button" onClick={() => {
                  setStep("email");
                  setCode("");
                  sendMutation.reset();
                  verifyMutation.reset();
                }} disabled={isBusy}>
                  {text.changeEmail}
                </button>
              </div>
              {sendMutation.isError && (
                <p className="auth-error auth-resend-error" role="alert">{errorMessage}</p>
              )}
            </>
          )}

          {step === "success" && (
            <div className="auth-success-view">
              <span className="auth-success-icon" aria-hidden="true">✓</span>
              <span className="auth-step-label">{text.trust}</span>
              <h2>{text.successTitle}</h2>
              <p>{text.successIntro} {user?.firstName ?? email}.</p>
              <div className="auth-permission-note">
                <strong>{text.permissionTitle}</strong>
                <p>{text.permissionIntro}</p>
              </div>
              <button className="auth-secondary-button" type="button" onClick={handleStartOver}>
                {text.startOver}
              </button>
            </div>
          )}
        </section>
      </div>

      <footer className="auth-footer">
        <span>TipPal © {new Date().getFullYear()}</span>
        <span>{language === "es" ? "Acceso seguro para administradores" : "Secure access for administrators"}</span>
      </footer>
    </main>
  );
}

export default function AuthLogin({ language = "en" }: { language?: Language }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { retry: false },
          queries: { retry: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LoginFlow language={language} />
    </QueryClientProvider>
  );
}
