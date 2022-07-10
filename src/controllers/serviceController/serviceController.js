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
 * @param {serviceId} payloadData.serviceId string
 */
const createService = (userData, payloadData, callback) => {
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
    createServices: (cb) => {
      let serviceToSave = {
        serviceCreator: userFound._id,
        description: payloadData.description,
        name: payloadData.name,
        cost: payloadData.cost,
        private: payloadData.private,
      };
      console.log("------------------", serviceToSave);
      Service.ServiceService.createRecord(serviceToSave, function (err, data) {
        if (err) return cb(err);
        if (data?.length === 0) return cb(ERROR.DEFAULT);
        serviceId = data._id;
        serviceData = data;

        return cb();
      });
    },
  };
  async.series(task, function (err) {
    if (err) return callback(err);
    else return callback(null, { serviceData });
  });
};

const updateService = (userData, payloadData, callback) => {
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
    updateServices: (cb) => {
      let serviceToSave = {
        serviceCreator: userFound._id,
        description: payloadData.description,
        name: payloadData.name,
        cost: payloadData.cost,
        private: payloadData.private,
      };
      console.log("------------------", serviceToSave);
      Service.ServiceService.updateRecord(
        { _id: payloadData.serviceId },
        serviceToSave,
        function (err, data) {
          if (err) return cb(err);
          if (data?.length === 0) return cb(ERROR.DEFAULT);
          serviceId = data._id;
          serviceData = data;

          return cb();
        }
      );
    },
  };
  async.series(task, function (err) {
    if (err) return callback(err);
    else return callback(null, { serviceData });
  });
};

const getService = (userData, callback) => {
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
        Service.ServiceService.getRecord(
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

const getServiceById = (userData, _id, callback) => {
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
        Service.ServiceService.getRecord(
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

const getServiceByUserId = (userData, userid, callback) => {
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
        const criteria = { serviceCreator: userid };
        const projection = {};
        Service.ServiceService.getRecord(
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

const deleteService = (userData, payloadData, callback) => {
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
        Service.ServiceService.deleteRecord(
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
  createService: createService,
  getService: getService,
  getServiceById: getServiceById,
  getServiceByUserId: getServiceByUserId,
  deleteService: deleteService,
  updateService: updateService,
};
