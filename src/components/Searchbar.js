
import React from 'react'
import {Form, Segment} from 'semantic-ui-react'

const Searchbar = ({term,onSearch}) => {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <Form.Input type="text" icon="search" placeholder="Search" value={term} onChange={onSearch}>
                        </Form.Input>
                    </Form.Field>
                </Form>
            </Segment>
        )
}

export default Searchbar;
