function decodeToken(token) {
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const payload = atob(tokenParts[1]);
  const decodedToken = JSON.parse(payload);
  return decodedToken;
}

export default decodeToken; // Removed the parentheses to export the function directly
