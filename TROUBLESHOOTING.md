# Troubleshooting Guide - RYDRVAULT Mobile App

## Installation Issues

### npm install fails
**Problem**: Dependencies not installing properly

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Try with different npm version
npm install -g npm@latest
npm install
```

### Permission denied errors
**Problem**: You get permission errors when installing

**Solutions**:
```bash
# Use sudo (not recommended but works)
sudo npm install

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## Android Issues

### Build fails with "SDK not found"
**Problem**: `Unable to locate Android SDK`

**Solutions**:
1. **Set ANDROID_HOME**:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

2. **Add to ~/.bashrc or ~/.zshrc**:
   ```bash
   echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
   echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc
   ```

3. **Restart terminal and verify**:
   ```bash
   echo $ANDROID_HOME
   ```

### Port 8081 already in use
**Problem**: Metro bundler fails to start - port 8081 in use

**Solutions**:
```bash
# Find process using port 8081
lsof -i :8081

# Kill the process
kill -9 <PID>

# Or specify different port
react-native start --port 8082
npx react-native run-android --port=8082
```

### Gradle build fails
**Problem**: `Failed to compile` or `Gradle error`

**Solutions**:
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android

# Or with verbose output
react-native run-android --verbose
```

### App crashes on startup
**Problem**: App closes immediately after opening

**Solutions**:
```bash
# Check logs
react-native log-android

# Clear app data
adb shell pm clear com.rydrvaultmobile

# Rebuild and reinstall
npm run android -- --mode=release
```

---

## iOS Issues

### Pod install fails
**Problem**: `CocoaPods installation failed`

**Solutions**:
```bash
# Update CocoaPods
sudo gem install cocoapods

# Go to iOS folder
cd ios

# Remove old pods
rm -rf Pods
rm Podfile.lock

# Reinstall pods
pod install

# Go back
cd ..
```

### Xcode build fails
**Problem**: `Build error in Xcode`

**Solutions**:
```bash
# Clean build
cd ios
xcodebuild clean -workspace rydrvaultmobile.xcworkspace -scheme rydrvaultmobile
cd ..

# Rebuild
react-native run-ios
```

### Simulator issues
**Problem**: App won't run on iOS simulator

**Solutions**:
```bash
# List available simulators
xcrun simctl list devices

# Specify simulator
react-native run-ios --simulator="iPhone 15"

# Erase simulator
xcrun simctl erase <UDID>
```

---

## Metro Bundler Issues

### "Cannot find module"
**Problem**: Module not found during bundling

**Solutions**:
```bash
# Restart Metro with reset cache
npm start -- --reset-cache

# If still failing, check file exists
ls src/screens/LoginScreen.js

# Check for typos in imports
```

### Metro doesn't detect file changes
**Problem**: Changes in files aren't reflected in app

**Solutions**:
```bash
# Stop and restart Metro
npm start -- --reset-cache

# On Linux/Mac, increase watch limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Bundle size too large
**Problem**: Metro bundler is slow

**Solutions**:
```bash
# Check bundle size
react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output bundle.js \
  --assets-dest ./assets

# Remove unused dependencies
npm prune --production
```

---

## Runtime Issues

### White screen on app start
**Problem**: App opens but shows blank white screen

**Solutions**:
1. **Check logs**:
   ```bash
   react-native log-android
   # or
   react-native log-ios
   ```

2. **Verify App.js exists**:
   ```bash
   ls -la App.js
   ```

3. **Check RootNavigator**:
   - Ensure `src/navigation/RootNavigator.js` exists
   - Verify imports are correct

4. **Rebuild**:
   ```bash
   npm start -- --reset-cache
   npm run android
   ```

### Performance/Lag issues
**Problem**: App is slow or freezes

**Solutions**:
```bash
# Profile performance
# On Android, use Android Profiler in Android Studio

# Remove unnecessary renders
# Use React.memo for screens

# Check for memory leaks
# Use Xcode Instruments (iOS) or Android Profiler

# Reduce animation duration for testing
```

### Network errors (when using real API)
**Problem**: API calls fail with network errors

**Solutions**:
```javascript
// In src/store/authStore.js, add error logging
catch (error) {
  console.log('Network Error:', error);
  console.log('Status:', error.response?.status);
  console.log('Data:', error.response?.data);
  throw error;
}
```

### CORS errors
**Problem**: `Cross-Origin Request Blocked` (when using real API)

**Solutions**:
- Ensure backend API has CORS enabled
- Add headers to API server:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```

---

## State/Authentication Issues

### User not persisting after app restart
**Problem**: User logs out when app is closed

**Solutions**:
1. Implement persistent storage:
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   
   // Save user on login
   await AsyncStorage.setItem('user', JSON.stringify(user));
   
   // Load user on app start
   const savedUser = await AsyncStorage.getItem('user');
   ```

2. Rehydrate state on app start

### OTP screen not showing
**Problem**: Clicking "Send OTP" doesn't navigate to OTP screen

**Solutions**:
1. **Check navigation setup in RootNavigator.js**
   ```javascript
   // Verify the OTP screen is registered
   <Stack.Screen name="OTP" component={OTPScreen} />
   ```

2. **Check auth store state**
   ```javascript
   // Verify phoneNumber is being set
   console.log('Phone:', useAuthStore.getState().phoneNumber);
   ```

3. **Clear app state**
   ```javascript
   // Reset auth store
   useAuthStore.getState().logout();
   ```

---

## Emulator/Device Issues

### App works in emulator but not on device
**Problem**: App crashes only on physical device

**Solutions**:
1. Check device logs:
   ```bash
   adb logcat | grep ReactNative
   ```

2. Verify device is in developer mode

3. Check app permissions in manifest

4. Rebuild with proper signing certificates

### Emulator won't start
**Problem**: Android emulator fails to launch

**Solutions**:
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd <emulator_name>

# Or use Android Studio: AVD Manager
```

### Device not recognized by adb
**Problem**: `adb devices` shows no devices

**Solutions**:
```bash
# Restart adb
adb kill-server
adb start-server

# Check device connection
adb devices -l

# Enable USB debugging on device
# Settings > Developer Options > USB Debugging

# Accept authorization popup on device
```

---

## File & Permission Issues

### "Path not found" errors
**Problem**: Cannot find project files

**Solutions**:
```bash
# Verify you're in correct directory
pwd

# List important files
ls -la src/
ls -la App.js

# Check file permissions
chmod 755 index.js App.js
```

### Cannot write to directory
**Problem**: Permission denied when creating files

**Solutions**:
```bash
# Fix permissions
sudo chown -R $USER:$USER /workspaces/rydrvault

# Or on WSL Windows
# Run terminal as administrator
```

---

## Development Tools

### Debug Menu
**On Android**:
- Shake device or press `Ctrl+M` (Android emulator)
- Select "Debug JS Remotely" or "Reload JS"

**On iOS**:
- Shake device
- Select "Debug" or reload

### Chrome DevTools
```bash
# Enable remote debugging
react-native start

# In another terminal, open Chrome DevTools
# http://localhost:8081/debugger-ui
```

### React DevTools
```bash
# Install React DevTools
npm install -g react-devtools

# Start it
react-devtools

# Use in your app setup
```

---

## Performance Optimization

### Slow Metro bundler
```bash
# Use inline requires
if (Platform.OS === 'android') {
  const Component = require('./heavy-component').default;
}

# Or lazy load screens
const Screen = lazy(() => import('./screens/Screen'));
```

### Large app bundle
```bash
# Analyze bundle
react-native bundle --analyze-output-file analysis.json

# Use bundle splitting
react-native bundle --dev false --reset-cache
```

---

## Getting Help

1. **Check logs first**:
   ```bash
   react-native log-android
   react-native log-ios
   ```

2. **Search React Native docs**: https://reactnative.dev

3. **Check StackOverflow**: Tag `react-native`

4. **File GitHub issue with**:
   - Error message (full)
   - Steps to reproduce
   - Your environment (Node, npm, RN version)
   - Logs/screenshots

---

## Still Stuck?

Create a comprehensive bug report:

```
OS: [Android/iOS]
RN Version: [version from package.json]
Node Version: [node --version]
npm Version: [npm --version]
Error: [Full error message]
Steps to reproduce: [Detailed steps]
Expected: [What should happen]
Actual: [What actually happens]
```

Contact the RYDRVAULT development team with this information.

Happy debugging! 🔧
