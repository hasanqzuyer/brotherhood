import React, { useState } from 'react';
import { Modal, Tabs } from 'components/custom';
import { TAddInfluencerModalProps } from 'features/campaigns/role/admin/elements/add-campaign-modal/types';
import {
  AddInfluencerModalMain,
  CampaignsTitle,
} from 'features/campaigns/role/admin/elements/add-campaign-modal/styles';
import { Button, Checkbox, Input, InputGroup } from 'components/ui';
import { GridCell, Stack } from 'components/system';
import { InputLabel } from 'components/ui/input/styles';
import { EditIcon } from 'components/svg';

const AddInfluencerModal = ({
  onClose,
  ...props
}: TAddInfluencerModalProps) => {
  const [state, setState] = useState({
    campaignName: '',
    client: null,
    product: '',
    influencers: null,
    startDate: null,
    finishDate: null,
    report: null,
    budget: '',
    currency: '',
    campaignInfo: '',

    location: null,
    language: null,
    diseaseArea: null,
    stakeholders: null,
    gender: null,
    age: {
      min: '',
      max: '',
    },
    ethnicity: null,
    struggles: null,
    interests: null,
    influencerSize: null,
    targetAudienceInfo: '',

    platform: null,
    postType: null,
    image: null,
    website: null,
    instructions: '',
  });

  const handleFile = async () => {};

  const [tab, setTab] = useState(0);

  return (
    <Modal
      size="medium"
      title="Create Campaign "
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={onClose}
        >
          Create
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <Stack
        style={{ height: '500px', overflowY: 'scroll', paddingRight: '10px' }}
      >
        <Tabs
          tabs={['Info', 'Target', 'Instructions']}
          value={tab}
          onValue={setTab}
        />
        {tab === 0 && (
          <AddInfluencerModalMain columns={2}>
            <Input
              type="text"
              label="Campaign Name"
              placeholder="Please Enter"
              value={state.campaignName}
              onValue={(campaignName) => setState({ ...state, campaignName })}
            />
            <Input
              type="select"
              label="Client"
              placeholder="Please Select"
              value={state.client}
              onValue={(client) => setState({ ...state, client })}
            />
            <Input
              type="select"
              label="Product"
              placeholder="Please Enter"
              value={state.product}
              onValue={(product) => setState({ ...state, product })}
            />
            <Input
              type="number"
              label="Influencers"
              placeholder="Please Select"
              value={state.influencers}
              onValue={(influencers) => setState({ ...state, influencers })}
            />
            <Input
              type="date"
              label="Start Date"
              placeholder="Please Enter"
              value={state.startDate}
              onValue={(startDate) => setState({ ...state, startDate })}
            />
            <Input
              type="date"
              label="Finish Date"
              placeholder="Please Enter"
              value={state.finishDate}
              onValue={(finishDate) => setState({ ...state, finishDate })}
            />
            <Input
              type="select"
              label="Report"
              placeholder="Please Select"
              value={state.report}
              onValue={(report) => setState({ ...state, report })}
            />
            <InputGroup
              label="Amount"
              inputRatio="100px 1fr"
              elements={[
                {
                  value: state.currency,
                  onValue: (currency) => setState({ ...state, currency }),
                  type: 'select',
                  placeholder: 'CHF',
                  options: [
                    {
                      value: 'eur',
                      label: 'EUR',
                    },
                    {
                      value: 'usd',
                      label: 'USD',
                    },
                    {
                      value: 'chf',
                      label: 'CHF',
                    },
                  ],
                },
                {
                  value: state.budget,
                  onValue: (budget) => setState({ ...state, budget }),
                  type: 'text',
                  placeholder: 'Please Enter',
                },
              ]}
            />
            <GridCell columnSpan={2}>
              <Input
                multiline
                rows={5}
                type="text"
                label="Campaign Info"
                placeholder="Please Enter"
                value={state.campaignInfo}
                onValue={(campaignInfo) => setState({ ...state, campaignInfo })}
              />
            </GridCell>
          </AddInfluencerModalMain>
        )}
        {tab === 1 && (
          <AddInfluencerModalMain columns={2}>
            <Input
              type="select"
              label="Location"
              placeholder="Please Enter"
              value={state.location}
              onValue={(location) => setState({ ...state, location })}
            />
            <Input
              type="select"
              label="Language"
              placeholder="Please Select"
              value={state.language}
              onValue={(language) => setState({ ...state, language })}
            />
            <Input
              type="select"
              label="Disease Area"
              placeholder="Please Select"
              value={state.diseaseArea}
              onValue={(diseaseArea) => setState({ ...state, diseaseArea })}
            />
            <Input
              type="select"
              label="Stakeholder"
              placeholder="Please Select"
              value={state.stakeholders}
              onValue={(stakeholders) => setState({ ...state, stakeholders })}
            />
            <Input
              type="select"
              label="Gender"
              placeholder="Please Select"
              value={state.gender}
              onValue={(gender) => setState({ ...state, gender })}
              options={[
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ]}
            />
            <Input
              type="min-max"
              label="Age Range"
              placeholder="Please Select"
              value={state.age}
              onValue={(age) => setState({ ...state, age })}
            />
            <Input
              type="select"
              label="Ethnicity"
              placeholder="Please Select"
              value={state.ethnicity}
              onValue={(ethnicity) => setState({ ...state, ethnicity })}
            />
            <Input
              type="select"
              label="Interests"
              placeholder="Please Select"
              value={state.interests}
              onValue={(interests) => setState({ ...state, interests })}
            />
            <Input
              type="select"
              label="Influencer size"
              placeholder="Please Select"
              value={state.influencerSize}
              onValue={(influencerSize) =>
                setState({ ...state, influencerSize })
              }
            />
            <Input
              type="text"
              label="Target Audience info"
              placeholder="Please Select"
              value={state.targetAudienceInfo}
              onValue={(targetAudienceInfo) =>
                setState({ ...state, targetAudienceInfo })
              }
            />
            <GridCell columnSpan={2}>
              <Input
                multiline
                rows={5}
                type="text"
                label="Target Audience Info"
                placeholder="Please Enter"
                value={state.targetAudienceInfo}
                onValue={(targetAudienceInfo) =>
                  setState({ ...state, targetAudienceInfo })
                }
              />
            </GridCell>
          </AddInfluencerModalMain>
        )}
        {tab === 2 && (
          <AddInfluencerModalMain columns={2}>
            <Input
              type="select"
              label="Platform"
              placeholder="Please Select"
              value={state.platform}
              onValue={(platform) => setState({ ...state, platform })}
            />
            <Input
              type="select"
              label="Post Type"
              placeholder="Please Select"
              value={state.postType}
              onValue={(postType) => setState({ ...state, postType })}
            />
            <GridCell columnSpan={2}>
              <Stack direction="horizontal">
                <div style={{ width: '50%' }}>
                  <InputLabel>Image</InputLabel>
                  <Button
                    color="default"
                    variant="contained"
                    onClick={handleFile}
                  >
                    Upload
                  </Button>
                </div>
                <Input
                  type="text"
                  label="Website"
                  placeholder="Please Enter"
                  value={state.website}
                  onValue={(website) => setState({ ...state, website })}
                  style={{ width: '50%' }}
                />
              </Stack>
            </GridCell>
            <GridCell columnSpan={2}>
              <Input
                multiline
                rows={5}
                type="text"
                label="Instructions"
                placeholder="Please Enter"
                value={state.campaignInfo}
                onValue={(campaignInfo) => setState({ ...state, campaignInfo })}
              />
            </GridCell>
          </AddInfluencerModalMain>
        )}
      </Stack>
    </Modal>
  );
};

export default AddInfluencerModal;
