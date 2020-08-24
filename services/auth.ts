import React from 'react';
import api from "./api";

export async function authenticate(username: string, password: string) {
    const response = await api.post('login/', {
        username: username,
        password: password
    })

    if (response.ok) {
        const { token }: any = response.data
        localStorage.setItem('Token', token)
        return response;
    } else {
        localStorage.clear()
        return response;
    }
}


export function isAuthenticated() {
    const token = localStorage.getItem('Token')

    if (token) {
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.clear()
}