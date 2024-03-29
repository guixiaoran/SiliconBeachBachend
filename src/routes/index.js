import DemoBaseRoute from "./demoRoute/demoBaseRoute";
import UserBaseRoute from "./userRoute/userBaseRoute";
import AdminBaseRoute from "./adminRoute/adminBaseRoute";
import UploadBaseRoute from "./uploadRoute/uploadBaseRoute";
import ServiceRoute from "./serviceRoute/serviceRoute";

const Routes = [].concat(
  DemoBaseRoute,
  UserBaseRoute,
  AdminBaseRoute,
  UploadBaseRoute,
  ServiceRoute
);

export default Routes;
