import Service from "../../services";
import async from "async";
import UniversalFunctions from "../../utils/universalFunctions";

const ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
const _ = require("underscore");

/**
 *
 * @param {Object} userData
 * @param {Object} payloadData
 * @param {url} payloadData.url  in url format
 * @param {Function} callback string
 * @param {name} payloadData.name string
 * @param {description} payloadData.description string
 * @param {cost} payloadData.cost string
//  * @param {serviceId} payloadData.serviceId string
 */
const createComment = (userData, payloadData, callback) => {
  let serviceData, serviceId;
  let userFound;

  const task = {
    validateUser: (cb) => {
      const criteria = {
        _id: userData.userId,
      };
      Service.UserService.getRecord(criteria, {}, {}, function (err, data) {
        if (err) return cb(err);
        if (data.length == 0) return cb(ERROR.INCORRECT_ACCESSTOKEN);
        userFound = (data && data[0]) || null;
        cb();
      });
    },
    createComment: (cb) => {
      let dataToSave = {
        commentCreator: userFound._id,
        content: payloadData.content,
        commentDate: payloadData.commentDate,
        serviceBelong: payloadData.serviceBelong,
      };
      console.log("------------------", dataToSave);
      Service.CommentService.createRecord(dataToSave, function (err, data) {
        if (err) return cb(err);
        if (data?.length === 0) return cb(ERROR.DEFAULT);
        serviceId = data._id;
        serviceData = data;

        return cb();
      });
    },
    // updateUserProfile: (cb) => {
    //   const criteria = {
    //     userId: userFound._id,
    //   };
    //   const dataToUpdate = {
    //     $addToSet: {
    //       services: serviceId,
    //     },
    //   };
    //   Service.UserProfileService.updateRecord(
    //     criteria,
    //     dataToUpdate,
    //     {},
    //     function (err) {
    //       if (err) return cb(err);
    //       cb();
    //     }
    //   );
    // },
  };
  async.series(task, function (err) {
    if (err) return callback(err);
    else return callback(null, { serviceData });
  });
};

const getComment = (userData, callback) => {
  let cardList = [];
  let userFound;
  async.series(
    [
      function (cb) {
        const criteria = {
          _id: userData.userId,
        };
        Service.UserService.getRecord(
          criteria,
          { password: 0 },
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
              else {
                userFound = (data && data[0]) || null;
                if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED);
                else cb();
              }
            }
          }
        );
      },
      function (cb) {
        const criteria = {};
        const projection = {};
        Service.CommentService.getRecord(
          criteria,
          projection,
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              cardList = data.map((element) => {
                return element;
              });
              cb();
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) callback(err);
      else callback(null, { data: cardList });
    }
  );
};

const getCommentByService = (userData, serviceId, callback) => {
  let cardList = [];
  let userFound;
  async.series(
    [
      function (cb) {
        const criteria = {
          _id: userData.userId,
        };
        Service.UserService.getRecord(
          criteria,
          { password: 0 },
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
              else {
                userFound = (data && data[0]) || null;
                if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED);
                else cb();
              }
            }
          }
        );
      },
      function (cb) {
        const criteria = { serviceBelong: serviceId };
        const projection = {};
        Service.CommentService.getRecord(
          criteria,
          projection,
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              cardList = data.map((element) => {
                return element;
              });
              cb();
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) callback(err);
      else callback(null, { data: cardList });
    }
  );
};

const getCommentById = (userData, _id, callback) => {
  let cardList = [];
  let userFound;
  async.series(
    [
      function (cb) {
        const criteria = {
          _id: userData.userId,
        };
        Service.UserService.getRecord(
          criteria,
          { password: 0 },
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
              else {
                userFound = (data && data[0]) || null;
                if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED);
                else cb();
              }
            }
          }
        );
      },
      function (cb) {
        const criteria = { _id: _id };
        const projection = {};
        Service.CommentService.getRecord(
          criteria,
          projection,
          {},
          function (err, data) {
            if (err) cb(err);
            else {
              cardList = data.map((element) => {
                return element;
              });
              cb();
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) callback(err);
      else callback(null, { data: cardList });
    }
  );
};

const deleteComment = (userData, payloadData, callback) => {
  let news;
  let userFound;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData.userId,
        };
        Service.UserService.getRecord(criteria, {}, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CommentService.deleteRecord(
          { _id: payloadData._id },
          function (err, data) {
            if (err) cb(err);
            else cb();
          }
        );
      },
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { data: news });
    }
  );
};

export default {
  createComment: createComment,
  getComment: getComment,
  getCommentById: getCommentById,
  getCommentByService: getCommentByService,
  deleteComment: deleteComment,
};
