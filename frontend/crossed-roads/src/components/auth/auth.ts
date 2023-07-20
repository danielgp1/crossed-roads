export function isLoggedIn(): boolean {
  console.log("TEST")
  const token = localStorage.getItem('userToken');
  if (token) {
    const tokenDecodedPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenDecodedPayload.exp;
    console.log(expirationTime);
    return Date.now() < expirationTime * 1000;
  }
  return false;
}
