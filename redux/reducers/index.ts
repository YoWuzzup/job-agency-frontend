import { combineReducers } from "redux";

import { user } from "./user";
import { freelancers, singleFreelancer } from "./freelancers";
import { companies } from "./companies";
import { jobs, singleJob } from "./jobs";
import { introInfo, settingsData, searchingFilter } from "./common";

export default combineReducers({
  user,
  freelancers,
  singleFreelancer,
  companies,
  jobs,
  introInfo,
  searchingFilter,
  settingsData,
  singleJob,
});
