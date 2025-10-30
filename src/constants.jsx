const BASE_URL = "http://localhost:8090";

export const API_URLS = {
  HEADLINE: {
    VIEW: `${BASE_URL}/headline/view`,
    UPDATE: `${BASE_URL}/headline/update`,
  },

  EXPERIENCE: {
    VIEW_ALL: `${BASE_URL}/experience/view`,
    ADD: `${BASE_URL}/experience/add`,
    UPDATE: (id) => `${BASE_URL}/experience/update/${id}`,
    DELETE: (id) => `${BASE_URL}/experience/delete/${id}`,
  },

  PROJECTS: {
    VIEW_ALL: `${BASE_URL}/projects/view`,
    ADD: `${BASE_URL}/projects/add`,
    VIED_BY_ID: (id) => `${BASE_URL}/projects/view/${id}`,
    UPDATE: (id) => `${BASE_URL}/projects/update/${id}`,
    DELETE: (id) => `${BASE_URL}/projects/delete/${id}`,
  },

  SKILLS: {
    VIEW_ALL: `${BASE_URL}/skills/view`,
    ADD: `${BASE_URL}/skills/add`,
    VIED_BY_CATEGORY: (id) => `${BASE_URL}/skills/view/${id}`,
    UPDATE: (id) => `${BASE_URL}/projects/update/${id}`,
    DELETE: (id) => `${BASE_URL}/projects/delete/${id}`,
  },

  CATEGORY: {
    VIEW_ALL: `${BASE_URL}/category/view`,
    ADD: `${BASE_URL}/category/add`,
    VIED_BY_ID: (id) => `${BASE_URL}/category/view/${id}`,
    UPDATE: (id) => `${BASE_URL}/category/update/${id}`,
    DELETE: (id) => `${BASE_URL}/category/delete/${id}`,
  },

  EDUCATION: {
    VIEW_ALL: `${BASE_URL}/education/view`,
    ADD: `${BASE_URL}/education/add`,
    UPDATE: (id) => `${BASE_URL}/education/update/${id}`,
    DELETE: (id) => `${BASE_URL}/education/delete/${id}`,
  },

  CERTIFICATION: {
    VIEW_ALL: `${BASE_URL}/certification/view`,
    ADD: `${BASE_URL}/certification/add`,
    UPDATE: (id) => `${BASE_URL}/certification/update`,
    DELETE: (id) => `${BASE_URL}/certification/delete/${id}`,
  },
  PROFILES: {
    VIEW_ALL: `${BASE_URL}/profiles/view`,
    ADD: `${BASE_URL}/profiles/add`,
    UPDATE: (id) => `${BASE_URL}/profiles/update`,
    DELETE: (id) => `${BASE_URL}/profiles/delete/${id}`,
  },
};
