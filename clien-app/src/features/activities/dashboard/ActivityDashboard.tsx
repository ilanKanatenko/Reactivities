import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './details/ActivityDetails';
import ActivitiesForm from './form/ActivitiesForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEditActivity,
  deleteActivity,
}: Props) {
  console.log(selectedActivity);

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivitiesForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEditActivity={createOrEditActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
