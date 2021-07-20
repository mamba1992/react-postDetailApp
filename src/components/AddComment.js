import React from 'react'
import { Form,Button,TextArea, } from 'semantic-ui-react';

const AddComment = ({value,onAdd,onChange}) => {
    return (
    <Form>
        <Form.Field>
        <TextArea placeholder="enter comment" value={value} style={{ minHeight: 100 }} onChange={onChange}/>
        </Form.Field>
    <Button type='submit' onClick={onAdd}>Add</Button>
  </Form>
    )
}

export default AddComment;