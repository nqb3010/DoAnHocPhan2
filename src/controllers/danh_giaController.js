const danh_giaService = require('../services/danh_giaService');

const danh_giaSinhVien = async (req, res) => {
    try {
        const { id_phancong, heso1, heso2} = req.body;
        const result = await danh_giaService.danh_giaSinhVien(id_phancong, heso1, heso2);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
    }

const getDanhGia = async (req, res) => {
    try {
        const Gv = req.params.id;
        const result = await danh_giaService.getDanhGia(Gv);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = {
    danh_giaSinhVien,
    getDanhGia
};