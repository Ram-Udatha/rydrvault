import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../theme/colors';
import useAuthStore from '../store/authStore';
import { validateOtp } from '../utils/validation';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRef = useRef(null);

  const { verifyOtp, phoneNumber, loading } = useAuthStore();

  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 6) {
      setOtp(cleaned);
      setError('');
    }
  };

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
      setError('OTP verification failed. Please try again.');
    }
  };

  const handleResendOtp = () => {
    if (canResend) {
      setOtp('');
      setResendTimer(30);
      setCanResend(false);
      // In a real app, call the resend OTP API here
      otpInputRef.current?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Verify OTP</Text>
          </View>

          {/* OTP Form */}
          <View style={styles.formContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitle}>
                Enter the 6-digit OTP sent to
              </Text>
              <Text style={styles.phoneNumber}>+91 {phoneNumber}</Text>
            </View>

            {/* OTP Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>OTP</Text>
              <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                <TextInput
                  ref={otpInputRef}
                  style={styles.input}
                  placeholder="------"
                  placeholderTextColor={COLORS.darkGray}
                  value={otp}
                  onChangeText={handleOtpChange}
                  keyboardType="numeric"
                  maxLength={6}
                  editable={!loading}
                />
              </View>
              {otp && !error && validateOtp(otp) && (
                <Text style={styles.successText}>✓ Valid OTP format</Text>
              )}
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="large" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>

            {/* Resend OTP Section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive OTP?</Text>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.resendTimer}>
                  Resend in {resendTimer}s
                </Text>
              )}
            </View>

            {/* Additional Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                OTP is valid for 10 minutes. Do not share it with anyone.
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: FONTS.extraLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  formContainer: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  descriptionContainer: {
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  phoneNumber: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.primary,
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
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONTS.extraLarge,
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 8,
    textAlign: 'center',
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
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    height: 50,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  resendText: {
    fontSize: FONTS.regular - 2,
    color: COLORS.lightGray,
    marginRight: SPACING.sm,
  },
  resendLink: {
    fontSize: FONTS.regular - 2,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  resendTimer: {
    fontSize: FONTS.regular - 2,
    color: COLORS.lightGray,
    fontWeight: '600',
  },
  infoBox: {
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

export default OTPScreen;
