# RYDRVAULT Authentication API Integration Guide

This guide explains how to integrate the RYDRVAULT mobile app with your backend authentication APIs.

## Current Implementation

The app currently uses **mock authentication** with simulated delays. This allows you to test the UI and flow without a backend.

## Integrating Real APIs

### Step 1: Update API Base URL

Create a new file `src/config/api.js`:

```javascript
import axios from 'axios';

export const API_BASE_URL = 'https://api.yourdomain.com'; // Update with your API URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token management
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    // const token = getStoredToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth and redirect to login
    }
    return Promise.reject(error);
  }
);
```

### Step 2: Update Auth Store

Edit `src/store/authStore.js`:

```javascript
import { apiClient } from '../config/api';

const useAuthStore = create((set) => ({
  // ... existing state ...

  login: async (phoneNumber) => {
    set({ loading: true });
    try {
      const response = await apiClient.post('/auth/login', {
        phoneNumber,
      });

      if (response.data.success) {
        set({ phoneNumber, loading: false });
        return { success: true };
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage = 
        error.response?.data?.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  },

  verifyOtp: async (otp, phoneNumber) => {
    set({ loading: true });
    try {
      const response = await apiClient.post('/auth/verify-otp', {
        phoneNumber,
        otp,
      });

      if (response.data.success) {
        // Store token if provided
        if (response.data.token) {
          // Store in secure storage
          // secureStorage.setItem('authToken', response.data.token);
        }

        set({
          otp,
          isAuthenticated: true,
          user: response.data.user || {
            phoneNumber,
            userId: response.data.userId,
            name: response.data.name || 'Rider',
          },
          loading: false,
        });
        return { success: true };
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage = 
        error.response?.data?.message || 'OTP verification failed.';
      throw new Error(errorMessage);
    }
  },

  resendOtp: async (phoneNumber) => {
    set({ loading: true });
    try {
      const response = await apiClient.post('/auth/resend-otp', {
        phoneNumber,
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  },

  logout: async () => {
    try {
      // Optional: Call logout API
      // await apiClient.post('/auth/logout');
      
      set({
        phoneNumber: '',
        otp: '',
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
```

## API Endpoints Specification

### 1. **Login Endpoint**

**URL:** `POST /auth/login`

**Request:**
```json
{
  "phoneNumber": "9876543210"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP sent to your mobile number"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid phone number format"
}
```

**Status Codes:**
- `200`: OTP sent successfully
- `400`: Invalid input
- `429`: Too many requests (rate limiting)
- `500`: Server error

---

### 2. **Verify OTP Endpoint**

**URL:** `POST /auth/verify-otp`

**Request:**
```json
{
  "phoneNumber": "9876543210",
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "uid_12345",
  "user": {
    "id": "uid_12345",
    "phoneNumber": "9876543210",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "profileImage": "https://...",
    "createdAt": "2024-02-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

**Status Codes:**
- `200`: OTP verified successfully
- `400`: Invalid OTP or phone number
- `401`: OTP expired
- `429`: Brute force attempt detected
- `500`: Server error

---

### 3. **Resend OTP Endpoint** (Optional)

**URL:** `POST /auth/resend-otp`

**Request:**
```json
{
  "phoneNumber": "9876543210"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP resent successfully",
  "expiresIn": 600
}
```

---

## Error Handling

### In OTPScreen.js

Update the error handling:

```javascript
const handleVerifyOtp = async () => {
  setError('');

  if (!otp.trim()) {
    setError('Please enter the OTP');
    return;
  }

  if (!validateOtp(otp)) {
    setError('Please enter a valid 6-digit OTP');
    return;
  }

  try {
    const result = await verifyOtp(otp, phoneNumber);
    if (result.success) {
      navigation.replace('Home');
    }
  } catch (err) {
    setError(err.message); // Display actual error from API
  }
};
```

## Security Best Practices

1. **Never store sensitive data in plain text**
   ```javascript
   // Use react-native-keychain or similar
   import * as Keychain from 'react-native-keychain';
   
   await Keychain.setGenericPassword('authToken', token);
   ```

2. **Implement HTTPS only**
   - Ensure your API endpoints use HTTPS
   - Implement certificate pinning for Android/iOS

3. **Token Expiration**
   - Implement token refresh mechanism
   - Redirect to login on token expiration

4. **Rate Limiting**
   - Backend should limit login/OTP attempts
   - Show user-friendly error messages

5. **OTP Best Practices**
   - OTP should be 6-8 digits
   - OTP expiration: 5-10 minutes
   - Limit OTP attempts (e.g., 3-5 attempts)
   - Add CAPTCHA after multiple failed attempts

## Example with Token Storage

```javascript
import * as Keychain from 'react-native-keychain';

const useAuthStore = create((set) => ({
  // ... other code ...

  saveToken: async (token) => {
    try {
      await Keychain.setGenericPassword('rydrvault', token);
      return true;
    } catch (error) {
      console.error('Failed to save token:', error);
      return false;
    }
  },

  getToken: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  },

  clearToken: async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Failed to clear token:', error);
    }
  },
}));
```

## Testing

### Mock Testing (without backend)
The current implementation with simulated delays is perfect for:
- UI testing
- User experience validation
- Navigation testing

### Integration Testing (with real API)
```javascript
// Example test
import axios from 'axios';
jest.mock('axios');

describe('Auth Store', () => {
  it('should login with valid phone number', async () => {
    axios.post.mockResolvedValue({
      data: { success: true },
    });

    const store = useAuthStore.getState();
    const result = await store.login('9876543210');
    
    expect(result.success).toBe(true);
  });
});
```

## Deployment Checklist

- [ ] Update `API_BASE_URL` with production URL
- [ ] Enable HTTPS for all API calls
- [ ] Implement token refresh mechanism
- [ ] Add error logging/analytics
- [ ] Test all authentication flows
- [ ] Implement security headers
- [ ] Set up API rate limiting
- [ ] Add monitoring/alerting

---

For more help or questions, contact the development team.
