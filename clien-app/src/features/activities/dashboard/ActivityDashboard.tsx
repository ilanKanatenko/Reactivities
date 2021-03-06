import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import ActivityDetails from './details/ActivityDetails';
import ActivitiesForm from './form/ActivitiesForm';

function ActivityDashboard() {
  const { activityStore } = useStore();

  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivitiesForm />}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
