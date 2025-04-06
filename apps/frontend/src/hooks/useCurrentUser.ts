import { useQuery } from '@tanstack/react-query';
import { UserSchema, type User } from '@/validators/user';

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        credentials: 'include',
      });

      console.log('🧠 /api/auth/me status:', res.status);

      if (!res.ok) {
        let errorMessage = 'Not authenticated';

        try {
          const errorData = await res.json();
          console.error('❌ Backend error:', errorData);
          errorMessage = errorData?.error || errorMessage;
        } catch (err) {
          console.error('❌ Failed to parse error response:', err);
        }

        throw new Error(errorMessage);
      }

      const json = await res.json();
      return UserSchema.parse(json);
    },
    retry: false,
  });
}
