export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie('auth')

  // If user is not authenticated and is trying to access a page other than /login, redirect to /login
  if (!auth.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If user is authenticated and is trying to access /login, redirect to / (index)
  if (auth.value && to.path === '/login') {
    return navigateTo('/')
  }
})
