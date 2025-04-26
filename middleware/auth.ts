export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()
  
  // If user is not logged in and trying to access a protected route
  if (!isLoggedIn.value && to.path !== '/' && to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot-password') {
    return navigateTo('/login')
  }
  
  // If user is logged in and trying to access auth pages
  if (isLoggedIn.value && (to.path === '/login' || to.path === '/register' || to.path === '/forgot-password')) {
    return navigateTo('/dashboard')
  }
})