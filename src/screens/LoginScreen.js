import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../theme/colors';
import useAuthStore from '../store/authStore';
import { validatePhoneNumber } from '../utils/validation';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuthStore();

  const handleLogin = async () => {
    setError('');

    if (!phoneNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const result = await login(phoneNumber);
      if (result.success) {
        navigation.replace('OTP');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handlePhoneInput = (text) => {
    // Allow only digits
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          {/* Header with App Name */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>RV</Text>
            </View>
            <Text style={styles.appName}>RYDRVAULT</Text>
            <Text style={styles.tagline}>Trusted Bike Spare Parts</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login with your mobile number</Text>

            {/* Phone Number Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor={COLORS.darkGray}
                  value={phoneNumber}
                  onChangeText={handlePhoneInput}
                  keyboardType="numeric"
                  maxLength={10}
                  editable={!loading}
                />
              </View>
              {phoneNumber && !error && validatePhoneNumber(phoneNumber) && (
                <Text style={styles.successText}>✓ Valid mobile number</Text>
              )}
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="large" />
              ) : (
                <Text style={styles.loginButtonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            {/* Info Text */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                We'll send a one-time password (OTP) to your mobile number for verification
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2026 RYDRVAULT. All rights reserved.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  appName: {
    fontSize: FONTS.extraLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONTS.regular,
    color: COLORS.lightGray,
  },
  formContainer: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: SPACING.lg,
    marginVertical: SPACING.xl,
  },
  title: {
    fontSize: FONTS.extraLarge,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.lightGray,
    marginBottom: SPACING.lg,
  },
  inputWrapper: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.regular,
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.secondary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  countryCode: {
    fontSize: FONTS.large,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONTS.regular,
    color: COLORS.white,
  },
  successText: {
    color: COLORS.success,
    fontSize: 12,
    marginTop: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.sm,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    height: 50,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  infoContainer: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    fontSize: FONTS.regular - 2,
    color: COLORS.lightGray,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
  footerText: {
    fontSize: FONTS.regular - 4,
    color: COLORS.darkGray,
  },
});

export default LoginScreen;
