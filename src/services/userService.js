import axios from "../axios";

export const handleLoginAPI = (userSSN, userPassword) => {
  return axios.post("/auth/login", {
    SSN: userSSN,
    password: userPassword,
  });
};

export const handleSignUpAPI = (
  userType,
  name,
  password,
  SSN,
  gender,
  dateOfBirth
) => {
  return axios.post("/auth/register", {
    userType: userType,
    name: name,
    password: password,
    SSN: SSN,
    gender: gender,
    dateOfBirth: dateOfBirth,
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

export const getAllVaccinestationsData = () => {
  return axios.get("/vaccinestations/all");
};

export const getVaccinestationByID = (vaccinestationID) => {
  return axios.get(`/vaccinestations/${vaccinestationID}`);
};

export const getAllSymptomsData = () => {
  return axios.get("/symptoms/all");
};
