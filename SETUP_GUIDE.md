# RYDRVAULT Mobile App - React Native

A modern mobile application for RYDRVAULT - Trusted Bike Spare Parts and Accessories Marketplace. Built with React Native for iOS and Android.

## Features

✅ **Mobile Number Authentication**
- 10-digit phone number validation
- Real-time input formatting
- Clear error messages

✅ **OTP Verification**
- 6-digit OTP input
- Resend OTP functionality with timer
- Better security

✅ **Modern UI/UX**
- Black and Orange color theme
- Smooth animations and transitions
- Gesture-based navigation
- Dark mode design

✅ **Home Screen**
- Product categories
- Featured products showcase
- Search functionality
- User profile display

## Tech Stack

- **React Native** - Cross-platform mobile development
- **React Navigation** - Screen and navigation management
- **Zustand** - State management
- **Axios** - API calls
- **React Native Vector Icons** - Icon library

## Project Structure

```
rydrvault/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js       # Phone number login
│   │   ├── OTPScreen.js         # OTP verification
│   │   └── HomeScreen.js        # Main home screen
│   ├── navigation/
│   │   └── RootNavigator.js     # Navigation configuration
│   ├── store/
│   │   └── authStore.js         # Authentication state (Zustand)
│   ├── theme/
│   │   └── colors.js            # Color and spacing constants
│   └── utils/
│       └── validation.js        # Input validation utilities
├── App.js                       # Main app component
├── index.js                     # Entry point
├── app.json                     # App configuration
├── babel.config.js              # Babel configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)
- Android SDK or iOS SDK

### Setup Steps

1. **Install Node Dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Run on Android**
   ```bash
   react-native run-android
   # or
   npm run android
   ```

4. **Run on iOS** (macOS only)
   ```bash
   react-native run-ios
   # or
   npm run ios
   ```

5. **Start Metro Bundler**
   ```bash
   npm start
   ```

## Usage

### Login Flow

1. **Mobile Number Screen**
   - Enter a 10-digit mobile number
   - Validation happens in real-time
   - Click "Send OTP" button

2. **OTP Screen**
   - Enter the 6-digit OTP
   - Resend OTP option available (30-second timer)
   - Click "Verify OTP" to proceed

3. **Home Screen**
   - View product categories
   - Browse featured products
   - Access user profile
   - Logout option available

## Color Scheme

- **Primary (Orange)**: `#FF8C00` - Used for highlights and CTAs
- **Secondary (Black)**: `#000000` - Main background
- **Dark Gray**: `#333333` - Card backgrounds
- **Light Gray**: `#F5F5F5` - Text and borders
- **Success**: `#4CAF50` - Success messages
- **Error**: `#F44336` - Error messages

## API Integration

### Current State
The app currently uses mock authentication with simulated API calls. To integrate with real APIs:

1. **Login API**
   - Endpoint: `/api/auth/login`
   - Method: POST
   - Payload: `{ phoneNumber: string }`
   - Response: `{ success: boolean, message?: string }`

2. **Verify OTP API**
   - Endpoint: `/api/auth/verify-otp`
   - Method: POST
   - Payload: `{ phoneNumber: string, otp: string }`
   - Response: `{ success: boolean, token?: string, user?: object }`

### Update API Calls

Edit `src/store/authStore.js` to replace mock calls with real API calls using Axios:

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://your-api-domain.com';

// Replace the login function with:
login: async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      phoneNumber,
    });
    set({ phoneNumber, loading: false });
    return response.data;
  } catch (error) {
    set({ loading: false });
    throw error;
  }
},
```

## Validation Rules

- **Phone Number**: 10 digits, numeric only
- **OTP**: 6 digits, numeric only
- **Country Code**: Fixed as +91 (India) - Can be modified for other countries

## Customization

### Colors
Edit `src/theme/colors.js` to change the color scheme.

### Text/Content
All user-facing text is in the screen components. Modify as needed:
- `src/screens/LoginScreen.js`
- `src/screens/OTPScreen.js`
- `src/screens/HomeScreen.js`

### Navigation
Edit `src/navigation/RootNavigator.js` to add new screens or modify navigation logic.

## Troubleshooting

### Dependencies not installing
```bash
rm -rf node_modules
npm install
```

### Android build errors
```bash
cd android
./gradlew clean
cd ..
react-native run-android
```

### iOS pod issues
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Metro bundler cache issues
```bash
npm start -- --reset-cache
```

## Build Instructions

### Android APK
```bash
cd android
./gradlew assembleRelease
```
APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

### iOS Build
```bash
react-native build-ios
```

## License

MIT License - See LICENSE file for details

## Support

For issues, feature requests, or contributions, please contact the RYDRVAULT team.

---

**RYDRVAULT** - Trusted Fitment Guaranteed Bike Spare Parts and Accessories Marketplace
