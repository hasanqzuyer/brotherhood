import React, { useEffect, useState } from 'react';
import { CurrencyFeedback, Modal, Tabs } from 'components/custom';
import { TCreateSurveysModalProps } from 'features/surveys/role/client/elements/created-surveys-modal/types';
import {
  CreateSurveysModalMain,
  ImageUploadContainer,
} from 'features/surveys/role/client/elements/created-surveys-modal/styles';
import { Button, Input, InputGroup } from 'components/ui';
import { GridCell, Stack } from 'components/system';
import { InputLabel } from 'components/ui/input/styles';
import { SurveyAPI } from 'api';

const CreateSurveysModal = ({
  onClose,
  id,
  ...props
}: TCreateSurveysModalProps) => {
  const [survey, setSurvey] = useState<any>(null);

  const [state, setState] = useState<any>({
    surveyName: '',
    product: [],
    participants: null,
    startDate: null,
    endDate: null,
    budget: '',
    currency: null,
    tokens: null,
    surveyInfo: '',

    location: [],
    language: [],
    diseaseArea: [],
    gender: [],
    ageRange: {
      min: null,
      max: null,
    },
    ethnicity: [],
    struggles: [],
    interests: [],
    targetAudInfo: '',
    questionsCount: null,
    questionCredits: null,
    surveyType: null,
    link: '',
    materials: [],
    instructions: '',
    symptoms: [],
  });

  const [tab, setTab] = useState(0);

  const handleFile = async () => {};

  const getSurvey = async () => {
    const result = await SurveyAPI.getSurvey(id);

    setSurvey(result);
  };

  useEffect(() => {
    getSurvey();
  }, [id]);

  useEffect(() => {
    const newState = { ...state };

    if (survey && Object.keys(survey).length > 0) {
      newState.surveyName = survey.name;

      if (survey.instructions) {
        newState.instructions = survey.instructionsDescription;
      }

      if (survey.surveyType) {
        newState.surveyType = {
          value: survey.surveyType,
          label: 'Questionaire',
        };
      }

      if (survey.participantCount) {
        newState.participants = survey.participantCount;
      }

      if (
        survey.platformProductOrder.platformProductOrderSymptoms &&
        survey.platformProductOrder.platformProductOrderSymptoms.length > 0
      ) {
        newState.symptoms =
          survey.platformProductOrder.platformProductOrderSymptoms.map(
            (x: any) => ({ value: x.id, label: x.name })
          );
      }

      if (survey.questionCredits) {
        newState.questionCredits = survey.questionCredits;
      }

      if (survey.questionCount) {
        newState.questionsCount = survey.questionCount;
      }

      if (survey.clientSurveyTokenBalances) {
        newState.tokens = {
          value: survey.clientSurveyTokenBalances[0].tokenBalance,
          label: `${survey.clientSurveyTokenBalances[0].tokenBalance} Tokens`,
        };
      }

      if (survey.link) {
        newState.link = survey.link;
      }

      if (survey.participantsDescription) {
        newState.targetAudInfo = survey.participantsDescription;
      }

      if (survey.ageMin) {
        newState.ageRange.min = survey.ageMin;
      }

      if (survey.ageMax) {
        newState.ageRange.max = survey.ageMax;
      }

      if (survey.surveyDescription) {
        newState.surveyInfo = survey.surveyDescription;
      }

      if (survey.dateStart) {
        newState.startDate = survey.dateStart;
      }

      if (survey.dateEnd) {
        newState.endDate = survey.dateEnd;
      }

      if (survey.products) {
        newState.product = survey.products.map((x: any) => ({
          value: x.product.id,
          label: x.product.name,
        }));
      }

      if (survey.platformProductOrder.platformProductOrderLocations) {
        newState.location =
          survey.platformProductOrder.platformProductOrderLocations.map(
            (x: any) => ({
              value: x.location.id,
              label: x.location.country
                ? `${x.location.name}, ${x.location.country.name}`
                : x.location.name,
            })
          );
      }

      if (survey.platformProductOrder.platformProductOrderDiseaseAreas) {
        newState.diseaseArea =
          survey.platformProductOrder.platformProductOrderDiseaseAreas.map(
            (x: any) => ({ value: x.diseaseArea.id, label: x.diseaseArea.name })
          );
      }

      if (survey.platformProductOrder.platformProductOrderEthnicities) {
        newState.ethnicity =
          survey.platformProductOrder.platformProductOrderEthnicities.map(
            (x: any) => ({ value: x.ethnicity.id, label: x.ethnicity.name })
          );
      }

      if (survey.platformProductOrder.platformProductOrderStruggles) {
        newState.struggles =
          survey.platformProductOrder.platformProductOrderStruggles.map(
            (x: any) => ({ value: x.struggle.id, label: x.struggle.name })
          );
      }

      if (survey.platformProductOrder.platformProductOrderInterests) {
        newState.interests =
          survey.platformProductOrder.platformProductOrderInterests.map(
            (x: any) => ({ value: x.interest.id, label: x.interest.name })
          );
      }

      if (survey.platformProductOrder.platformProductOrderLanguages) {
        newState.language =
          survey.platformProductOrder.platformProductOrderLanguages.map(
            (x: any) => ({ value: x.id, label: x.name })
          );
      }

      if (survey.instructionsDescription) {
        newState.instructions = survey.instructionsDescription;
      }

      if (survey.surveyType !== null) {
        newState.surveyType = {
          value: 0,
          label: 'Questionaire',
        };
      }

      if (survey.platformProductOrder.budget) {
        newState.budget = survey.platformProductOrder.budget;
      }

      if (survey.platformProductOrder.platformProductOrderGenders) {
        newState.gender =
          survey.platformProductOrder.platformProductOrderGenders.map(
            (x: any) => ({
              value: x.value,
              label: x.name,
            })
          );
      }

      setState(newState);
    }
  }, [survey]);

  return (
    <Modal
      size="medium"
      title={survey && survey.name ? survey.name : ''}
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={onClose}
        >
          Close
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <Stack style={{ height: '600px', overflowY: 'scroll' }}>
        <Tabs
          tabs={['Info', 'Target', 'Instructions']}
          value={tab}
          onValue={setTab}
        />
        {tab === 0 && (
          <CreateSurveysModalMain columns={2}>
            <Input
              type="text"
              label="Survey name"
              value={state.surveyName}
              disabled
              onValue={(surveyName) => setState({ ...state, surveyName })}
            />
            <Input
              type="select"
              label="Tokens"
              value={state.tokens}
              disabled
              onValue={(tokens) => setState({ ...state, tokens })}
            />
            <Input
              type="multiselect"
              label="Product"
              value={state.product}
              disabled
              onValue={(product) => setState({ ...state, product })}
            />
            <Input
              type="number"
              label="Participants"
              value={state.participants}
              disabled
              onValue={(participants) => setState({ ...state, participants })}
            />
            <Input
              type="number"
              label="Questions Count"
              disabled
              value={state.questionsCount}
              onValue={(questionsCount) =>
                setState({ ...state, questionsCount })
              }
            />
            {/* <Input
              type="number"
              label="Question Credits"
              disabled
              value={state.questionCredits}
              onValue={(questionCredits) =>
                setState({ ...state, questionCredits })
              }
            /> */}
            <Input
              type="select"
              label="Survey Type"
              placeholder="Please Select"
              value={state.surveyType}
              disabled
              onValue={(surveyType) => setState({ ...state, surveyType })}
            />
            <Input
              type="date"
              label="Start Date"
              value={state.startDate}
              disabled
              onValue={(startDate) => setState({ ...state, startDate })}
            />
            <Input
              type="date"
              label="End Date"
              value={state.endDate}
              disabled
              onValue={(endDate) => setState({ ...state, endDate })}
            />

            <Stack>
              <Input
                type="number"
                value={state.budget}
                disabled
                onValue={(budget) => setState({ ...state, budget })}
                placeholder="Please Enter"
                startAdornment="CHF"
                label="Budget"
              />
              <CurrencyFeedback value={state.budget} />
            </Stack>
            <GridCell columnSpan={2}>
              <Input
                multiline
                rows={5}
                disabled
                type="text"
                label="Survey Info"
                value={state.surveyInfo}
                onValue={(surveyInfo) => setState({ ...state, surveyInfo })}
              />
            </GridCell>
          </CreateSurveysModalMain>
        )}
        {tab === 1 && (
          <CreateSurveysModalMain columns={2}>
            <Input
              type="multiselect"
              label="Location"
              disabled
              value={state.location}
              onValue={(location) => setState({ ...state, location })}
            />
            <Input
              type="multiselect"
              label="Language"
              disabled
              value={state.language}
              onValue={(language) => setState({ ...state, language })}
            />
            <Input
              type="multiselect"
              label="Disease Area"
              disabled
              value={state.diseaseArea}
              onValue={(diseaseArea) => setState({ ...state, diseaseArea })}
            />
            <Input
              type="multiselect"
              label="Gender"
              disabled
              value={state.gender}
              onValue={(gender) => setState({ ...state, gender })}
              options={[
                {
                  value: 0,
                  label: 'Male',
                },
                {
                  value: 1,
                  label: 'Female',
                },
                {
                  value: 2,
                  label: 'Other',
                },
              ]}
            />
            <Input
              type="min-max"
              label="Age"
              disabled
              value={state.ageRange}
              onValue={(ageRange) => setState({ ...state, ageRange })}
            />
            <Input
              type="multiselect"
              label="Ethnicity"
              disabled
              value={state.ethnicity}
              onValue={(ethnicity) => setState({ ...state, ethnicity })}
            />
            <Input
              type="multiselect"
              label="Struggle"
              disabled
              value={state.struggles}
              onValue={(struggles) => setState({ ...state, struggles })}
            />
            <Input
              type="multiselect"
              label="Interest"
              disabled
              value={state.interests}
              onValue={(interests) => setState({ ...state, interests })}
            />
            <GridCell columnSpan={2}>
              <Input
                multiline
                rows={5}
                disabled
                type="text"
                label="Target audience info"
                value={state.targetAudInfo}
                onValue={(targetAudInfo) =>
                  setState({ ...state, targetAudInfo })
                }
              />
            </GridCell>
          </CreateSurveysModalMain>
        )}
        {tab === 2 && (
          <CreateSurveysModalMain columns={1}>
            <Input
              type="text"
              label="Link"
              disabled
              value={state.link}
              onValue={(link) => setState({ ...state, link })}
            />
            <GridCell columnSpan={1}>
              <InputLabel>Materials</InputLabel>
              <Button
                disabled
                color="default"
                variant="contained"
                onClick={handleFile}
              >
                Upload
              </Button>
            </GridCell>
            <Input
              multiline
              rows={5}
              disabled
              type="text"
              label="Instructions"
              value={state.instructions}
              onValue={(instructions) => setState({ ...state, instructions })}
            />
          </CreateSurveysModalMain>
        )}
      </Stack>
    </Modal>
  );
};

export default CreateSurveysModal;
