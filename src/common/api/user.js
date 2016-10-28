export default (apiEngine) => ({
  list: ({ page }) => apiEngine.get('/api/users', { params: { page } }),
  register: (user) => apiEngine.post('/api/users', { data: user }),
  verify: ({ token }) => apiEngine.post('/api/users/verification', {
    data: { verificationToken: token },
  }),
  login: (user) => apiEngine.post('/api/users/login', { data: user }),
  logout: () => apiEngine.get('/api/users/logout'),
  show: () => apiEngine.get('/api/users/me'),
  update: (user) => apiEngine.put('/api/users/me', { data: user }),
  updateAvatarURL: (form) => apiEngine.put('/api/users/me/avatarURL', {
    data: form,
  }),
  uploadAvatar: (avatar) =>
    apiEngine.post('/api/users/me/avatar', { files: { avatar } }),
});
