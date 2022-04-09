import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';

function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

  if (!activity) return null;

  return (
    <>
      <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths='2'>
            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
            <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity} />
          </ButtonGroup>
        </Card.Content>
      </Card>
    </>
  );
}

export default ActivityDetails;
