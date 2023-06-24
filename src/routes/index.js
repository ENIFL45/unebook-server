const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/VerifyToken");
const {
  validateLoginRequest,
  validateForgotPassWordRequest,
  validateDeleteRequest,
  validatePublisherCreateRequest,
  validatePublisherAdminCreateRequest,
  validateSuperAdminCreateRequest,
  validateChangePassWordRequest,
  validateSuperAdminUpdateRequest,
  validatePublisherAdminUpdateRequest,
  validatePublisherUpdateRequest,
  validateCurrentUserUpdateRequest,
  validatePageLimitRequest,
  validatePubisherCreateAdminRequest,
} = require("../middlewares/RequestValidation");
const authController = require("../controllers/AuthController");
const publisherAdminController = require("../controllers/PublisherAdminController");
const publisherController = require("../controllers/PublisherController");
const superAdminController = require("../controllers/SuperAdminController");
const currentUserController = require("../controllers/CurrentUserController");

// auth route
router.post("/auth/login", validateLoginRequest, authController.login);
router.post(
  "/auth/forgotpassword",
  validateForgotPassWordRequest,
  authController.forgotPassword
);

// current user routes
router.post(
  "/currentuser/changepassword",
  verifyToken,
  validateChangePassWordRequest,
  currentUserController.passwordChange
);

router.post(
  "/currentuser/update",
  verifyToken,
  validateCurrentUserUpdateRequest,
  currentUserController.currentUserDetailsChange
);

router.get(
  "/currentuser/details",
  verifyToken,
  currentUserController.currentUserDetails
);

//super admin routes
router.post(
  "/superadmin/create",
  verifyToken,
  validateSuperAdminCreateRequest,
  superAdminController.createSuperAdmin
);
router.get(
  "/superadmin/getall",
  verifyToken,
  validatePageLimitRequest,
  superAdminController.getSuperAdmins
);
router.post(
  "/superadmin/update",
  verifyToken,
  validateSuperAdminUpdateRequest,
  superAdminController.updateSuperAdmin
);
router.delete(
  "/superadmin/delete/:id",
  verifyToken,
  validateDeleteRequest,
  superAdminController.deleteSuperAdmin
);

//publisher admin routes
router.post(
  "/publisheradmin/create",
  verifyToken,
  validatePublisherAdminCreateRequest,
  publisherAdminController.createAdmin
);
router.get(
  "/publisheradmin/getall",
  verifyToken,
  validatePageLimitRequest,
  publisherAdminController.getAllAdmins
);
router.post(
  "/publisheradmin/update",
  verifyToken,
  validatePublisherAdminUpdateRequest,
  publisherAdminController.updateAdmin
);
router.delete(
  "/publisheradmin/delete/:id",
  verifyToken,
  validateDeleteRequest,
  publisherAdminController.deleteAdmin
);

//publisher routes
router.post(
  "/publisher/create",
  verifyToken,
  validatePublisherCreateRequest,
  validatePubisherCreateAdminRequest,
  publisherController.createPublisher
);
router.get(
  "/publisher/getall",
  verifyToken,
  validatePageLimitRequest,
  publisherController.getAllPublishers
);
router.post(
  "/publisher/update",
  verifyToken,
  validatePublisherUpdateRequest,
  publisherController.updatePublisher
);
router.delete(
  "/publisher/delete/:id",
  verifyToken,
  validateDeleteRequest,
  publisherController.deletePublisher
);

module.exports = router;
