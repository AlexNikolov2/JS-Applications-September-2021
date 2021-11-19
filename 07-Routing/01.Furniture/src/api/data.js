import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//application-specific requests

export async function getAllFurniture() {
    return await api.get('/data/catalog');
}
export async function getFurnitureById(id) {
    return await api.get(`/data/catalog/${id}`);
}
export async function getFurnitureByProfile(){
    let userId = sessionStorage.getItem('userId');
    return await api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}
export async function createFurniture(data) {
    return await api.post('/data/catalog/', data);
}
export async function updateFurniture(id, data) {
    return await api.put(`/data/catalog/${id}`, data);
}
export async function deleteFurniture(id) {
    return await api.delete(`/data/catalog/${id}`);
}