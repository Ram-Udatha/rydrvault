# Developer Code Review Checklist

Use this checklist before submitting any changes or pull requests.

## Code Quality

### Formatting & Style
- [ ] Code follows project naming conventions
- [ ] Consistent spacing and indentation (2 spaces)
- [ ] No trailing whitespace
- [ ] No console.log() left in production code
- [ ] Comments are clear and meaningful
- [ ] JSDoc comments for complex functions

### JavaScript/React
- [ ] No `var` - use `const` or `let`
- [ ] No unused imports
- [ ] No unused variables
- [ ] Arrow functions used appropriately
- [ ] String interpolation used instead of concatenation
- [ ] Template literals for multi-line strings

### React Specific
- [ ] Functional components with hooks
- [ ] Proper dependency arrays in useEffect
- [ ] No inline functions in renderProps
- [ ] PropTypes or TypeScript types defined
- [ ] Proper key prop on lists
- [ ] No state updates outside of setState

### Performance
- [ ] React.memo used for expensive components
- [ ] FlatList with proper keyExtractor
- [ ] Images optimized
- [ ] No unnecessary re-renders
- [ ] Lazy loading implemented where needed

## Styling & Design

### Colors & Theme
- [ ] Uses colors from `src/theme/colors.js`
- [ ] No hardcoded color values
- [ ] Consistent with black & orange theme
- [ ] Dark mode appropriate
- [ ] Text contrast > 4.5:1 ratio

### Spacing & Layout
- [ ] Uses spacing system (xs, sm, md, lg, xl)
- [ ] No arbitrary padding/margin values
- [ ] Responsive on all screen sizes
- [ ] SafeAreaView used on screens
- [ ] Touch targets ≥ 44x44 points

### Fonts & Text
- [ ] Uses font sizes from theme
- [ ] No hardcoded font sizes
- [ ] Font weights appropriate
- [ ] Text is readable (min 14px)
- [ ] Line height appropriate

## Functionality

### Features
- [ ] Feature works as designed
- [ ] All edge cases handled
- [ ] Error states managed
- [ ] Loading states shown
- [ ] Success feedback provided

### Navigation
- [ ] Navigation params passed correctly
- [ ] Back button works
- [ ] Deep linking tested (if applicable)
- [ ] Navigation doesn't leak memory

### Forms & Inputs
- [ ] All inputs validated
- [ ] Error messages clear
- [ ] Success indicators shown
- [ ] Disabled state works
- [ ] Keyboard type appropriate

### State Management
- [ ] State updates correctly
- [ ] No race conditions
- [ ] Async operations handled
- [ ] Store properly typed
- [ ] No circular dependencies

## Testing

### Manual Testing
- [ ] Tested on Android emulator/device
- [ ] Tested on iOS simulator/device
- [ ] Works on multiple screen sizes
- [ ] Works with slow network
- [ ] Works offline (where applicable)

### Edge Cases
- [ ] Empty states tested
- [ ] Error states tested
- [ ] Timeout scenarios tested
- [ ] Large data sets tested
- [ ] Permission errors tested

### User Flows
- [ ] Happy path works
- [ ] Unhappy path handled
- [ ] User receives good feedback
- [ ] Navigation flows correctly
- [ ] No unexpected behaviors

## Accessibility

### A11y Standards
- [ ] Touch targets ≥ 44x44 pt
- [ ] Color contrast adequate
- [ ] Text size readable
- [ ] No motion sickness triggers
- [ ] Icons have labels/descriptions

### Screen Readers
- [ ] Text labels present
- [ ] Images have descriptions
- [ ] Form fields have labels
- [ ] Buttons are accessible
- [ ] Links are clear

## Documentation

### Code Comments
- [ ] Complex logic explained
- [ ] Functions have JSDoc
- [ ] Non-obvious code commented
- [ ] TODO comments tracked
- [ ] No obsolete comments

### Commit Messages
- [ ] Clear, descriptive message
- [ ] Follows format: `type(scope): message`
- [ ] References issues/tickets
- [ ] No profanity or slang
- [ ] Explains WHY not just WHAT

### PR Description
- [ ] Clear description of changes
- [ ] Screenshots/videos if UI changes
- [ ] Explains motivation
- [ ] Lists breaking changes
- [ ] Testing instructions provided

## Version Control

### Git Hygiene
- [ ] Commits are logical and atomic
- [ ] No merge conflicts
- [ ] Rebased on main branch
- [ ] No merge commits in feature
- [ ] All tests passing

### Branches
- [ ] Branch name follows convention
- [ ] Based on latest main
- [ ] Up to date with main
- [ ] No stale branches
- [ ] Branch protected rules satisfied

## Security

### Data Protection
- [ ] No hardcoded secrets/keys
- [ ] No sensitive data in logs
- [ ] API keys in environment variables
- [ ] Tokens handled securely
- [ ] User data protected

### Authentication
- [ ] Authentication properly validated
- [ ] Sessions managed safely
- [ ] Logout clears data
- [ ] Permissions checked
- [ ] SQL injection protected (if applicable)

### Network
- [ ] HTTPS used for API calls
- [ ] Data validation on client
- [ ] Error messages don't leak info
- [ ] Rate limiting considered
- [ ] CORS properly configured

## Performance

### Bundle Size
- [ ] Necessary dependencies only
- [ ] Code splitting implemented
- [ ] Dead code removed
- [ ] Assets optimized
- [ ] Bundle size checked

### Runtime Performance
- [ ] App starts quickly
- [ ] Screens load smoothly
- [ ] No jank or stuttering
- [ ] Memory usage stable
- [ ] No memory leaks

### Network
- [ ] API calls minimized
- [ ] Caching implemented
- [ ] Pagination used
- [ ] Image optimization
- [ ] Request batching considered

## iOS Specific

- [ ] Works on iPhone
- [ ] Safe area respected
- [ ] Notch handled
- [ ] Status bar styled
- [ ] Keyboard avoidance works

## Android Specific

- [ ] Works on Android
- [ ] Back button handled
- [ ] System navigation respected
- [ ] Landscape orientation supported
- [ ] Gesture navigation compatible

## Final Checks

### Before Submission
- [ ] No console errors/warnings
- [ ] Lint passes: `npm run lint`
- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Works on CI/CD
- [ ] All checklist items reviewed
- [ ] Team review completed
- [ ] Ready for merge

### Before Release
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes written
- [ ] All regression tested
- [ ] Marketing notified
- [ ] Docs updated
- [ ] Ready for deployment

## Common Issues to Avoid

❌ **Don't:**
- Hardcode colors outside theme
- Use `var` or `any` type
- Skip error handling
- Leave console logs
- Commit secrets
- Skip PropTypes
- Use magic numbers
- Ignore accessibility
- Commit node_modules
- Make massive commits

✅ **Do:**
- Use theme system consistently
- Type your props/state
- Handle all edge cases
- Remove debugging code
- Use environment variables
- Define PropTypes
- Use named constants
- Follow WCAG guidelines
- Use .gitignore properly
- Keep commits focused

## Performance Checklist

### For each screen:
- [ ] Renders in < 500ms
- [ ] Scrolling smooth (60 fps)
- [ ] Memory stable
- [ ] No unnecessary re-renders
- [ ] Images load progressively

### For each API call:
- [ ] Has timeout
- [ ] Error handled
- [ ] Loading shown
- [ ] Cached if appropriate
- [ ] Rate limited if needed

## Accessibility Checklist

### For each screen:
- [ ] Minimum font size 14px
- [ ] Text contrast > 4.5:1
- [ ] Touch targets > 44x44 pt
- [ ] No color-only information
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] No auto-playing content

---

## Sign Off

By checking all items below, you confirm this code is ready for review:

- [ ] I have reviewed all code above
- [ ] All checks are complete
- [ ] Tests are passing
- [ ] No breaking changes (or documented)
- [ ] Ready for peer review

**Reviewed by**: ______________________
**Date**: ______________________
**Commit Hash**: ______________________

---

**Questions?** Refer to:
- Code style: See project README
- Architecture: See DEVELOPMENT.md
- Design: See DESIGN_SYSTEM.md
- Troubleshooting: See TROUBLESHOOTING.md
