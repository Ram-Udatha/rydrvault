import { create } from 'zustand';

const useAuthStore = create((set) => ({
  phoneNumber: '',
  otp: '',
  isAuthenticated: false,
  user: null,
  loading: false,

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setOtp: (otp) => set({ otp }),

  // Mock login - in real app, this would call your API
  login: (phoneNumber) => {
    set({ loading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ phoneNumber, loading: false });
        resolve({ success: true });
      }, 1000);
    });
  },

  // Mock verify OTP - in real app, this would call your API
  verifyOtp: (otp, phoneNumber) => {
    set({ loading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({
          otp,
          isAuthenticated: true,
          user: {
            phoneNumber,
            userId: Math.random().toString(36).substr(2, 9),
            name: 'Rider',
          },
          loading: false,
        });
        resolve({ success: true });
      }, 1500);
    });
  },

  logout: () =>
    set({
      phoneNumber: '',
      otp: '',
      isAuthenticated: false,
      user: null,
    }),
}));

export default useAuthStore;
