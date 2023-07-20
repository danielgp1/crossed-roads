export function isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }
  