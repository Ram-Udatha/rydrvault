# Quick Start Guide - RYDRVAULT Mobile App

Get the RYDRVAULT mobile app up and running in under 5 minutes!

## Prerequisites

- ✅ Node.js v14+ installed
- ✅ npm or yarn installed
- ✅ Android Studio (for Android) OR Xcode (for iOS)

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run on Device/Emulator

**For Android:**
```bash
npm run android
```

**For iOS (macOS only):**
```bash
npm run ios
```

**Or start Metro Bundler manually:**
```bash
npm start
```

## Testing the App

### Login Screen
- **Mobile Number**: Enter any 10-digit number (e.g., 9876543210)
- **Click**: "Send OTP" button

### OTP Screen
- **OTP**: Enter any 6 digits (e.g., 123456)
- **Click**: "Verify OTP" button
- **Note**: You can resend OTP after 30 seconds

### Home Screen
- View categories and products
- Click your profile to logout

## Project Structure Overview

```
src/
├── screens/          # UI screens
├── navigation/       # App navigation
├── store/           # State management
├── theme/           # Colors & spacing
└── utils/           # Helper functions
```

## Key Features

🎨 **Black & Orange Theme** - Modern dark design  
📱 **Phone Number Auth** - 10-digit validation  
🔐 **OTP Verification** - 6-digit OTP with resend  
🏠 **Home Dashboard** - Product browsing  

## Customization

### Change Colors
Edit `src/theme/colors.js`:
```javascript
primary: '#FF8C00',    // Orange
secondary: '#000000',  // Black
```

### Change Text
Edit the screens in `src/screens/`:
- `LoginScreen.js`
- `OTPScreen.js`
- `HomeScreen.js`

### Connect Real API
See [API_INTEGRATION.md](API_INTEGRATION.md) for detailed instructions.

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start Metro bundler |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator |
| `npm test` | Run tests |

## Common Issues & Fixes

### Port Already in Use
```bash
lsof -i :8081
kill -9 <PID>
```

### Clear Cache
```bash
npm start -- --reset-cache
```

### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

## Next Steps

1. ✅ Run the app
2. ✅ Test the authentication flow
3. ✅ Customize colors and text
4. ✅ Integrate with real backend API (see API_INTEGRATION.md)
5. ✅ Build and deploy

## Need Help?

📖 See **SETUP_GUIDE.md** for detailed setup instructions  
🔌 See **API_INTEGRATION.md** for backend integration  
🐛 Check **TROUBLESHOOTING.md** for common issues  

Happy coding! 🚀
