export const DApplicationsFilters = () => ({
  search: '',
  applicationType: null,
  nationality: null,
  age: {
    min: '',
    max: '',
  },
  language: null,
  location: null,
  invested: {
    min: '',
    max: '',
  },
  socialMedia: null,
  applications: {
    min: '',
    max: '',
  },
  status: null,
  dateFrom: null,
  dateTo: null,

  jobTitle: null,
  company: null,
  workExperienceLocation: null,
  currentlyEmployed: null,
  skills: null,

  school: null,
  degree: null,
  fieldOfStudy: null,

  theme: null,
  skillsOfOthers: null,
  houseLocation: null,
  houseLanguage: null,
  monthlyRent: {
    min: '',
    max: '',
  },
  houseAge: {
    min: '',
    max: '',
  },
  tenantsPerHouse: {
    min: '',
    max: '',
  },
  interestsAndHobbies: {
    min: '',
    max: '',
  },
  diet: null,
});

export const DApplicationsHead = [
  {
    reference: 'house',
    label: 'House',
    visible: true,
  },
  {
    reference: 'theme',
    label: 'Theme',
    visible: true,
  },
  {
    reference: 'location',
    label: 'Location',
    visible: true,
  },
  {
    reference: 'type',
    label: 'Type',
    visible: true,
  },
  {
    reference: 'rent',
    label: 'Rent',
    visible: true,
  },
  {
    reference: 'status',
    label: 'Status',
    visible: true,
  },
];

export const DAdminApplicationsHead = [
  {
    reference: 'name',
    label: 'Name',
    visible: true,
  },
  {
    reference: 'location',
    label: 'Location',
    visible: true,
  },
  {
    reference: 'nationality',
    label: 'Nationality',
    visible: true,
  },
  {
    reference: 'age',
    label: 'Age',
    visible: true,
  },
  {
    reference: 'applications',
    label: 'Applications',
    visible: true,
  },
  {
    reference: 'invested',
    label: 'Invested',
    visible: true,
  },
  {
    reference: 'house',
    label: 'House',
    visible: true,
  },
  {
    reference: 'rent',
    label: 'Rent',
    visible: true,
  },
  {
    reference: 'tier',
    label: 'Tier',
    visible: true,
  },
  {
    reference: 'status',
    label: 'Status',
    visible: true,
  },
  {
    reference: 'actions',
    label: '',
    visible: true,
  },
];
