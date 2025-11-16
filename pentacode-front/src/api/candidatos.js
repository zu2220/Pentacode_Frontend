import axiosInstance from '../api/axios';

export const getCandidatos = () => axiosInstance.get("/candidatos");
