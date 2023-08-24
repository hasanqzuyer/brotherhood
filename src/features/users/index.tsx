import React, { useState, useEffect, Children, useMemo } from 'react';

import {
  UsersPageMain,
  UsersPageFilter,
  UsersPageFilterActions,
} from 'features/users/styles';
import { DUsersHead, DUsersFilters } from 'features/users/data';
import { CardWithText, NewCheckboxTable, Tabs } from 'components/custom';
import { SlidersHorizontalIcon, VerticalDotsIcon } from 'components/svg';
import { Button, Input, Pagination } from 'components/ui';
import { Grid, Stack, Collapse } from 'components/system';
import { TTableRenderItemObject } from 'components/custom/table/types';
import * as XLSX from 'xlsx';
import Link from 'next/link';
import { useDebounce, useModal, usePagination, useSnackbar } from 'hooks';
import UsersAPI from 'api/users';
import { IUser } from 'api/users/types';
import { convertAgeToDate, getAge } from 'utilities/birthday-age-converter';
import ExportUsersModal from './elements/export-users-modal';
import { getLocations } from 'utilities/locations';
import { getNationalities } from 'utilities/nationalities';
import { getLanguages } from 'utilities/languages';
import { getSocialMedias } from 'utilities/socialMedias';
import { getCompanys } from 'utilities/companys';
import { getSchoolsAndUniversities } from 'utilities/schools';
import { getDegrees } from 'utilities/degrees';
import { getFieldOfStudies } from 'utilities/fieldOfStudy';
import { getHouseTheme } from 'utilities/houseTheme';
import { getSkillsOfOthers } from 'utilities/skillsOfOthers';
import { getInterestsAndHobbies } from 'utilities/interests';
import { getDiets } from 'utilities/diets';

const UsersPage = () => {
  const [filters, setFilter] = useState<any>(DUsersFilters());
  const [eModal, openEModal, closeEModal] = useModal(false);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>([]);
  const [checkedusers, setCheckedUsers] = useState<number[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [socialMedias, setSocialMedias] = useState<any[]>([]);
  const [companys, setCompanys] = useState<any[]>([]);
  const [schoolsAndUniversities, setSchoolsAndUniverisities] = useState<any[]>([]);
  const [degrees, setDegrees] = useState<any[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [skillsOfthers, setSkillsOfOthers] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

  const [filterOpen, setFilterOpen] = useState(false);

  const [tabs, setTabs] = useState(0);
  const { push } = useSnackbar();

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const clearFilters = () => {
    setFilter(DUsersFilters());
  };

  const toggleUser = (rowId: number, checked: boolean) => {
    if (checked) {
      setCheckedUsers([...checkedusers, rowId]);
    } else {
      setCheckedUsers(checkedusers.filter((id) => id !== rowId));
    }
  };

  const toggleAllCheckedUsers = (checked: boolean) => {
    if (checked) {
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = Array.from(
        new Set([...checkedusers, ...currentPageIds])
      );
      setCheckedUsers(newSelectedRows);
    } else {
      // Deselect all rows on the current page
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = checkedusers.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedUsers(newSelectedRows);
    }
  };

  const getAllUsers = async (): Promise<any> => {
    try {
      const response = await UsersAPI.getUsers({
        ...filters,
      });

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  const getLocationOptions = async (searchTerm: string = '') => {
    const result = getLocations(searchTerm);
    setLocations(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getNationalityOptions = async (searchTerm: string = '') => {
    const result = getNationalities(searchTerm);
    setNationalities(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getLanguageOptions = async (searchTerm: string = '') => {
    const result = getLanguages(searchTerm);
    setLanguages(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getSocialMediaOptions = async (searchTerm: string = '') => {
    const result = getSocialMedias(searchTerm);
    setSocialMedias(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getCompanyOptions = async (searchTerm: string = '') => {
    const result = getCompanys(searchTerm);
    setCompanys(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

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

  const getThemeOptions = async (searchTerm: string = '') => {
    const result = getHouseTheme(searchTerm);
    setThemes(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getSkillsOfOtherOptions = async (searchTerm: string = '') => {
    const result = getSkillsOfOthers(searchTerm);
    setSkillsOfOthers(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getInterestsOptions = async (searchTerm: string = '') => {
    const result = getInterestsAndHobbies(searchTerm);
    setInterests(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getDietsOptions = async (searchTerm: string = '') => {
    const result = getDiets(searchTerm);
    setDiets(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedNationalities = useDebounce(getNationalityOptions, 100);
  const debouncedLanguages = useDebounce(getLanguageOptions, 100);
  const debouncedSocialMedias = useDebounce(getSocialMediaOptions, 100);
  const debouncedCompanies = useDebounce(getCompanyOptions, 100);
  const debouncedSchools = useDebounce(getSchoolAndUniversityOptions, 100);
  const debouncedDegrees = useDebounce(getDegreeOptions, 100);
  const debouncedFieldOfStudy = useDebounce(getFieldOfStudyOptions, 100);
  const debouncedThemes = useDebounce(getThemeOptions, 100);
  const debouncedSkillsOfOthers = useDebounce(getSkillsOfOtherOptions, 100);
  const debouncedInterests = useDebounce(getInterestsOptions, 100);
  const debouncedDiets = useDebounce(getDietsOptions, 100);

  const applyFilters = () => {
    getAllUsers()
      .then((data) => {
        let users = data;
        const { minDOB, maxDOB } = convertAgeToDate(
          filters.age.min,
          filters.age.max
        );
        if (minDOB && maxDOB) {
          users = users.filter(
            (user: IUser) =>
              new Date(user.dateOfBirth) >= minDOB &&
              new Date(user.dateOfBirth) <= maxDOB
          );
        } else if (minDOB && !maxDOB) {
          users = users.filter(
            (user: IUser) => new Date(user.dateOfBirth) >= minDOB
          );
        } else if (!minDOB && maxDOB) {
          users = users.filter(
            (user: IUser) => new Date(user.dateOfBirth) <= maxDOB
          );
        }

        if (filters.applications.min && filters.applications.max) {
          users = users.filter(
            (user: IUser) =>
              user.applications.length >= filters.applications.min &&
              user.applications.length <= filters.applications.max
          );
        } else if (filters.applications.min && !filters.applications.max) {
          users = users.filter(
            (user: IUser) =>
              user.applications.length >= filters.applications.min
          );
        } else if (!filters.applications.min && filters.applications.max) {
          users = users.filter(
            (user: IUser) =>
              user.applications.length <= filters.applications.max
          );
        }
        if (filters.socialMedia) {
          users = users.filter((user: IUser) => {
            if (user.socialMedia.length > 0) {
              const media: any = user.socialMedia[0];
              if (media[filters.socialMedia.value.toLowerCase()]) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });
        }

        setTotalColumnItems(users);
      })
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  };

  useEffect(() => {
    getAllUsers()
      .then((data) => setTotalColumnItems(data))
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  }, []);

  const PageSize = 10;

  const { pagesCount, page, setTotalResults, handlePageChange, reload } =
    usePagination({
      limit: PageSize,
      page: 1,
      onChange: async (params, setPage) => {
        setPage(params.page);
        setTotalResults(totalColumnItems.length);
      },
    });

  useEffect(() => {
    setTotalResults(totalColumnItems?.length);
  }, [totalColumnItems]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return totalColumnItems?.slice(firstPageIndex, lastPageIndex);
  }, [page, totalColumnItems, PageSize]);

  const renderItem = ({ headItem, row }: TTableRenderItemObject) => {
    const singleUser = row.data as IUser;
    if (headItem.reference === 'name') {
      return (
        <Link
          style={{ textDecoration: 'none', color: '#4f4f4f' }}
          href="/users/overview"
        >
          {singleUser.firstName} {singleUser.lastName}
        </Link>
      );
    }
    if (headItem.reference === 'location') {
      return singleUser.location;
    }
    if (headItem.reference === 'nationality') {
      return singleUser.nationality;
    }
    if (headItem.reference === 'age') {
      return getAge(singleUser.dateOfBirth);
    }
    if (headItem.reference === 'language') {
      return singleUser.language;
    }
    if (headItem.reference === 'applications') {
      return singleUser.applications.length;
    }
    if (headItem.reference === 'invested') {
      return `€${singleUser.invested ? singleUser.invested : 0}`;
    }
    if (headItem.reference === 'actions') {
      return <VerticalDotsIcon />;
    }

    return '';
  };

  useEffect(() => {
    getLocationOptions();
    getNationalityOptions();
    getLanguageOptions();
    getSocialMediaOptions();
    getCompanyOptions();
    getDegreeOptions();
    getDietsOptions();
    getSchoolAndUniversityOptions();
    getFieldOfStudyOptions();
    getInterestsOptions();
    getThemeOptions()
    getSkillsOfOtherOptions();
  }, []);

  const handleExport = (type: string) => {
    let data: any = totalColumnItems;
    if (type !== 'all') {
      let selectedUsers: IUser[] = [];
      totalColumnItems.forEach((user: IUser) => {
        if (checkedusers.includes(user.id)) {
          selectedUsers.push(user);
        }
      });
      data = selectedUsers;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Users.xlsx');

    closeEModal();
  };

  return (
    <UsersPageMain>
      <CardWithText
        title="Users"
        actions={Children.toArray([
          <Button
            color={filterOpen ? 'secondary' : 'default'}
            variant="contained"
            onClick={toggleFilter}
            startIcon={<SlidersHorizontalIcon width="18" height="18" />}
          >
            Filters
          </Button>,
          <Button color="default" variant="contained" onClick={openEModal}>
            Export
          </Button>,
        ])}
      >
        <Stack>
          <Collapse removeGap in={filterOpen}>
            <UsersPageFilter>
              <Tabs
                tabs={['Info', 'Work Experience', 'Education', 'House']}
                value={tabs}
                onValue={setTabs}
              />
              {tabs === 0 && (
                <Grid columns={4}>
                  <Input
                    type="text"
                    label="Search"
                    placeholder="Please Select"
                    value={filters.search}
                    onValue={(search) => setFilter({ ...filters, search })}
                  />
                  <Input
                    type="select"
                    label="Location"
                    onSearch={debouncedLocation}
                    placeholder="Please Select"
                    options={locations}
                    value={filters.location}
                    onValue={(location) => setFilter({ ...filters, location })}
                  />
                  <Input
                    type="select"
                    label="Nationality"
                    onSearch={debouncedNationalities}
                    placeholder="Please Select"
                    options={nationalities}
                    value={filters.nationality}
                    onValue={(nationality) =>
                      setFilter({ ...filters, nationality })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Age"
                    placeholder="Please Select"
                    value={filters.age}
                    onValue={(age) => setFilter({ ...filters, age })}
                  />
                  <Input
                    type="select"
                    label="Language"
                    onSearch={debouncedLanguages}
                    placeholder="Please Select"
                    options={languages}
                    value={filters.language}
                    onValue={(language) => setFilter({ ...filters, language })}
                  />
                  <Input
                    type="min-max"
                    label="Applications"
                    placeholder="Please Select"
                    value={filters.applications}
                    onValue={(applications) =>
                      setFilter({ ...filters, applications })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Invested"
                    placeholder="Please Select"
                    value={filters.invested}
                    onValue={(invested) => setFilter({ ...filters, invested })}
                  />
                  <Input
                    type="select"
                    label="Social Media"
                    placeholder="Please Select"
                    value={filters.socialMedia}
                    onSearch={debouncedSocialMedias}
                    options={socialMedias}
                    onValue={(socialMedia) =>
                      setFilter({ ...filters, socialMedia })
                    }
                  />
                </Grid>
              )}
              {tabs === 1 && (
                <Grid columns={4}>
                  <Input
                    type="text"
                    label="Job Title"
                    placeholder="Please Enter"
                    value={filters.jobTitle}
                    onValue={(jobTitle) => setFilter({ ...filters, jobTitle })}
                  />
                  <Input
                    type="select"
                    label="Company"
                    placeholder="Please Select"
                    onSearch={debouncedCompanies}
                    options={companys}
                    value={filters.company}
                    onValue={(company) => setFilter({ ...filters, company })}
                  />
                  <Input
                    type="select"
                    label="Work Experience Location"
                    placeholder="Please Select"
                    options={locations}
                    onSearch={debouncedLocation}
                    value={filters.workExperienceLocation}
                    onValue={(workExperienceLocation) =>
                      setFilter({ ...filters, workExperienceLocation })
                    }
                  />
                  <Input
                    type="select"
                    label="Currently Employed"
                    placeholder="Please Select"
                    value={filters.currentlyEmployed}
                    onValue={(currentlyEmployed) =>
                      setFilter({ ...filters, currentlyEmployed })
                    }
                    options={[
                      {
                        value: 0,
                        label: 'Yes',
                      },
                      {
                        value: 1,
                        label: 'No',
                      },
                    ]}
                  />
                </Grid>
              )}
              {tabs === 2 && (
                <Grid columns={4}>
                  <Input
                    type="select"
                    label="School or University"
                    placeholder="Please Select"
                    onSearch={debouncedSchools}
                    options={schoolsAndUniversities}
                    value={filters.school}
                    onValue={(school) => setFilter({ ...filters, school })}
                  />
                  <Input
                    type="select"
                    label="Degree"
                    placeholder="Please Select"
                    onSearch={debouncedDegrees}
                    options={degrees}
                    value={filters.degree}
                    onValue={(degree) => setFilter({ ...filters, degree })}
                  />
                  <Input
                    type="select"
                    label="Field of Study"
                    placeholder="Please Select"
                    onSearch={debouncedFieldOfStudy}
                    options={fieldOfStudy}
                    value={filters.fieldOfStudy}
                    onValue={(fieldOfStudy) =>
                      setFilter({ ...filters, fieldOfStudy })
                    }
                  />
                </Grid>
              )}
              {tabs === 3 && (
                <Grid columns={4}>
                  <Input
                    type="select"
                    label="Theme"
                    placeholder="Please Select"
                    onSearch={debouncedThemes}
                    options={themes}
                    value={filters.theme}
                    onValue={(theme) => setFilter({ ...filters, theme })}
                  />
                  <Input
                    type="select"
                    label="Skills of Others"
                    placeholder="Please Select"
                    onSearch={debouncedSkillsOfOthers}
                    options={skillsOfthers}
                    value={filters.skillsOfOthers}
                    onValue={(skillsOfOthers) =>
                      setFilter({ ...filters, skillsOfOthers })
                    }
                  />
                  <Input
                    type="select"
                    label="Location"
                    placeholder="Please Select"
                    onSearch={debouncedLocation}
                    options={locations}
                    value={filters.houseLocation}
                    onValue={(houseLocation) =>
                      setFilter({ ...filters, houseLocation })
                    }
                  />
                  <Input
                    type="select"
                    label="Language"
                    placeholder="Please Select"
                    onSearch={debouncedLanguages}
                    options={languages}
                    value={filters.houseLanguage}
                    onValue={(houseLanguage) =>
                      setFilter({ ...filters, houseLanguage })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Monthly Rent"
                    value={filters.monthlyRent}
                    onValue={(monthlyRent) =>
                      setFilter({ ...filters, monthlyRent })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Age"
                    value={filters.houseAge}
                    onValue={(houseAge) => setFilter({ ...filters, houseAge })}
                  />
                  <Input
                    type="min-max"
                    label="Tenants per House"
                    value={filters.tenantsPerHouse}
                    onValue={(tenantsPerHouse) =>
                      setFilter({ ...filters, tenantsPerHouse })
                    }
                  />
                  <Input
                    type="select"
                    label="Interests and Hobbies"
                    placeholder="Please Select"
                    onSearch={debouncedInterests}
                    options={interests}
                    value={filters.interestsAndHobbies}
                    onValue={(interestsAndHobbies) =>
                      setFilter({ ...filters, interestsAndHobbies })
                    }
                  />
                  <Input
                    type="select"
                    label="Diet"
                    placeholder="Please Select"
                    onSearch={debouncedDiets}
                    options={diets}
                    value={filters.diet}
                    onValue={(diet) => setFilter({ ...filters, diet })}
                  />
                </Grid>
              )}

              <UsersPageFilterActions direction="horizontal">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={applyFilters}
                >
                  Filter
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={clearFilters}
                >
                  Clear filter
                </Button>
              </UsersPageFilterActions>
            </UsersPageFilter>
          </Collapse>
          <NewCheckboxTable
            head={DUsersHead}
            items={currentTableData}
            renderItem={renderItem}
            checkedRows={checkedusers}
            onSingleSelect={toggleUser}
            onSelectAll={toggleAllCheckedUsers}
          />
          <Pagination
            onChange={(_e, x) => handlePageChange(x)}
            page={page}
            count={pagesCount}
          />
        </Stack>
      </CardWithText>
      {eModal && (
        <ExportUsersModal onClose={closeEModal} onExport={handleExport} />
      )}
    </UsersPageMain>
  );
};

export default UsersPage;
