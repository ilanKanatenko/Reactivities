import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import Activity from './models/activity';
import Navbar from './layout/Navbar';
import styles from './App.module.css';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const res = axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((response) => setActivities(response.data));
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
    activity.id
      ? setActivities((prevValue) => {
          return [
            ...prevValue.filter((value) => value.id !== activity.id),
            activity,
          ];
        })
      : setActivities((prevValue) => {
          return [...prevValue, { ...activity, id: uuid() }];
        });

    setSelectedActivity(activity);

    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prevValue) => {
      return [...prevValue.filter((value) => value.id !== id)];
    });
  };

  console.log(activities);

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
        />
      </Container>
    </>
  );
}

export default App;
