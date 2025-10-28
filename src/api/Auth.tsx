export interface LoginResult {
  success: boolean;
  username?: string;
  message?: string;
}

export async function loginMock(username: string, password: string): Promise<LoginResult> {
  const envUser = import.meta.env.VITE_TEST_USER;
  const envPassword = import.meta.env.VITE_TEST_PASSWORD;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === envUser && password === envPassword) {
        resolve({ success: true, username });
      } else {
        resolve({ success: false, message: "Usuario o contraseña incorrectos" });
      }
    }, 3000);
  });
}