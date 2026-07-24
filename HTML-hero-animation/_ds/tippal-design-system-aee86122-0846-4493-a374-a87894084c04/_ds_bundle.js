/* @ds-bundle: {"format":4,"namespace":"TippalDesignSystem_aee861","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"CustomInput","sourcePath":"components/forms/CustomInput.jsx"},{"name":"BalanceCard","sourcePath":"components/money/BalanceCard.jsx"},{"name":"KycBadge","sourcePath":"components/money/KycBadge.jsx"},{"name":"TransactionItem","sourcePath":"components/money/TransactionItem.jsx"},{"name":"Card","sourcePath":"components/structure/Card.jsx"},{"name":"Divider","sourcePath":"components/structure/Divider.jsx"},{"name":"GlassCard","sourcePath":"components/structure/GlassCard.jsx"},{"name":"Header","sourcePath":"components/structure/Header.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"f50d37325ee1","components/forms/CustomInput.jsx":"512a58243dde","components/money/BalanceCard.jsx":"be50ee009ce0","components/money/KycBadge.jsx":"9e9ba5a2e750","components/money/TransactionItem.jsx":"9e28011be554","components/structure/Card.jsx":"ca2aa2a8723f","components/structure/Divider.jsx":"4e4a3795488a","components/structure/GlassCard.jsx":"a3506e5f7094","components/structure/Header.jsx":"482496a01e89","ui_kits/app/Screens.jsx":"efedb76ccb7e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TippalDesignSystem_aee861 = window.TippalDesignSystem_aee861 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
(function () {
  if (typeof document === 'undefined' || document.getElementById('tippal-ui-kf')) return;
  const s = document.createElement('style');
  s.id = 'tippal-ui-kf';
  s.textContent = '@keyframes tippal-spin{to{transform:rotate(360deg)}}@keyframes tippal-pop-ui{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes tippal-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes tippal-breathe-o{0%,100%{opacity:.55}50%{opacity:1}}';
  document.head.appendChild(s);
})();
function useHoverPress() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function Button({
  title,
  onClick,
  variant = 'primary',
  state = 'idle',
  disabled,
  shape = 'square',
  style,
  children
}) {
  const [h, p, hp] = useHoverPress();
  const V = {
    primary: {
      background: 'linear-gradient(180deg,var(--tippal-primary),var(--tippal-primary-dark))',
      color: '#fff',
      boxShadow: 'var(--tippal-shadow-glow-primary,0 10px 24px -10px #007FFF)'
    },
    secondary: {
      background: 'linear-gradient(180deg,var(--tippal-secondary),#7a1fd0)',
      color: '#fff',
      boxShadow: '0 10px 24px -10px var(--tippal-secondary)'
    },
    tertiary: {
      background: 'var(--tippal-tertiary)',
      color: 'var(--tippal-accent)',
      boxShadow: '0 8px 20px -10px rgba(164,115,0,.6)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--tippal-primary)',
      border: '2px solid var(--tippal-primary)'
    },
    ghost: {
      background: h ? 'var(--tippal-primary-light)' : 'transparent',
      color: 'var(--tippal-primary)'
    }
  }[variant] || {};
  const stateBg = state === 'success' ? {
    background: 'linear-gradient(180deg,#43c93e,var(--tippal-success-dark))',
    color: '#fff',
    boxShadow: '0 10px 24px -10px var(--tippal-success-dark)'
  } : state === 'error' ? {
    background: 'linear-gradient(180deg,#e05252,var(--tippal-error))',
    color: '#fff',
    animation: 'tippal-shake 260ms var(--tippal-ease-calm,ease)'
  } : {};
  const busy = state === 'loading';
  return React.createElement('button', {
    ...hp,
    onClick: disabled || busy ? undefined : onClick,
    disabled,
    style: {
      fontFamily: 'var(--tippal-font-family)',
      fontWeight: 700,
      fontSize: 16,
      height: 52,
      padding: '0 26px',
      border: 'none',
      cursor: disabled || busy ? 'default' : 'pointer',
      borderRadius: shape === 'pill' ? 9999 : 15,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      transition: 'transform var(--tippal-dur-fast,150ms) var(--tippal-ease-joy,ease), box-shadow var(--tippal-dur-fast,150ms), background var(--tippal-dur-base,250ms)',
      transform: disabled ? 'none' : p ? 'scale(.96)' : h ? 'scale(1.03)' : 'none',
      opacity: disabled ? .45 : 1,
      filter: disabled ? 'saturate(.4)' : 'none',
      ...V,
      ...stateBg,
      ...style
    }
  }, busy && React.createElement('span', {
    style: {
      width: 17,
      height: 17,
      border: '2.5px solid rgba(255,255,255,.35)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'tippal-spin 700ms linear infinite'
    }
  }), state === 'success' && React.createElement('span', {
    style: {
      display: 'inline-flex',
      animation: 'tippal-pop-ui 300ms var(--tippal-ease-joy,ease)'
    }
  }, React.createElement('svg', {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M20 6 9 17l-5-5'
  }))), busy ? 'One moment…' : title, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/CustomInput.jsx
try { (() => {
(function () {
  if (typeof document === 'undefined' || document.getElementById('tippal-ui-kf')) return;
  const s = document.createElement('style');
  s.id = 'tippal-ui-kf';
  s.textContent = '@keyframes tippal-spin{to{transform:rotate(360deg)}}@keyframes tippal-pop-ui{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes tippal-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes tippal-breathe-o{0%,100%{opacity:.55}50%{opacity:1}}';
  document.head.appendChild(s);
})();
function CustomInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  helperText,
  variant = 'default',
  color = 'primary',
  type = 'text',
  disabled,
  style,
  rightIcon,
  onRightIconPress
}) {
  const [focus, setFocus] = React.useState(false);
  const [inner, setInner] = React.useState('');
  const val = value !== undefined ? value : inner;
  const accent = {
    primary: 'var(--tippal-primary)',
    secondary: 'var(--tippal-secondary)',
    tertiary: 'var(--tippal-tertiary-dark)',
    accent: 'var(--tippal-accent)'
  }[color];
  const border = error ? 'var(--tippal-error)' : success ? 'var(--tippal-success-dark)' : focus ? accent : variant === 'outline' ? 'var(--tippal-border)' : '#ece5f5';
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--tippal-font-family)',
      ...style
    }
  }, label && React.createElement('label', {
    style: {
      display: 'block',
      fontSize: 12.5,
      fontWeight: 700,
      color: error ? 'var(--tippal-error)' : focus ? accent : 'var(--tippal-text-secondary)',
      marginBottom: 7,
      transition: 'color 150ms'
    }
  }, label), React.createElement('div', {
    style: {
      position: 'relative',
      animation: error ? 'tippal-shake 260ms ease' : 'none'
    }
  }, React.createElement('input', {
    type,
    placeholder,
    disabled,
    value: val,
    onChange: e => {
      if (value === undefined) setInner(e.target.value);
      onChange && onChange(e.target.value);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      height: 52,
      borderRadius: 14,
      padding: `0 ${rightIcon || success ? 46 : 16}px 0 16px`,
      fontSize: 15.5,
      fontWeight: 500,
      fontFamily: 'var(--tippal-font-family)',
      color: 'var(--tippal-text)',
      outline: 'none',
      background: disabled ? 'var(--tippal-border-light)' : variant === 'outline' ? 'transparent' : 'var(--tippal-surface)',
      border: `2px solid ${border}`,
      transition: 'border-color 150ms, box-shadow 150ms',
      boxShadow: focus && !error ? '0 0 0 4px rgba(0,127,255,.14)' : error && focus ? '0 0 0 4px var(--tippal-error-light)' : 'none'
    }
  }), success && !rightIcon && React.createElement('span', {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      animation: 'tippal-pop-ui 300ms var(--tippal-ease-joy,ease)'
    }
  }, React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--tippal-success-dark)',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M20 6 9 17l-5-5'
  }))), rightIcon && React.createElement('button', {
    onClick: onRightIconPress,
    style: {
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 34,
      height: 34,
      border: 'none',
      borderRadius: 10,
      background: 'transparent',
      cursor: onRightIconPress ? 'pointer' : 'default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--tippal-text-tertiary)'
    }
  }, rightIcon)), (error || helperText) && React.createElement('div', {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      marginTop: 6,
      color: error ? 'var(--tippal-error)' : 'var(--tippal-text-tertiary)',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, error && React.createElement('svg', {
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'var(--tippal-error)'
  }, React.createElement('path', {
    d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v7h-2V7zm0 9h2v2h-2v-2z'
  })), error || helperText));
}
Object.assign(__ds_scope, { CustomInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CustomInput.jsx", error: String((e && e.message) || e) }); }

// components/money/BalanceCard.jsx
try { (() => {
(function () {
  if (typeof document === 'undefined' || document.getElementById('tippal-ui-kf')) return;
  const s = document.createElement('style');
  s.id = 'tippal-ui-kf';
  s.textContent = '@keyframes tippal-spin{to{transform:rotate(360deg)}}@keyframes tippal-pop-ui{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes tippal-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes tippal-breathe-o{0%,100%{opacity:.55}50%{opacity:1}}';
  document.head.appendChild(s);
})();
function useHoverPress() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function BalanceCard({
  balance = 0,
  currency = 'USD',
  isLoading,
  onLoadMoney,
  loadMoneyLabel = 'Load money',
  availableBalanceLabel = 'Available balance'
}) {
  const [h, p, hp] = useHoverPress();
  const whole = Math.floor(balance);
  const cents = Math.round((balance - whole) * 100).toString().padStart(2, '0');
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--tippal-font-family)',
      borderRadius: 24,
      padding: '24px 24px 22px',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg,var(--tippal-secondary),var(--tippal-accent) 80%)',
      boxShadow: '0 14px 34px -12px rgba(58,16,120,.55)'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      top: -46,
      right: -30,
      width: 150,
      height: 150,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.08)'
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: -60,
      left: -20,
      width: 130,
      height: 130,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.05)'
    }
  }), React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: .3,
      color: 'var(--tippal-secondary-light)',
      position: 'relative'
    }
  }, availableBalanceLabel), isLoading ? React.createElement('div', {
    style: {
      height: 54,
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }
  }, React.createElement('span', {
    style: {
      width: 150,
      height: 34,
      borderRadius: 10,
      background: 'rgba(255,255,255,.22)',
      animation: 'tippal-breathe-o 1.2s ease-in-out infinite'
    }
  })) : React.createElement('div', {
    style: {
      fontFamily: 'var(--tippal-font-display)',
      fontWeight: 700,
      fontSize: 44,
      lineHeight: '54px',
      position: 'relative',
      fontVariantNumeric: 'tabular-nums'
    }
  }, `$${whole.toLocaleString()}`, React.createElement('span', {
    style: {
      fontSize: 26,
      opacity: .85
    }
  }, `.${cents}`), React.createElement('span', {
    style: {
      fontFamily: 'var(--tippal-font-family)',
      fontSize: 13,
      fontWeight: 700,
      opacity: .7,
      marginLeft: 8
    }
  }, currency)), React.createElement('button', {
    ...hp,
    onClick: onLoadMoney,
    style: {
      marginTop: 16,
      position: 'relative',
      height: 44,
      padding: '0 22px',
      border: 'none',
      borderRadius: 9999,
      cursor: 'pointer',
      fontFamily: 'var(--tippal-font-family)',
      fontWeight: 800,
      fontSize: 14.5,
      color: 'var(--tippal-accent)',
      background: 'var(--tippal-tertiary)',
      boxShadow: '0 8px 20px -8px rgba(0,0,0,.4)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'transform 150ms var(--tippal-ease-joy,ease)',
      transform: p ? 'scale(.95)' : h ? 'scale(1.04)' : 'none'
    }
  }, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.6,
    strokeLinecap: 'round'
  }, React.createElement('path', {
    d: 'M12 5v14M5 12h14'
  })), loadMoneyLabel));
}
Object.assign(__ds_scope, { BalanceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/BalanceCard.jsx", error: String((e && e.message) || e) }); }

// components/money/KycBadge.jsx
try { (() => {
(function () {
  if (typeof document === 'undefined' || document.getElementById('tippal-ui-kf')) return;
  const s = document.createElement('style');
  s.id = 'tippal-ui-kf';
  s.textContent = '@keyframes tippal-spin{to{transform:rotate(360deg)}}@keyframes tippal-pop-ui{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes tippal-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes tippal-breathe-o{0%,100%{opacity:.55}50%{opacity:1}}';
  document.head.appendChild(s);
})();
function KycBadge({
  verificationStatus,
  currentlyDue
}) {
  const M = {
    NOT_STARTED: {
      bg: 'var(--tippal-border-light)',
      fg: 'var(--tippal-text-secondary)',
      label: 'Verify your identity',
      icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v7h-2V7zm0 9h2v2h-2v-2z'
    },
    PENDING: {
      bg: 'var(--tippal-warning-light)',
      fg: '#8a6100',
      label: 'Verification pending',
      icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 1-1.7-4-2.3V7z'
    },
    VERIFIED: {
      bg: 'var(--tippal-success-light)',
      fg: 'var(--tippal-success-dark)',
      label: 'Verified',
      icon: 'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6z'
    },
    FAILED: {
      bg: 'var(--tippal-error-light)',
      fg: 'var(--tippal-error)',
      label: 'Verification failed',
      icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 12.1-1.4 1.4L12 13.4l-2.1 2.1-1.4-1.4 2.1-2.1-2.1-2.1 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1z'
    }
  }[verificationStatus] || {};
  const due = verificationStatus === 'FAILED' && currentlyDue && currentlyDue.length;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: M.bg,
      color: M.fg,
      borderRadius: 9999,
      padding: '7px 14px',
      fontFamily: 'var(--tippal-font-family)',
      fontWeight: 700,
      fontSize: 13
    }
  }, React.createElement('svg', {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    style: verificationStatus === 'VERIFIED' ? {
      animation: 'tippal-pop-ui 350ms var(--tippal-ease-joy,ease)'
    } : null
  }, React.createElement('path', {
    d: M.icon
  })), M.label, due ? React.createElement('span', {
    style: {
      fontWeight: 600,
      opacity: .8
    }
  }, `· ${due} item${due > 1 ? 's' : ''} due`) : null);
}
Object.assign(__ds_scope, { KycBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/KycBadge.jsx", error: String((e && e.message) || e) }); }

// components/money/TransactionItem.jsx
try { (() => {
function useHoverPress() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function TransactionItem({
  type,
  amount,
  recipientName,
  senderName,
  note,
  date,
  isLast
}) {
  const [h,, hp] = useHoverPress();
  const M = {
    tip_sent: {
      bg: 'var(--tippal-heart-soft,#FFE9E2)',
      fg: 'var(--tippal-heart,#FF7A59)',
      sign: '-',
      who: `Tip to ${recipientName || ''}`,
      heart: true
    },
    tip_received: {
      bg: 'var(--tippal-primary-light)',
      fg: 'var(--tippal-primary)',
      sign: '+',
      who: `Tip from ${senderName || ''}`,
      heart: true
    },
    load_money: {
      bg: 'var(--tippal-success-light)',
      fg: 'var(--tippal-success-dark)',
      sign: '+',
      who: 'Money loaded',
      arrow: 'M12 4v12m0 0 5-5m-5 5-5-5'
    },
    withdrawal: {
      bg: 'var(--tippal-background)',
      fg: 'var(--tippal-secondary)',
      sign: '-',
      who: 'Withdrawal',
      arrow: 'M12 20V8m0 0 5 5m-5-5-5 5'
    }
  }[type] || {};
  return React.createElement('div', {
    ...hp,
    style: {
      fontFamily: 'var(--tippal-font-family)',
      borderRadius: 14,
      background: h ? 'rgba(138,43,226,.045)' : 'transparent',
      transition: 'background 150ms',
      cursor: 'pointer'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '12px 10px'
    }
  }, React.createElement('span', {
    style: {
      width: 42,
      height: 42,
      borderRadius: 13,
      background: M.bg,
      color: M.fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, M.heart ? React.createElement('svg', {
    width: 19,
    height: 19,
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, React.createElement('path', {
    d: 'M12 21s-7.5-4.6-10-9.1C.4 8.6 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.3l2 2.7 2-2.7C15 6.1 16.3 5 18.3 5c3.4 0 5.3 3.6 3.7 6.9C19.5 16.4 12 21 12 21z'
  })) : React.createElement('svg', {
    width: 19,
    height: 19,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: M.arrow
  }))), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: 14.5,
      color: 'var(--tippal-text)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, M.who), React.createElement('div', {
    style: {
      fontSize: 12.5,
      color: 'var(--tippal-text-tertiary)',
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, note ? `"${note}" · ${date}` : date)), React.createElement('div', {
    style: {
      fontWeight: 800,
      fontSize: 15.5,
      color: M.sign === '+' ? 'var(--tippal-success-dark)' : 'var(--tippal-text)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, `${M.sign}$${Number(amount).toFixed(2)}`)), !isLast && React.createElement('div', {
    style: {
      height: 1,
      background: 'var(--tippal-border-light)',
      margin: '0 10px'
    }
  }));
}
Object.assign(__ds_scope, { TransactionItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/TransactionItem.jsx", error: String((e && e.message) || e) }); }

// components/structure/Card.jsx
try { (() => {
function Card({
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--tippal-surface)',
      borderRadius: 20,
      padding: 20,
      boxShadow: 'var(--tippal-shadow-card,0 6px 20px -6px rgba(48,0,106,.12))',
      fontFamily: 'var(--tippal-font-family)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/Card.jsx", error: String((e && e.message) || e) }); }

// components/structure/Divider.jsx
try { (() => {
function Divider({
  text,
  spacing = 16,
  color = 'var(--tippal-border)',
  size = 1
}) {
  const line = () => React.createElement('span', {
    style: {
      flex: 1,
      height: size,
      background: color,
      borderRadius: size
    }
  });
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: text ? 12 : 0,
      margin: `${spacing}px 0`,
      fontFamily: 'var(--tippal-font-family)'
    }
  }, line(), text && React.createElement('span', {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--tippal-text-tertiary)'
    }
  }, text), text && line());
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/Divider.jsx", error: String((e && e.message) || e) }); }

// components/structure/GlassCard.jsx
try { (() => {
function GlassCard({
  children,
  variant = 'medium',
  style
}) {
  const V = {
    subtle: ['var(--tippal-glass-xs,rgba(255,255,255,.12))', 8],
    medium: ['var(--tippal-glass-sm,rgba(255,255,255,.18))', 14],
    readable: ['var(--tippal-glass-highlight,rgba(255,255,255,.6))', 20]
  }[variant];
  return React.createElement('div', {
    style: {
      background: V[0],
      backdropFilter: `blur(${V[1]}px)`,
      WebkitBackdropFilter: `blur(${V[1]}px)`,
      border: '1px solid var(--tippal-glass-border)',
      borderRadius: 20,
      padding: 20,
      fontFamily: 'var(--tippal-font-family)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/structure/Header.jsx
try { (() => {
function useHoverPress() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function Header({
  title,
  showBack,
  onBack,
  rightAction
}) {
  const [h, p, hp] = useHoverPress();
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 52,
      fontFamily: 'var(--tippal-font-family)'
    }
  }, showBack ? React.createElement('button', {
    ...hp,
    onClick: onBack,
    'aria-label': 'Back',
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.65)',
      boxShadow: 'var(--tippal-shadow-rest,0 2px 8px rgba(48,0,106,.06))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 150ms var(--tippal-ease-joy,ease)',
      transform: p ? 'scale(.92)' : h ? 'scale(1.06)' : 'none'
    }
  }, React.createElement('svg', {
    width: 19,
    height: 19,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--tippal-accent)',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M15 18l-6-6 6-6'
  }))) : React.createElement('span', {
    style: {
      width: 40
    }
  }), React.createElement('div', {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'var(--tippal-font-display)',
      fontWeight: 600,
      fontSize: 20,
      color: 'var(--tippal-accent)'
    }
  }, title), rightAction ? React.createElement('button', {
    onClick: rightAction.onPress,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--tippal-font-family)',
      fontWeight: 700,
      fontSize: 14.5,
      color: 'var(--tippal-primary)',
      padding: '8px 4px',
      minWidth: 40,
      textAlign: 'right'
    }
  }, rightAction.label) : React.createElement('span', {
    style: {
      width: 40
    }
  }));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const __NS = () => window.TippalDesignSystem_aee861 || {};
const Button = p => React.createElement(__NS().Button, p),
  Card = p => React.createElement(__NS().Card, p),
  Header = p => React.createElement(__NS().Header, p),
  CustomInput = p => React.createElement(__NS().CustomInput, p),
  KycBadge = p => React.createElement(__NS().KycBadge, p),
  TransactionItem = p => React.createElement(__NS().TransactionItem, p),
  BalanceCard = p => React.createElement(__NS().BalanceCard, p);
function HomeScreen({
  balance,
  txns,
  kyc,
  onSendTip,
  onLoadMoney
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 28px',
      display: 'grid',
      gap: 16,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--tippal-text-secondary)'
    }
  }, "Good afternoon"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--tippal-font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--tippal-accent)'
    }
  }, "Maria")), /*#__PURE__*/React.createElement(KycBadge, {
    verificationStatus: kyc
  })), /*#__PURE__*/React.createElement(BalanceCard, {
    balance: balance,
    onLoadMoney: onLoadMoney
  }), /*#__PURE__*/React.createElement(Button, {
    title: "Send a tip",
    variant: "primary",
    onClick: onSendTip
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--tippal-font-display)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--tippal-accent)',
      margin: '4px 2px 10px'
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: '8px 6px'
    }
  }, txns.map((t, i) => /*#__PURE__*/React.createElement(TransactionItem, _extends({
    key: i
  }, t, {
    isLast: i === txns.length - 1
  }))))));
}
function SendTipScreen({
  onBack,
  onSent
}) {
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [state, setState] = React.useState('idle');
  const [err, setErr] = React.useState(null);
  const send = () => {
    if (!to) {
      setErr('Who gets the love? Add a recipient');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setErr(null);
      setState('error');
      setTimeout(() => setState('idle'), 900);
      return;
    }
    setErr(null);
    setState('loading');
    setTimeout(() => {
      setState('success');
      setTimeout(() => onSent({
        to,
        amount: Number(amount),
        note
      }), 1100);
    }, 900);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px 28px',
      display: 'grid',
      gap: 16,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    title: "Send Gratitude",
    showBack: true,
    onBack: onBack
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(CustomInput, {
    label: "To",
    placeholder: "@username",
    value: to,
    onChange: v => {
      setTo(v);
      setErr(null);
    },
    error: err
  }), /*#__PURE__*/React.createElement(CustomInput, {
    label: "Amount",
    placeholder: "0.00",
    value: amount,
    onChange: setAmount,
    color: "secondary",
    helperText: "They receive every cent."
  }), /*#__PURE__*/React.createElement(CustomInput, {
    label: "Add a note",
    placeholder: "Best latte art in town",
    value: note,
    onChange: setNote,
    color: "accent"
  })), /*#__PURE__*/React.createElement(Button, {
    title: state === 'success' ? 'Tip sent!' : state === 'error' ? 'Try again' : 'Send a tip',
    state: state,
    variant: "primary",
    onClick: send
  }));
}
function HeartBurst() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "var(--tippal-heart)",
    style: {
      position: 'absolute',
      bottom: 120,
      left: `${28 + i * 12}%`,
      animation: `tippal-heart-float var(--tippal-dur-celebrate) var(--tippal-ease-settle) ${i * 120}ms both`
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7.5-4.6-10-9.1C.4 8.6 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.3l2 2.7 2-2.7C15 6.1 16.3 5 18.3 5c3.4 0 5.3 3.6 3.7 6.9C19.5 16.4 12 21 12 21z"
  }))));
}
Object.assign(window, {
  HomeScreen,
  SendTipScreen,
  HeartBurst
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CustomInput = __ds_scope.CustomInput;

__ds_ns.BalanceCard = __ds_scope.BalanceCard;

__ds_ns.KycBadge = __ds_scope.KycBadge;

__ds_ns.TransactionItem = __ds_scope.TransactionItem;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.Header = __ds_scope.Header;

})();
