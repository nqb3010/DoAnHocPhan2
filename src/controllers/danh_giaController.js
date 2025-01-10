const danh_giaService = require('../services/danh_giaService');

const danh_giaSinhVien = async (req, res) => {
    try {
        const Danhgia = req.body;
        const result = await danh_giaService.danh_giaSinhVien(Danhgia);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
    }

const getDanhGia = async (req, res) => {
    try {
        const Gv = req.query.Gv;
        const id_dtt = req.query.id_dtt;
        const result = await danh_giaService.getDanhGia(Gv, id_dtt);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = {
    danh_giaSinhVien,
    getDanhGia
};