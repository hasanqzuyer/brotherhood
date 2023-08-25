import React, { useState, useEffect } from 'react';
import { AccountGrid } from 'features/users-overview/styles';
import { Input } from 'components/ui';
import { Stack } from 'components/system';
import { AddIcon, DeleteIcon } from 'components/svg';
import { useDebounce, useSnackbar } from 'hooks';
import EducationApi from 'api/education';
import { TEducation } from 'api/education/types';
import { getSchoolsAndUniversities } from 'utilities/schools';
import { getDegrees } from 'utilities/degrees';
import { getFieldOfStudies } from 'utilities/fieldOfStudy';

const Education = (props: any) => {
  const { totalData, setTotalData, setHasChanged, saving, setSaving, userId } =
    props;
  const { push } = useSnackbar();

  const [InsertedArray, setInsertedArray] = useState<any[]>([]);
  const [EditedArray, setEditedArray] = useState<any[]>([]);
  const [DeletedArray, setDeletedArray] = useState<any[]>([]);

  const [schoolsAndUniversities, setSchoolsAndUniverisities] = useState<any[]>(
    []
  );
  const [degrees, setDegrees] = useState<any[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<any[]>([]);

  const [saveState, setSaveState] = useState({
    Updated: false,
    Inserted: false,
    Deleted: false,
  });

  const handleInsert = async () => {
    try {
      InsertedArray.forEach(async (id) => {
        const insertedDatas = totalData.filter(
          (element: any) => element.id === id
        );
        await EducationApi.createEducation(insertedDatas[0]);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleUpdate = async () => {
    try {
      EditedArray.forEach(async (id) => {
        const editedDatas = totalData.filter(
          (element: any) => element.id === id
        );
        const data = editedDatas[0];
        await EducationApi.updateEducation(data, id);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // eslint-disable-next-line
  const handleDeleteing = async () => {
    try {
      DeletedArray.forEach(async (id) => {
        await EducationApi.deleteEducation(id);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleAdd = () => {
    const items = [...totalData].sort((a: any, b: any) => {
      return b['id'] > a['id'] ? -1 : 1;
    });
    const newData: TEducation = {
      id: items[items.length - 1].id + 1,
      university: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      overAllGPA: 0,
      ownerId: userId,
      createdAt: '',
      updatedAt: '',
    };
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    tempTotalData.push(newData);

    setTotalData([...tempTotalData]);
    const exist = InsertedArray.includes(newData.id);
    if (!exist) {
      let Array = InsertedArray;
      Array.push(newData.id);
      setInsertedArray(Array);
    }
    getDegreeOptions();
    getSchoolAndUniversityOptions();
    getFieldOfStudyOptions();
  };

  const handleEdit = (id: any) => {
    const exist = EditedArray.includes(id);
    const existsInInsert = InsertedArray.includes(id);
    if (!exist && !existsInInsert) {
      let Array = EditedArray;
      Array.push(id);
      setEditedArray(Array);
    }
  };

  const handleDelete = (id: any) => {
    const index = InsertedArray.indexOf(id);
    if (index > -1) {
      InsertedArray.splice(index, 1);
      const tempData = totalData.filter((item: any) => item.id !== id);
      setTotalData([...tempData]);
      return;
    }
    const index1 = EditedArray.indexOf(id);
    if (index1 > -1) {
      EditedArray.splice(index1, 1);
    }

    const exist = DeletedArray.includes(id);
    if (!exist) {
      let Array = DeletedArray;
      Array.push(id);
      setDeletedArray(Array);
    }

    const tempData = totalData.filter((item: any) => item.id !== id);
    setTotalData([...tempData]);
    setHasChanged(true);
  };

  const handleSave = () => {
    setSaveState({
      Updated: false,
      Inserted: false,
      Deleted: false,
    });

    /////// Insert /////////
    handleInsert()
      .then((res) => {
        setInsertedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Inserted: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when adding educations.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Inserted: true,
        }));
      });

    /////// Update /////////
    handleUpdate()
      .then((res) => {
        setEditedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Updated: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when updating educations.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Updated: true,
        }));
      });

    ////////// delete //////////
    handleDeleteing()
      .then((res) => {
        setDeletedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Deleted: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when deleting educations.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Deleted: true,
        }));
      });
  };

  useEffect(() => {
    if (saveState.Inserted && saveState.Deleted && saveState.Updated) {
      setHasChanged(false);
      setSaving(false);
    }
    // eslint-disable-next-line
  }, [saveState]);

  useEffect(() => {
    if (saving) {
      handleSave();
    }
  }, [saving]);

  const handleChange = (name: string, value: any, id: any) => {
    handleEdit(id);
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    const objIndex = tempTotalData.findIndex((obj: any) => obj.id === id);
    tempTotalData[objIndex][name] = value;
    setHasChanged(true);
    setTotalData(() => [...tempTotalData]);
  };

  const [locations, setLocations] = useState<any[]>([]);
  const [companys, setCompanys] = useState<any[]>([]);

  const getSchoolAndUniversityOptions = async (searchTerm: string = '') => {
    const result = getSchoolsAndUniversities(searchTerm);
    setSchoolsAndUniverisities(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getDegreeOptions = async (searchTerm: string = '') => {
    const result = getDegrees(searchTerm);
    setDegrees(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getFieldOfStudyOptions = async (searchTerm: string = '') => {
    const result = getFieldOfStudies(searchTerm);
    setFieldOfStudy(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };
  const debouncedSchools = useDebounce(getSchoolAndUniversityOptions, 100);
  const debouncedDegrees = useDebounce(getDegreeOptions, 100);
  const debouncedFieldOfStudy = useDebounce(getFieldOfStudyOptions, 100);

  useEffect(() => {
    getDegreeOptions();
    getSchoolAndUniversityOptions();
    getFieldOfStudyOptions();
  }, []);

  useEffect(() => {
    if (totalData.length === 0) {
      const newData: TEducation = {
        id: 1,
        university: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        overAllGPA: 0,
        ownerId: userId,
        createdAt: '',
        updatedAt: '',
      };
      const json = JSON.stringify(totalData);
      const tempTotalData = JSON.parse(json);
      tempTotalData.push(newData);

      setTotalData([...tempTotalData]);
      const exist = InsertedArray.includes(newData.id);
      if (!exist) {
        let Array = InsertedArray;
        Array.push(newData.id);
        setInsertedArray(Array);
      }
      getDegreeOptions();
      getSchoolAndUniversityOptions();
      getFieldOfStudyOptions();
    }
  }, [totalData]);

  return (
    <>
      {totalData?.map((education: TEducation) => {
        return (
          <AccountGrid style={{ position: 'relative', marginBottom: '20px' }}>
            <Input
              type="select"
              label="School or University"
              placeholder="Please Select"
              onSearch={debouncedSchools}
              options={schoolsAndUniversities}
              value={
                education.university
                  ? {
                      label: education.university,
                      value: education.university,
                    }
                  : null
              }
              onValue={(university) =>
                handleChange(
                  'university',
                  university ? university.value : university,
                  education.id
                )
              }
            />

            <Input
              type="select"
              label="Degree"
              placeholder="Please Select"
              onSearch={debouncedDegrees}
              options={degrees}
              value={
                education.degree
                  ? {
                      label: education.degree,
                      value: education.degree,
                    }
                  : null
              }
              onValue={(degree) =>
                handleChange(
                  'degree',
                  degree ? degree.value : degree,
                  education.id
                )
              }
            />
            <Input
              type="select"
              label="Field of Study"
              placeholder="Please Select"
              onSearch={debouncedFieldOfStudy}
              options={fieldOfStudy}
              value={
                education.fieldOfStudy
                  ? {
                      label: education.fieldOfStudy,
                      value: education.fieldOfStudy,
                    }
                  : null
              }
              onValue={(fieldOfStudy) =>
                handleChange(
                  'fieldOfStudy',
                  fieldOfStudy ? fieldOfStudy.value : fieldOfStudy,
                  education.id
                )
              }
            />
            <Stack direction="horizontal">
              <Input
                type="date"
                label="From"
                placeholder="Please Select"
                value={education.from}
                onValue={(from) => handleChange('from', from, education.id)}
              />
              <Input
                type="date"
                label="To"
                placeholder="Please Select"
                value={education.to}
                onValue={(to) => handleChange('to', to, education.id)}
              />
            </Stack>
            <Input
              type="number"
              label="Overall GPA"
              placeholder="Please Enter"
              value={education.overAllGPA}
              onValue={(overAllGPA) =>
                handleChange('overAllGPA', overAllGPA, education.id)
              }
            />
            <Stack
              style={{
                position: 'absolute',
                right: '36px',
                top: '90px',
                width: 'fit-content',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Stack
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(education.id)}
              >
                <DeleteIcon style={{ color: '#9F9FB0' }} />
              </Stack>
              <Stack style={{ cursor: 'pointer' }} onClick={handleAdd}>
                <AddIcon style={{ color: '#9F9FB0' }} />
              </Stack>
            </Stack>
          </AccountGrid>
        );
      })}
    </>
  );
};

export default Education;
