import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Activity from './models/activity';
import Navbar from './layout/Navbar';
import styles from './App.module.css';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from './api/agent';
import LoadingComponent from './layout/LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
      });

      setActivities(response);
      setLoading(false);
    });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities((prevValue) => {
          return [
            ...prevValue.filter((value) => value.id !== activity.id),
            activity,
          ];
        });
      });

      setSubmitting(false);
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities((prevValue) => {
          return [...prevValue, activity];
        });
      });
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities((prevValue) => {
        return [...prevValue.filter((value) => value.id !== id)];
      });
      setSubmitting(false);
    });
  };

  if (loading) return <LoadingComponent content='Loading App' />;

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container className={`${styles.mt7}`}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
