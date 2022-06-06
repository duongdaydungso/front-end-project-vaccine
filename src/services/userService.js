import axios from "../axios";

export const handleLoginAPI = (userSSN, userPassword) => {
  return axios.post("/auth/login", {
    SSN: userSSN,
    password: userPassword,
  });
};

export const getAllVaccinations = (accessToken) => {
  return axios.get("/vaccinations/all", {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const assignPatientToVaccination = (
  accessToken,
  vaccinationID,
  patientSSN
) => {
  return axios.post(
    `/vaccinations/assign`,
    {
      SSN: patientSSN,
      vaccinationID: vaccinationID,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const unassignPatientToVaccination = (
  accessToken,
  vaccinationID,
  patientSSN
) => {
  return axios.delete("/patients/delete", {
    headers: {
      Authorization: accessToken,
    },
    params: {
      vaccinationid: vaccinationID,
      SSN: patientSSN,
    },
  });
};

export const getProfileData = (accessToken, SSN, userType) => {
  return axios({
    method: "get",
    url: `/profile/${SSN}`,
    params: {
      usertype: userType,
    },
    headers: {
      Authorization: accessToken,
    },
  });
};
