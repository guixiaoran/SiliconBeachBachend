import UniversalFunctions from "../../utils/universalFunctions";
import Joi from "joi";
import Controller from "../../controllers";

const Config = UniversalFunctions.CONFIG;

const createService = {
  method: "POST",
  path: "/api/service/createService",
  handler: function (request, h) {
    var userData =
      (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
      null;
    let payloadData = request.payload;
    return new Promise((resolve, reject) => {
      Controller.ServiceController.createService(
        userData,
        payloadData,
        function (err, data) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        }
      );
    });
  },
  config: {
    description: "create Service",
    tags: ["api", "admin", "Service"],
    auth: "UserAuth",
    validate: {
      payload: {
        // url: Joi.string().uri().allow(""),
        name: Joi.string().required(),
        description: Joi.string().required(),
        // requirements: Joi.array().items(Joi.string().allow("")),
        cost: Joi.string().allow(""),
      },
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        security: [{ user: {} }],
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS
            .swaggerDefaultResponseMessages,
      },
    },
  },
};

const getService = {
  method: "GET",
  path: "/api/service/getService",
  handler: function (request, h) {
    const userData =
      (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
      null;
    return new Promise((resolve, reject) => {
      Controller.ServiceController.getService(userData, function (err, data) {
        if (err) reject(UniversalFunctions.sendError(err));
        else
          resolve(
            UniversalFunctions.sendSuccess(
              Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
              data
            )
          );
      });
    });
  },
  config: {
    description: "get Service",
    tags: ["api", "user", "getService"],
    auth: "UserAuth",
    validate: {
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        security: [{ user: {} }],
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS
            .swaggerDefaultResponseMessages,
      },
    },
  },
};

const getServiceById = {
  method: "GET",
  path: "/api/service/getService/{_id}",
  handler: function (request, h) {
    const userData =
      (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
      null;
    return new Promise((resolve, reject) => {
      Controller.ServiceController.getServiceById(
        userData,
        request.params._id,
        function (err, data) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        }
      );
    });
  },
  config: {
    description: "get Service",
    tags: ["api", "user", "getService"],
    auth: "UserAuth",
    validate: {
      failAction: UniversalFunctions.failActionFunction,
      params: {
        _id: Joi.string().required(),
      },
    },
    plugins: {
      "hapi-swagger": {
        security: [{ user: {} }],
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS
            .swaggerDefaultResponseMessages,
      },
    },
  },
};

const deleteService = {
  method: "DELETE",
  path: "/api/service/deleteService/{_id}",
  handler: function (request, h) {
    const userData =
      (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
      null;
    const payloadData = request.params;
    return new Promise((resolve, reject) => {
      Controller.ServiceController.deleteService(
        userData,
        payloadData,
        function (err, data) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        }
      );
    });
  },
  config: {
    description: "delete service",
    tags: ["api", "user", "Service"],
    auth: "UserAuth",
    validate: {
      params: {
        _id: Joi.string().required(),
      },
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        security: [{ user: {} }],
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS
            .swaggerDefaultResponseMessages,
      },
    },
  },
};

// const updateCard = {
//   method: "PUT",
//   path: "/api/card/updateCard/{_id}",
//   handler: function (request, h) {
//     const userData =
//       (request.auth &&
//         request.auth.credentials &&
//         request.auth.credentials.userData) ||
//       null;
//     const payloadData = request.payload;
//     payloadData.cardId = request.params._id;
//     return new Promise((resolve, reject) => {
//       Controller.CardController.updateCard(
//         userData,
//         payloadData,
//         function (err, data) {
//           if (err) reject(UniversalFunctions.sendError(err));
//           else
//             resolve(
//               UniversalFunctions.sendSuccess(
//                 Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
//                 data
//               )
//             );
//         }
//       );
//     });
//   },
//   config: {
//     description: "update Card",
//     tags: ["api", "user", "card"],
//     auth: "UserAuth",
//     validate: {
//       params: {
//         _id: Joi.string().required(),
//       },
//       payload: {
//         title: Joi.string().optional().allow(""),
//         description: Joi.string().optional().allow(""),
//         url: Joi.string().uri().optional().allow(""),
//       },
//       failAction: UniversalFunctions.failActionFunction,
//     },
//     plugins: {
//       "hapi-swagger": {
//         security: [{ user: {} }],
//         responseMessages:
//           UniversalFunctions.CONFIG.APP_CONSTANTS
//             .swaggerDefaultResponseMessages,
//       },
//     },
//   },
// };

export default [createService, getService, getServiceById, deleteService];
