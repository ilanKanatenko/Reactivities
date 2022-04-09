import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Navbar from './layout/Navbar';
import styles from './App.module.css';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './layout/LoadingComponent';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />;
  return (
    <>
      <Navbar />
      <Container className={`${styles.mt7}`}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
