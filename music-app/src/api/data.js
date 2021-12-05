import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums(){
    return await api.get(host + `/data/albums?sortBy=_createdOn%20desc&distinct=name`)
}
export async function getAlbumById(id){
    return await api.get(host + `/data/albums/${id}`)
}
export async function createAlbum(data){
    return await api.post(host + `/data/albums/`, data)
}
export async function editAlbum(id, data){
    return await api.put(host + `/data/albums/${id}`, data)
}
export async function deleteAlbum(id){
    return await api.del(host + `/data/albums/${id}`)
}
export async function searchAlbum(query){
    return await api.get(host + `/data/albums?where=name%20LIKE%20%22${query}%22`)
}

