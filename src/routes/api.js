const express = require("express");
const userController = require("../controllers/userController");
const middlewareController = require("../middleware/jwtVerify");
const internController = require("../controllers/internController");
const studentController = require("../controllers/studentController");
const companyController = require("../controllers/companyController");
const lecturerController = require("../controllers/lecturerController");
const adminController = require("../controllers/adminController");
const dashboardController = require("../controllers/dashboardController");
const classController = require("../controllers/classController");
const danhgiaController = require("../controllers/danh_giaController");
const initRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("/api", (req, res) => {
        res.send("API is working");
    });
    //dashboard routes
    app.get("/api/dashboard",middlewareController.verifyToken,middlewareController.verifyAll,dashboardController.handleGetDashboard);
    //user routes
    app.post("/api/auth/login",userController.handleLogin);

    //intern routes
    app.get("/api/interns",middlewareController.verifyToken, internController.handleGetInterns);
    app.post("/api/interns",middlewareController.verifyToken,middlewareController.verifyAdmin, internController.handleAddIntern);
    app.put("/api/intern/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, internController.handleUpdateIntern);
    app.delete("/api/intern/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, internController.handleDeleteIntern);
    //student routes
    app.get("/api/students",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, studentController.handleGetStudents);
    app.post("/api/students",middlewareController.verifyToken,middlewareController.verifyAdmin, studentController.handleAddStudent);
    app.put("/api/student/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, studentController.handleUpdateStudent);
    app.delete("/api/student/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, studentController.handleDeleteStudent);
    //company routes
    app.get("/api/companies",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, companyController.handleGetCompanies);
    app.post("/api/companies",middlewareController.verifyToken,middlewareController.verifyAdmin, companyController.handleAddCompany);
    app.put("/api/company/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, companyController.handleUpdateCompany);
    app.delete("/api/company/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, companyController.handleDeleteCompany);
    // lecturer routes
    app.get("/api/lecturers",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, lecturerController.handleGetLecturers);
    app.post("/api/lecturers",middlewareController.verifyToken,middlewareController.verifyAdmin, lecturerController.handleAddLecturer);
    app.put("/api/lecturer/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, lecturerController.handleUpdateLecturer);
    app.delete("/api/lecturer/:id",middlewareController.verifyToken,middlewareController.verifyAdmin, lecturerController.handleDeleteLecturer);
    app.get("/api/getStudentsByLecturer/:id",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, lecturerController.handleGetStudentsByLecturer);
    //admin routes
    app.post("/api/instructors",middlewareController.verifyToken,middlewareController.verifyAdmin, adminController.assignLecturer);

    // class routes
    app.get("/api/classes",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetAllClasses);
    app.get("/api/faculties",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetAllFaculties); 
    app.get("/api/courses",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetCourses);
    app.get("/api/companies",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetCompany);
    app.get("/api/internships",middlewareController.verifyToken,middlewareController.verifyAll, classController.handlegetInternship);
    app.get("/api/lecturers/:faculty",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetLecturersbyFaculty);
    app.post("/api/getStudentsWithoutInternship",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, studentController.handleGetStudentsWithoutInternship);
    app.get("/api/getClassbyfacultyandcourses",middlewareController.verifyToken,middlewareController.verifyLecturerOrAdmin, classController.handlegetClassbyFacultyandCourses);
    //danh gia routes
    app.post("/api/danhgia",middlewareController.verifyToken,middlewareController.verifyLecturer, danhgiaController.danh_giaSinhVien);
    app.post("/api/danhgiacongty",middlewareController.verifyToken,middlewareController.verifyCongTy, danhgiaController.danhgiacongty);
    app.get("/api/danhgia/",middlewareController.verifyToken,middlewareController.verifyLecturer, danhgiaController.getDanhGia);
    app.get("/api/danhgiacongty",middlewareController.verifyToken,middlewareController.verifyCongTy, danhgiaController.getdanhgiacuacongty);
};
module.exports = initRoutes;