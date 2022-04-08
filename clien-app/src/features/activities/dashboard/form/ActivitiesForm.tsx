import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import Activity from '../../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

function ActivitiesForm({
  activity: selectedActivity,
  closeForm,
  createOrEditActivity,
  submitting,
}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    category: '',
    city: '',
    venue: '',
    description: '',
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEditActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Date'
          value={activity.date}
          type='date'
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
}

export default ActivitiesForm;
