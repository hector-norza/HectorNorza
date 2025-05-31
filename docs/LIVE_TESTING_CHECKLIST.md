# 🧪 LIVE SITE TESTING CHECKLIST

## Manual Testing Guide for Compliance Verification
**Site URL:** https://hector-norza.github.io/HectorNorza/

### ✅ Accessibility Testing

#### 1. **Accessibility Toolbar**
- [ ] Toolbar appears as floating widget on page load
- [ ] Font size buttons (A-, A, A+) work properly
- [ ] Font size adjusts between 75%, 100%, 125%, 150%
- [ ] High contrast toggle switches color scheme
- [ ] Settings persist across page navigation

#### 2. **Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Skip link appears on Tab press ("Skip to main content")
- [ ] Focus indicators visible on all elements
- [ ] No focus traps or inaccessible elements
- [ ] Logical tab order throughout site

#### 3. **Screen Reader Support**
- [ ] All images have proper alt text
- [ ] Form fields have associated labels
- [ ] ARIA landmarks present (main, navigation, etc.)
- [ ] Live regions announce form validation errors
- [ ] Contact form errors read aloud properly

#### 4. **High Contrast Mode**
- [ ] Toggle switches to high contrast theme
- [ ] All text remains readable
- [ ] Interactive elements clearly distinguishable
- [ ] Focus indicators enhanced in high contrast

### ✅ Privacy Testing

#### 1. **Privacy Banner (First Visit)**
- [ ] Banner appears on first site visit
- [ ] "Accept All" and "Reject All" buttons functional
- [ ] Banner disappears after selection
- [ ] Choice persists on page refresh

#### 2. **Analytics Consent**
- [ ] Google Analytics fires only after "Accept All"
- [ ] No tracking events when "Reject All" selected
- [ ] Check browser dev tools > Network tab for verification
- [ ] Consent stored in localStorage for 1 year

#### 3. **Privacy Control Panel**
- [ ] Navigate to Privacy Policy page
- [ ] "Privacy Preferences" section visible
- [ ] Toggle switches work for each preference
- [ ] Real-time updates (no page refresh needed)
- [ ] Changes persist across sessions

#### 4. **Data Minimization**
- [ ] Only essential functionality works when opted out
- [ ] No unnecessary cookies set
- [ ] Check Application > Cookies in dev tools

### 🔧 Technical Verification

#### 1. **JavaScript Loading**
- [ ] No MIME type errors in console
- [ ] React app loads completely
- [ ] All components render properly
- [ ] No 404 errors for assets

#### 2. **Performance**
- [ ] Page loads within 3 seconds
- [ ] Images optimized and loading
- [ ] Smooth animations and transitions
- [ ] Mobile responsiveness maintained

#### 3. **Form Functionality**
- [ ] Contact form validation works
- [ ] Error messages appear in real-time
- [ ] Success states properly announced
- [ ] All form controls accessible

### 📊 Automated Testing Commands

```bash
# Lighthouse accessibility audit
npx lighthouse https://hector-norza.github.io/HectorNorza/ --only-categories=accessibility --output=json

# WAVE accessibility checker
# Visit: https://wave.webaim.org/
# Enter URL: https://hector-norza.github.io/HectorNorza/

# axe-core accessibility testing
# Install axe DevTools browser extension
# Run automated scan on live site

# Privacy compliance check
# Visit: https://www.cookiebot.com/en/website-checker/
# Enter URL: https://hector-norza.github.io/HectorNorza/
```

### 🎯 Expected Results

| Test Category | Expected Score | Pass Criteria |
|---------------|----------------|---------------|
| Lighthouse Accessibility | ≥97 | No major violations |
| WAVE Errors | 0 | No accessibility errors |
| Privacy Compliance | ≥96% | Full consent management |
| Performance | Good+ | Core Web Vitals green |

### 🚨 Common Issues to Check

1. **High Contrast Mode**: Ensure all elements remain visible
2. **Font Scaling**: Text doesn't overflow containers at 150%
3. **Privacy Banner**: Appears correctly on incognito/private browsing
4. **Analytics**: Verify tracking only fires with consent
5. **Mobile**: All features work on touch devices

---

**✅ Complete all checklist items to verify 97% accessibility and 96% privacy compliance targets are met in production!**
