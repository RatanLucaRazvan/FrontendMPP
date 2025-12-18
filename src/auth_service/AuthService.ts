import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
}

class AuthService {
  async login(mail: string, password: string): Promise<void> {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, {
        params: {
          mail: mail,
          password: password
        }
      });
      const { token } = response.data;
      // Store JWT token in localStorage
      localStorage.setItem('token', token);
    } catch (error) {
    //   throw new Error('Login failed:', error);
        console.log("Error");
    }
  }

  logout(): void {
    // Remove JWT token from localStorage
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    // Get JWT token from localStorage
    return localStorage.getItem('token');
  }

//   isAuthenticated(): boolean {
//     // Check if JWT token exists and is not expired
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token: string): boolean {
//     // Decode JWT token to check expiration date
//     const decodedToken: any = decode(token);
//     return decodedToken.exp < Date.now() / 1000;
//   }
}

export default new AuthService();