# RYDRVAULT Design System & UI Guide

## Color Palette

### Primary Colors
- **Orange (Primary)**: `#FF8C00`
  - Used for: CTAs, highlights, icons, borders
  - Hex: #FF8C00 | RGB: 255, 140, 0

- **Black (Secondary)**: `#000000`
  - Used for: Main background, dark surfaces
  - Hex: #000000 | RGB: 0, 0, 0

### Secondary Colors
- **Dark Gray**: `#333333`
  - Used for: Card backgrounds, input backgrounds
  - Hex: #333333 | RGB: 51, 51, 51

- **Light Gray**: `#F5F5F5`
  - Used for: Text, borders, secondary elements
  - Hex: #F5F5F5 | RGB: 245, 245, 245

### Semantic Colors
- **Success**: `#4CAF50` - Validation, success messages
- **Error**: `#F44336` - Errors, invalid states
- **Warning**: `#FF9800` - Warnings, cautions
- **Info**: `#2196F3` - Information, hints

## Typography

### Font Sizes
```javascript
FONTS = {
  regular: 16,      // Body text
  large: 18,        // Section titles
  extraLarge: 24,   // Main titles
}
```

### Font Weights
- **Regular**: Normal body text
- **600**: Emphasized text, labels
- **Bold (700)**: Titles, important text

### Font Family
- **Recommended**: System fonts
  - Android: -apple-system, BlinkMacSystemFont, "Segoe UI"
  - iOS: "SF Pro Display"

## Spacing System

```javascript
SPACING = {
  xs: 4,      // Minimum spacing
  sm: 8,      // Small gaps
  md: 16,     // Default spacing
  lg: 24,     // Large sections
  xl: 32,     // Extra large sections
}
```

## Component Styles

### Buttons

#### Primary Button (CTA)
```javascript
{
  backgroundColor: COLORS.primary,      // #FF8C00
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
}
```

**Text**: Bold, color white, size 18

#### Secondary Button
```javascript
{
  backgroundColor: COLORS.darkGray,
  borderWidth: 2,
  borderColor: COLORS.primary,
  paddingVertical: 12,
  borderRadius: 8,
}
```

### Input Fields

#### Standard Input
```javascript
{
  borderWidth: 2,
  borderColor: COLORS.primary,
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 16,
  backgroundColor: COLORS.secondary,
  color: COLORS.white,
  fontSize: 16,
}
```

#### Input with Error
- Border color: `#F44336` (Error red)
- Add error message below in red

#### Input with Success
- Border color: `#4CAF50` (Success green)
- Add checkmark icon

### Cards

#### Standard Card
```javascript
{
  backgroundColor: COLORS.darkGray,
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: COLORS.primary,
}
```

#### Elevated Card
- Add: `shadowColor: COLORS.primary, shadowOpacity: 0.3, elevation: 5`

### Dialogs / Modal

- Background: Semi-transparent black (0.5 opacity)
- Card: Centered, 90% width (max 500px)
- Border-radius: 16
- Padding: 24
- Close button: Top-right corner

## Icons & Illustrations

### Icon System
- **Size**: 24px (standard)
- **Color**: `#FF8C00` (primary), `#F5F5F5` (secondary)
- **Family**: FontAwesome, Material Icons, or custom SVGs

### Common Icons
- Login: `user` or `log-in`
- OTP: `shield` or `lock`
- Home: `home`
- Search: `search`
- Profile: `user-circle`
- Logout: `sign-out`

## Responsive Design

### Screen Sizes
```javascript
breakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 1200,
}
```

### Padding/Margins by Screen
- **Small devices** (<320px): xs, sm spacing
- **Standard** (320-600px): md spacing (current)
- **Tablets** (600+px): lg, xl spacing

## Dark Mode (Current Default)

The app uses dark mode throughout:
- **Background**: Black (#000000)
- **Surfaces**: Dark Gray (#333333)
- **Text**: White (#FFFFFF), Light Gray (#F5F5F5)
- **Accents**: Orange (#FF8C00)

## Animation Guidelines

### Transition Times
- **Quick interactions**: 150ms
- **Standard**: 300ms
- **Slow transitions**: 500ms

### Animation Types
- **Page transitions**: Slide from right or fade
- **Button feedback**: Scale (1 → 0.95 → 1)
- **Loading**: Spinner, pulse, or skeleton
- **List items**: Fade in with slight delay

## Accessibility

### Color Contrast
- Orange on Black: ✓ Good (7.44:1 ratio)
- All text on backgrounds: ≥ 4.5:1 ratio

### Touch Targets
- Minimum: 44x44 points (iOS) or 48x48 dp (Android)
- Standard button height: 50px
- Padding around interactive elements: 8px

### Font Sizes
- Minimum readable: 14px
- Standard: 16px
- Titles: 24px

## Component Library Structure

```
components/
├── buttons/
│   ├── PrimaryButton.js
│   ├── SecondaryButton.js
│   └── Button.styles.js
├── inputs/
│   ├── TextInput.js
│   ├── PhoneInput.js
│   └── Input.styles.js
├── cards/
│   ├── Card.js
│   └── Card.styles.js
└── common/
    ├── Loader.js
    ├── ErrorMessage.js
    └── SuccessMessage.js
```

## Form Validation Visual Feedback

### States
1. **Default**: Border #FF8C00, no message
2. **Focused**: Border #FF8C00 (bright), cursor active
3. **Valid**: Border #4CAF50, ✓ checkmark
4. **Invalid**: Border #F44336, error message in red
5. **Disabled**: Opacity 0.5, no interaction

## Loading States

### Spinner
- **Color**: #FF8C00
- **Size**: 40px (default), 24px (compact), 60px (large)
- **Speed**: 1 rotation per second

### Skeleton Loading
- **Color**: Gradient from #333333 to #555555
- **Animation**: Shimmer effect, 2 seconds repeat

## Motion Principles

1. **Direction**: Top-to-bottom, left-to-right
2. **Easing**: ease-out for entering, ease-in for leaving
3. **Duration**: Longer for larger movements
4. **Purpose**: Guide user attention, provide feedback

## Example Component

```javascript
// LoginButton.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from '../theme/colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: FONTS.large,
    fontWeight: 'bold',
  },
});
```

## Best Practices

### DO ✓
- Use consistent spacing from spacing system
- Maintain minimum touch targets (44x44 or 48x48)
- Use semantic colors for feedback
- Keep animations under 500ms
- Test on multiple screen sizes

### DON'T ✗
- Create custom colors outside the palette
- Use text < 14px
- Mix different design systems
- Add unnecessary animations
- Use too many colors in one screen

---

This design system ensures consistency, accessibility, and great UX across the RYDRVAULT app. 
For questions or updates, contact the design team.
