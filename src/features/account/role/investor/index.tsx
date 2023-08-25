import React, { useState, useEffect } from 'react';
import {
  ApplicationContainer,
  AccountHeadline,
  AccountGrid,
} from 'features/users-overview/styles';
import { Button, Input, Card } from 'components/ui';
import { Stack } from 'components/system';
import { Tabs } from 'components/custom';
import UsersAPI from 'api/users';
import { IUser } from 'api/users/types';
import { useDebounce, useSnackbar } from 'hooks';
import { getLocations } from 'utilities/locations';
import { getNationalities } from 'utilities/nationalities';
import { getLanguages } from 'utilities/languages';
import { getHouseTheme } from 'utilities/houseTheme';
import { getSkillsOfOthers } from 'utilities/skillsOfOthers';
import { getInterestsAndHobbies } from 'utilities/interests';
import { getDiets } from 'utilities/diets';
import WorkExperience from './workExperiences';
import Education from './educations';
import { getSkills } from 'utilities/skills';
import { ISocialMedia } from 'api/socialMedia/types';
import SocialMediaAPI from 'api/socialMedia';
import { THousePreference } from 'api/housePreference/types';
import HousePreferenceApi from 'api/housePreference';
import { useAppContext } from 'context';

const AccountPage = (props: any) => {
  const { user, getMeData } = useAppContext();
  const [tabs, setTabs] = useState(0);
  const { push } = useSnackbar();
  const [infoHasChanged, setInfoHasChanged] = useState<boolean>(false);
  const [infoSaving, setInfoSaving] = useState<boolean>(false);
  const [socialMediaHasChanged, setSocialMediaHasChanged] =
    useState<boolean>(false);
  const [socialMediaSaving, setSocialMediaSaving] = useState<boolean>(false);
  const [expHasChanged, setExpHasChanged] = useState<boolean>(false);
  const [expSaving, setExpSaving] = useState<boolean>(false);
  const [eduHasChanged, setEduHasChanged] = useState<boolean>(false);
  const [eduSaving, setEduSaving] = useState<boolean>(false);
  const [hprefHasChanged, setHprefHasChanged] = useState<boolean>(false);
  const [hprefSaving, setHprefSaving] = useState<boolean>(false);

  const [info, setInfo] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    nationality: '',
    dateOfBirth: '',
    languages: [],
    skills: [],
  });

  const [workExperiences, setWorkExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [socialMedia, setSocialMedia] = useState<ISocialMedia>({
    id: -1,
    linkedin: '',
    tiktok: '',
    instagram: '',
    website: '',
    ownerId: user.id,
    createdAt: '',
    updatedAt: '',
  });
  const [housePreference, setHousePreference] = useState<THousePreference>({
    id: -1,
    theme: '',
    skillsOfOthers: '',
    location: '',
    language: '',
    monthlyRentMax: 0,
    monthlyRentMin: 0,
    ageMax: 0,
    ageMin: 0,
    tenantsMax: 0,
    tenantsMin: 0,
    interestsHobbies: '',
    ownerId: user.id,
    diet: '',
    motivation: '',
    createdAt: '',
    updatedAt: '',
  });

  const getUserById = async (id: any) => {
    if (!id) return;
    const data: IUser = await UsersAPI.getUser(id);

    setInfo((info: any) => ({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      nationality: data.nationality,
      dateOfBirth: data.dateOfBirth,
      languages: data.languages
        ? data.languages.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [],
      location: data.location,
      skills: data.skills
        ? data.skills.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [],
    }));

    setWorkExperiences(data.experiences);
    setEducations(data.educations);

    if (data.socialMedia?.length > 0) {
      setSocialMedia(data.socialMedia[0]);
    }
    if (data.housePreference?.length > 0) {
      setHousePreference(data.housePreference[0]);
    }
  };

  const [locations, setLocations] = useState<any[]>([]);
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [skillsOfthers, setSkillsOfOthers] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

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

  const getSkillsOptions = async (searchTerm: string = '') => {
    const result = getSkills(searchTerm);
    setSkills(
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
  const debouncedSkillsOfOthers = useDebounce(getSkillsOfOtherOptions, 100);
  const debouncedSkills = useDebounce(getSkillsOptions, 100);
  const debouncedInterests = useDebounce(getInterestsOptions, 100);
  const debouncedDiets = useDebounce(getDietsOptions, 100);

  useEffect(() => {
    getLocationOptions();
    getNationalityOptions();
    getLanguageOptions();
    getDietsOptions();
    getInterestsOptions();
    getThemeOptions();
    getSkillsOfOtherOptions();
    getSkillsOptions();
  }, []);

  const updateUserInfo = async () => {
    try {
      const languages = info.languages.map((item: any) => item.value).join(',');
      const skills = info.skills.map((item: any) => item.value).join(',');
      let data = { ...info, languages, skills };
      console.log(data);
      await UsersAPI.updateSingleUser(user.id, data).then(() => {});
      setInfoSaving(false);
      setInfoHasChanged(false);
    } catch {
      push('Something went wrong when update user info.', { variant: 'error' });
      setInfoSaving(false);
    }
  };

  const saveSocialMedia = async () => {
    try {
      if (socialMedia.id === -1) {
        await SocialMediaAPI.createSocialMedia(socialMedia).then(() => {});
      } else {
        await SocialMediaAPI.updateSocialMedia(
          socialMedia,
          socialMedia.id
        ).then(() => {});
      }
      setSocialMediaHasChanged(false);
      setSocialMediaSaving(false);
    } catch {
      push('Something went wrong when save social media.', {
        variant: 'error',
      });
      setSocialMediaSaving(false);
    }
  };

  const saveHousePreference = async () => {
    try {
      if (housePreference.id === -1) {
        await HousePreferenceApi.createHousePreference(housePreference).then(
          () => {}
        );
      } else {
        await HousePreferenceApi.updateHousePreference(
          housePreference,
          housePreference.id
        ).then(() => {});
      }
      setHprefHasChanged(false);
      setHprefSaving(false);
    } catch {
      push('Something went wrong when save house preference.', {
        variant: 'error',
      });
      setHprefSaving(false);
    }
  };

  const handleSave = () => {
    if (infoHasChanged) {
      setInfoSaving(true);
      updateUserInfo();
    }
    if (socialMediaHasChanged) {
      setSocialMediaSaving(true);
      saveSocialMedia();
    }
    if (expHasChanged) {
      setExpSaving(true);
    }
    if (eduHasChanged) {
      setEduSaving(true);
    }
    if (hprefHasChanged) {
      setHprefSaving(true);
      saveHousePreference();
    }
  };

  useEffect(() => {
    if (
      !expSaving &&
      !infoSaving &&
      !eduSaving &&
      !hprefSaving &&
      !socialMediaSaving &&
      user.id
    ) {
      getUserById(user.id);
      getMeData();
    }
  }, [
    expSaving,
    infoSaving,
    eduSaving,
    hprefSaving,
    socialMediaSaving,
    user.id,
  ]);

  const handleChangeInfo = (name: string, value: any) => {
    setInfo({ ...info, [name]: value });
    setInfoHasChanged(true);
  };

  const handleChangeSocialMedia = (name: string, value: string) => {
    setSocialMedia({ ...socialMedia, [name]: value });
    setSocialMediaHasChanged(true);
  };

  const handleChangeHousePreference = (name: string, value: string) => {
    setHousePreference({ ...housePreference, [name]: value });
    setHprefHasChanged(true);
  };

  const handleChangeMinMaxHousePreference = (
    minName: string,
    maxName: string,
    value: any
  ) => {
    setHousePreference({
      ...housePreference,
      [minName]: value.min,
      [maxName]: value.max,
    });
    setHprefHasChanged(true);
  };

  return (
    <Stack>
      <Tabs tabs={['Info', 'Application']} value={tabs} onValue={setTabs} />
      {tabs === 0 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <AccountHeadline>Info</AccountHeadline>
              <AccountGrid style={{ marginBottom: '36px' }}>
                <Input
                  type="text"
                  label="First Name"
                  placeholder="John"
                  value={info?.firstName}
                  onValue={(firstName) =>
                    handleChangeInfo('firstName', firstName)
                  }
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  value={info?.lastName}
                  onValue={(lastName) => handleChangeInfo('lastName', lastName)}
                />
                <Input
                  type="text"
                  label="Email"
                  placeholder="johndio@gmail.com"
                  value={info?.email}
                  onValue={() => {}}
                  disabled
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="select"
                  label="Country of Residence"
                  onSearch={debouncedLocation}
                  placeholder="Please Select"
                  options={locations}
                  value={
                    info.location
                      ? {
                          label: info.location,
                          value: info.location,
                        }
                      : null
                  }
                  onValue={(location) =>
                    handleChangeInfo(
                      'location',
                      location ? location.value : location
                    )
                  }
                />
                <Input
                  type="select"
                  label="Nationality"
                  onSearch={debouncedNationalities}
                  placeholder="Please Select"
                  options={nationalities}
                  value={
                    info.nationality
                      ? {
                          label: info.nationality,
                          value: info.nationality,
                        }
                      : null
                  }
                  onValue={(nationality) =>
                    handleChangeInfo(
                      'nationality',
                      nationality ? nationality.value : nationality
                    )
                  }
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  placeholder="Please Select"
                  value={info?.dateOfBirth}
                  onValue={(dateOfBirth) =>
                    handleChangeInfo('dateOfBirth', dateOfBirth)
                  }
                />
                <Input
                  type="multiselect"
                  label="Languages"
                  onSearch={debouncedLanguages}
                  placeholder="Please Select"
                  options={languages}
                  isFilterActive
                  value={info.languages}
                  onValue={(languages) =>
                    handleChangeInfo('languages', languages)
                  }
                />
              </AccountGrid>
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
      {tabs === 1 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <AccountHeadline>Work Experience</AccountHeadline>
              <WorkExperience
                userId={user.id}
                totalData={workExperiences}
                setTotalData={setWorkExperiences}
                setHasChanged={setExpHasChanged}
                saving={expSaving}
                setSaving={setExpSaving}
              />
              <AccountHeadline>Education</AccountHeadline>
              <Education
                userId={user.id}
                totalData={educations}
                setTotalData={setEducations}
                setHasChanged={setEduHasChanged}
                saving={eduSaving}
                setSaving={setEduSaving}
              />
              <AccountHeadline>Skills</AccountHeadline>
              <AccountGrid>
                <Input
                  type="multiselect"
                  label="Type to Add Skills"
                  placeholder="Please Select"
                  onSearch={debouncedSkills}
                  options={skills}
                  value={info.skills}
                  onValue={(skills) => handleChangeInfo('skills', skills)}
                />
              </AccountGrid>
              <AccountHeadline>Social Media</AccountHeadline>
              <AccountGrid>
                <Input
                  type="text"
                  label="Instagram"
                  placeholder="Please Enter"
                  value={socialMedia?.instagram}
                  onValue={(instagram) =>
                    handleChangeSocialMedia('instagram', instagram)
                  }
                />
                <Input
                  type="text"
                  label="LinkedIn"
                  placeholder="Please Enter"
                  value={socialMedia?.linkedin}
                  onValue={(linkedin) =>
                    handleChangeSocialMedia('linkedin', linkedin)
                  }
                />
                <Input
                  type="text"
                  label="TikTok"
                  placeholder="Please Enter"
                  value={socialMedia?.tiktok}
                  onValue={(tiktok) =>
                    handleChangeSocialMedia('tiktok', tiktok)
                  }
                />
                <Input
                  type="text"
                  label="Website"
                  placeholder="Please Enter"
                  value={socialMedia?.website}
                  onValue={(website) =>
                    handleChangeSocialMedia('website', website)
                  }
                />
              </AccountGrid>
              <AccountHeadline>House Preferences</AccountHeadline>
              <AccountGrid>
                <Input
                  type="select"
                  label="Theme"
                  placeholder="Please Select"
                  options={themes}
                  value={
                    housePreference.theme
                      ? {
                          label: housePreference.theme,
                          value: housePreference.theme,
                        }
                      : null
                  }
                  onValue={(theme) =>
                    handleChangeHousePreference(
                      'theme',
                      theme ? theme.value : theme
                    )
                  }
                />
                <Input
                  type="select"
                  label="Skills of Others"
                  placeholder="Please Select"
                  options={skillsOfthers}
                  onSearch={debouncedSkillsOfOthers}
                  value={
                    housePreference.skillsOfOthers
                      ? {
                          label: housePreference.skillsOfOthers,
                          value: housePreference.skillsOfOthers,
                        }
                      : null
                  }
                  onValue={(skillsOfOthers) =>
                    handleChangeHousePreference(
                      'skillsOfOthers',
                      skillsOfOthers ? skillsOfOthers.value : skillsOfOthers
                    )
                  }
                />
                <Input
                  type="select"
                  label="Location"
                  placeholder="Please Select"
                  onSearch={debouncedLocation}
                  options={locations}
                  value={
                    housePreference.location
                      ? {
                          label: housePreference.location,
                          value: housePreference.location,
                        }
                      : null
                  }
                  onValue={(location) =>
                    handleChangeHousePreference(
                      'location',
                      location ? location.value : location
                    )
                  }
                />
                <Input
                  type="select"
                  label="Language"
                  placeholder="Please Select"
                  onSearch={debouncedLanguages}
                  options={languages}
                  value={
                    housePreference.language
                      ? {
                          label: housePreference.language,
                          value: housePreference.language,
                        }
                      : null
                  }
                  onValue={(language) =>
                    handleChangeHousePreference(
                      'language',
                      language ? language.value : language
                    )
                  }
                />
                <Input
                  type="min-max"
                  label="Monthly Rent"
                  value={{
                    min: housePreference.monthlyRentMin,
                    max: housePreference.monthlyRentMax,
                  }}
                  onValue={(monthlyRent) =>
                    handleChangeMinMaxHousePreference(
                      'monthlyRentMin',
                      'monthlyRentMax',
                      monthlyRent
                    )
                  }
                />
                <Input
                  type="min-max"
                  label="Age"
                  value={{
                    min: housePreference.ageMin,
                    max: housePreference.ageMax,
                  }}
                  onValue={(age) =>
                    handleChangeMinMaxHousePreference('ageMin', 'ageMax', age)
                  }
                />
                <Input
                  type="min-max"
                  label="Tenants per House"
                  value={{
                    min: housePreference.tenantsMin,
                    max: housePreference.tenantsMax,
                  }}
                  onValue={(tenants) =>
                    handleChangeMinMaxHousePreference(
                      'tenantsMin',
                      'tenantsMax',
                      tenants
                    )
                  }
                />
                <Input
                  type="select"
                  label="Interests and Hobbies"
                  placeholder="Please Select"
                  onSearch={debouncedInterests}
                  options={interests}
                  value={
                    housePreference.interestsHobbies
                      ? {
                          label: housePreference.interestsHobbies,
                          value: housePreference.interestsHobbies,
                        }
                      : null
                  }
                  onValue={(interestsHobbies) =>
                    handleChangeHousePreference(
                      'interestsHobbies',
                      interestsHobbies
                        ? interestsHobbies.value
                        : interestsHobbies
                    )
                  }
                />
                <Input
                  type="select"
                  label="Diet"
                  placeholder="Please Select"
                  onSearch={debouncedDiets}
                  options={diets}
                  value={
                    housePreference.diet
                      ? {
                          label: housePreference.diet,
                          value: housePreference.diet,
                        }
                      : null
                  }
                  onValue={(diet) =>
                    handleChangeHousePreference(
                      'diet',
                      diet ? diet.value : diet
                    )
                  }
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="text"
                  label="Motivation"
                  placeholder="Please Enter"
                  value={housePreference?.motivation}
                  onValue={(motivation) =>
                    handleChangeHousePreference('motivation', motivation)
                  }
                  style={{ gridColumn: '1/3' }}
                />
              </AccountGrid>
              {!expSaving &&
              !infoSaving &&
              !eduSaving &&
              !socialMediaSaving &&
              !hprefSaving ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled={
                    !expHasChanged &&
                    !infoHasChanged &&
                    !eduHasChanged &&
                    !socialMediaHasChanged &&
                    !hprefHasChanged
                      ? true
                      : false
                  }
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled
                >
                  Saving...
                </Button>
              )}
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
    </Stack>
  );
};

export default AccountPage;
