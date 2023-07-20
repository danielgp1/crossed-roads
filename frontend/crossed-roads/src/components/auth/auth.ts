export function isLoggedIn(): boolean {
  const token = localStorage.getItem('userToken');
  if (token) {
    const tokenDecodedPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenDecodedPayload.exp;
    return Date.now() < expirationTime * 1000;
  }
  return false;
}
