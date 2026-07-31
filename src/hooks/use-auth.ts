import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const isVerified = useAuthStore((s) => s.isVerified());
  const isStaff = useAuthStore((s) => s.isStaff());
  const can = useAuthStore((s) => s.can);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);
  const refresh = useAuthStore((s) => s.refresh);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  return {
    user,
    isAuthenticated,
    isVerified,
    isStaff,
    can,
    login,
    register,
    logout,
    refresh,
    updateProfile,
    fetchMe,
  };
}
