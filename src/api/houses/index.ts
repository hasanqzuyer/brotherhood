import Project from 'constants/project';
import { TCreateHouse } from 'api/houses/types';

import { client } from 'api/api-client';

const HouseAPI = {
  create: async (body: TCreateHouse) => {
    const { data } = await client.post(
      `${Project.apis.v1}/house-projects`,
      body
    );

    return data;
  },

  getAll: async (search?: string) => {
    const { data } = await client.get(`${Project.apis.v1}/house-projects`, {
      params: {
        search,
        limit: 10,
      },
    });

    return data;
  },

  getOne: async (id: any) => {
    const { data } = await client.get(
      `${Project.apis.v1}/house-projects/${id}`
    );

    return data;
  },
};

export default HouseAPI;