import React, { useState } from 'react';
import { ProjectsMain, ProjectsGrid } from 'features/opportunities/styles';
import { PropertyCard, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import { Button } from 'components/ui';
import { useModal } from 'hooks';
import {
  ApplicationModal,
  PurchaseModal,
} from 'features/opportunities/role/investor/elements';

const InvestorMarketPage = () => {
  const [tab, setTab] = useState(0);

  const [applicationModal, openApplicationModal, closeApplicationModal] =
    useModal(false);
  const [purchaseModal, openPurchaseModal, closePurchaseModal] =
    useModal(false);

  return (
    <ProjectsMain>
      <Tabs
        value={tab}
        onValue={setTab}
        tabs={['Primary Market', 'Secondary Market', 'Completed']}
      />
      {tab === 0 && (
        <ProjectsGrid>
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
        </ProjectsGrid>
      )}
      {tab === 1 && (
        <ProjectsGrid>
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
          <PropertyCard
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            status="Not applied"
          />
        </ProjectsGrid>
      )}

      {tab === 2 && (
        <ProjectsGrid>
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
          <PropertyCard
            spots={8}
            availableSpots={8}
            rent={250}
            theme="Marketing"
            link="/overview"
            address="Trg bana Josipa Jelacica 23, Zagreb"
            title="1.5 Bedroom apartment in city center - Renovation to Rent"
            image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
            completed
            status="Not applied"
          />
        </ProjectsGrid>
      )}
      <Stack direction="horizontal">
        <Button
          variant="contained"
          color="primary"
          onClick={openApplicationModal}
        >
          Application Modal
        </Button>
        <Button variant="contained" color="primary" onClick={openPurchaseModal}>
          Purchase Modal
        </Button>
      </Stack>

      {applicationModal && <ApplicationModal onClose={closeApplicationModal} />}
      {purchaseModal && <PurchaseModal onClose={closePurchaseModal} />}
    </ProjectsMain>
  );
};

export default InvestorMarketPage;