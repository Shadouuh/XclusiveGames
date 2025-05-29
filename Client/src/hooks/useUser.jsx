import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import useNotification from './useNotification'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

export function useUser() {
    const [user, setUser] = useState(null)
    const { notify } = useNotification()
    const navigate = useNavigate()


    useEffect(() => {
        try {
            // mmm galletitas 
            const token = Cookies.get('token')

            if (!token) {
                notify('No se encontró token de verificación, vuelva a loguearse', 'error')
                setUser(null)
                navigate('/auth')
                return
            }

            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000

            console.log('Token decodificado:', decodedToken)

            if (decodedToken.exp < currentTime) {
                notify('El token de verificacion se vencio, vuelva a logearse', 'error')
                navigate('/auth')
                setUser(null)
                return
            }

            const userData = {
                id: decodedToken.id_login, // Cambiar a id_login
                username: decodedToken.nick, // Cambiar a nick
                email: decodedToken.email // Este está bien
            }

            setUser(userData)
        } catch (err) {
            notify('Error al verificar token', 'error')
            console.error('Error getting user:', err)
            setUser(null)
        }
    }, [notify, navigate]) // Agregar las dependencias

    const logout = async () => {
        try {
            const response = await axios.post('/user/logout')

            if (response.status !== 200) return false

            setUser(null)
            Cookies.remove('token')
            notify('Sesión cerrada correctamente', 'success')
            navigate('/')

            return true
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
            notify('Error al cerrar sesión', 'error')
            return false
        }
    }

    return { user, logout }

}