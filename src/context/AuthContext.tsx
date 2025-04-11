'use client';

import { ApiService } from '@/services';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check if user is stored in localStorage
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}

		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			setToken(storedToken);
		}

		setIsLoading(false);
	}, []);

	const login = useCallback(
		(email: string, password: string) => {
			setIsLoading(true);
			return ApiService.login(email, password)
				.then((response) => {
					const { token, user } = response;
					// Store token and user in localStorage

					setUser(user);
					localStorage.setItem('user', JSON.stringify(user));

					setToken(token);
					localStorage.setItem('token', token);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[setUser, setToken, setIsLoading]
	);

	const register = useCallback(
		(name: string, email: string, password: string) => {
			setIsLoading(true);
			return ApiService.register(email, name, password)
				.then((response) => {
					const { token, user } = response;
					// Store token and user in localStorage

					setUser(user);
					localStorage.setItem('user', JSON.stringify(user));

					setToken(token);
					localStorage.setItem('token', token);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[setUser, setToken, setIsLoading]
	);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('user');

		setToken(null);
		localStorage.removeItem('token');
	}, [setUser, setToken]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				token,
				isLoading,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
