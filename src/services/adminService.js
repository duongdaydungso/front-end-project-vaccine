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

export const deleteStaffMemberFromVaccination = (
  accessToken,
  vaccinationID,
  staffMemberSSN
) => {
  return axios.delete("/staffmembers/delete", {
    headers: {
      Authorization: accessToken,
    },
    params: {
      vaccinationid: vaccinationID,
      staffMemberSocialSecurityNumber: staffMemberSSN,
    },
  });
};

export const addNewVaccinestation = (accessToken, name, phone, address) => {
  return axios.post(
    "/vaccinestations/new",
    {
      name: name,
      phone: phone,
      address: address,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const addNewVaccination = (
  accessToken,
  vaccineStationId,
  limitNumber,
  date,
  vaccineType
) => {
  return axios.post(
    "/vaccinations/new",
    {
      vaccineStationId: vaccineStationId,
      limitNumber: limitNumber,
      date: date,
      vaccineType: vaccineType,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const addStaffMemberToVaccination = (
  accessToken,
  vaccinationID,
  staffSSN
) => {
  return axios.post(
    `/vaccinations/${vaccinationID}/add`,
    {
      SSN: staffSSN,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};
