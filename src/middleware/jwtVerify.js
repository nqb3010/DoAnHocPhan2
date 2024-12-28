const JWT = require("jsonwebtoken");
const db = require("../models/index");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const middlewareController = {
    // Verify token and get user info
    verifyToken: async (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        
        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            const token = authorizationHeader.split(" ")[1];
            
            try {
                const decoded = JWT.verify(token, secret);
                const user = await db.Nguoi_dung.findOne({ 
                    where: { email: decoded.sub },
                    attributes: ['email', 'vai_tro'] // Include role in the query
                });
                
                if (!user) {
                    return res.status(401).json({ message: "Bạn không có đủ quyền" });
                }
                
                // Attach user info to request
                req.user = {
                    email: user.email,
                    role: user.vai_tro
                };
                next();
            } catch (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },

    // Middleware for admin only
    verifyAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "Admin") {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập" });
            }
        });
    },

    // Middleware for lecturer only
    verifyLecturer: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "giang_vien") {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập" });
            }
        });
    },

    // Middleware for student only
    verifyStudent: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "student") {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập" });
            }
        });
    },

    // Middleware for lecturer and admin
    verifyLecturerOrAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "giang_vien" || req.user.role === "Admin") {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập" });
            }
        });
    },

    // Middleware for student and lecturer
    verifyStudentOrLecturer: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "sinh_vien" || req.user.role === "giang_vien") {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập" });
            }
        });
    }
};

module.exports = middlewareController;