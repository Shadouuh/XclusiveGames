import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import useNotification from './useNotification'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

export function useUser() {
    const [user, setUser] = useState(null)
    const { notify } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                notify('No se encrontro token de verificacion, vuelva a logearse', 'error')
                navigate('/auth')
                setUser(null)
                return
            }

            const decodedToken = jwt_decode(token)
            const currentTime = Date.now() / 1000

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token')
                notify('El token de verificacion se vencio, vuelva a logearse', 'error')
                navigate('/auth')
                setUser(null)
                return
            }

            const userData = {
                id: decodedToken.id,
                username: decodedToken.username,
                email: decodedToken.email
            }

            setUser(userData)
        } catch (err) {
            notify('Error al verificar token', 'error')
            console.error('Error getting user:', err)
            setUser(null)
        }
    }, [])

    const logout = async () => {
        try {
            //dudo que esto funcione como tal, no debo enviar otro dato? como credenciales?
            const response = await axios.post('/user/logout')

            if (response.status !== 200) return false

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            setUser(null)
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
