import axios from "../axios";

export const getVaccinationByID = (accessToken, vaccinationID) => {
  return axios.get(`/vaccinations/${vaccinationID}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const deleteVaccination = (accessToken, vaccinationID) => {
  return axios.delete("/vaccinations/delete", {
    headers: {
      Authorization: accessToken,
    },
    params: {
      vaccinationid: vaccinationID,
    },
  });
};

export const getAllPatients = (accessToken) => {
  return axios.get("/patients/all", {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getAllStaffMember = (accessToken) => {
  return axios.get("/staffmembers/all", {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getUserTypeBySSN = (accessToken, SSN) => {
  return axios.get(`/auth/${SSN}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
