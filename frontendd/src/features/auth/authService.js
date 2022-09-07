import axios from 'axios'

const api_url = '/api/users/'

const register = async(userData) => {
    const response = await axios.post(api_url, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
const login = async (userData) => {
    const response = await axios.post(api_url + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user')
  }
  
  const authService = {
    register,
    logout,
    login,
  }
  
  export default authService