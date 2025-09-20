import { supabase } from '@/lib/client';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Service for handling authentication related operations
 */
export const authService = {
    /**
     * Refreshes the authentication token using the refresh token
     * @returns The new access token if refresh was successful, null otherwise
     */
    async refreshToken() {
        try {
            const { data } = await supabase.auth.getSession();
            const refresh_token = data.session?.refresh_token;

            if (!refresh_token) return null;

            const newSession = await supabase.auth.refreshSession();
            if (!newSession.data.session) return null;

            // Update the session in Supabase
            await supabase.auth.setSession({
                access_token: newSession.data.session.access_token,
                refresh_token: newSession.data.session.refresh_token,
            });

            // Update the auth store
            this.updateAuthStore(newSession.data.session);

            return newSession.data.session.access_token;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    },

    /**
     * Updates the auth store with the new session information
     * @param session The new session to update the store with
     */
    updateAuthStore(session: any) {
        const authStore = useAuthStore.getState();
        if (authStore.session) {
            useAuthStore.setState({
                session: {
                    ...authStore.session,
                    access_token: session.access_token,
                    refresh_token: session.refresh_token
                }
            });
        }
    },

    /**
     * Logs out the user and clears the session
     */
    logout() {
        useAuthStore.setState({
            session: null,
            isLoggedIn: false,
            isLoading: false,
            error: null
        });
    }
};