import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivityList() {
  const [target, setTarget] = useState('');
  const { activityStore } = useStore();
  const { activitiesByDate, selectActivity, deleteActivity, loading } = activityStore;
  return (
    <>
      <Segment>
        <Item.Group divided>
          {activitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div> {activity.description} </div>
                  <div>
                    {activity.city},{activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectActivity(activity.id)}
                    floated='right'
                    content='View'
                    color='blue'
                  />
                  <Button
                    onClick={() => {
                      setTarget(activity.id);
                      deleteActivity(activity.id);
                    }}
                    floated='right'
                    content='Delete'
                    color='red'
                    loading={target === activity.id && loading}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}

export default observer(ActivityList);
