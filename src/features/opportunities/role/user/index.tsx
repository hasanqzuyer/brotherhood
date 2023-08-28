import React, { useEffect, useState } from 'react';

import { PropertyCard, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import { Button } from 'components/ui';
import { ProjectsMain, ProjectsGrid } from 'features/opportunities/styles';
import { useModal, useSnackbar } from 'hooks';
import { IHouse } from 'api/houses/types';
import HouseAPI from 'api/houses';
import { PurchaseModal } from './elements';

const UserMarketPage = () => {
  const [tab, setTab] = useState(0);
  const { push } = useSnackbar();

  const [purchaseModal, openPurchaseModal, closePurchaseModal] =
    useModal(false);

  const [primaryHouses, setPrimaryHouses] = useState<IHouse[]>([]);
  const [secondaryHouses, setSecondaryHouses] = useState<IHouse[]>([]);
  const [completedHouses, setCompletedHouses] = useState<IHouse[]>([]);

  const getAllHouses = async (search: string): Promise<any> => {
    try {
      const response = await HouseAPI.getAll(search);

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  const refresh = async () => {
    switch (tab) {
      case 0:
        const primary = await getAllHouses('PRIMARY');
        setPrimaryHouses(primary);
        break;
      case 1:
        const secondary = await getAllHouses('SECONDARY');
        setSecondaryHouses(secondary);
        break;
      case 2:
        const completed = await getAllHouses('COMPLETED');
        setCompletedHouses(completed);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    refresh();
  }, [tab]);

  return (
    <ProjectsMain>
      <Stack
        style={{ width: '100%', justifyContent: 'space-between' }}
        direction="horizontal"
      >
        <Tabs
          value={tab}
          onValue={setTab}
          tabs={['Primary Market', 'Secondary Market', 'Completed']}
        />
      </Stack>
      {tab === 0 && (
        <ProjectsGrid>
          {primaryHouses?.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="Apply"
              />
            );
          })}
        </ProjectsGrid>
      )}
      {tab === 1 && (
        <ProjectsGrid>
          {secondaryHouses.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="Apply"
              />
            );
          })}
        </ProjectsGrid>
      )}

      {tab === 2 && (
        <ProjectsGrid>
          {completedHouses.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="Apply"
                dropdown
                completed
              />
            );
          })}
        </ProjectsGrid>
      )}
      <Stack direction="horizontal">
        <Button variant="contained" color="primary" onClick={openPurchaseModal}>
          Purchase Modal
        </Button>
      </Stack>

      {purchaseModal && <PurchaseModal onClose={closePurchaseModal} />}
    </ProjectsMain>
  );
};

export default UserMarketPage;
