import axios from 'axios'

export const signup = body => {
    return axios.post("/api/1.0/users",body);
};

//creds password, username
export const login = creds => {
    return axios.post('/api/1.0/auth', {}, {auth: creds})
}

export const getUsers = (page=0,size=3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`)
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`)
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body)
}