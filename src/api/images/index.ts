import Project from 'constants/project';
import { client } from 'api/api-client';

const ImageApi = {
  fileUpload: async (file: File, houseId: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('houseId', houseId.toString());

    const { data } = await client.post(`${Project.apis.v1}/images`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data;
  },

  fileDelete: async (id: number) => {
    await client.delete(`${Project.apis.v1}/images/${id}`);
  },

  updateFile: async (body: any, id: number) => {
    await client.patch(`${Project.apis.v1}/images/${id}`, body);
  },

  fileDownload: async (id: string) => {
    const res = await client.get(`${Project.apis.v1}/images/${id}`);

    return res;
  },
};

export default ImageApi;
