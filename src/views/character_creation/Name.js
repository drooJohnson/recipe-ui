import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Card as CardBase, Typography } from 'antd';
import styled from 'styled-components';
import {useMutation, useQuery, gql} from '@apollo/client'

const SET_NAME = gql`
  mutation setName($name: String!, $id: ID!) {
    setName(name: $name, id: $id) {
      id
      money
      health
      maxHealth
      strength
      intellect
      dexterity
      race {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      class {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      position {
        x
        y
        zone
      }
      name
    }
  }
`

const GET_NAME = gql`
  query GetCurrentPlayer {
    me {
      id
      money
      health
      maxHealth
      strength
      intellect
      dexterity
      race {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      class {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      position {
        x
        y
        zone
      }
      name
    }
  }
`

const Card = styled(CardBase)`
  width:300px;
`

const Name = ({history}) => {
  const { loading, error, data } = useQuery(GET_NAME);
  const [ setName, { newData }] = useMutation(SET_NAME);

  const onFinish = values => {
    console.log('Success:', values);
    setName({ variables: {name: values.name, id: data.me.id}}).then( res => {
      onSubmit();
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  const onSubmit = () => {
    history.push('race');
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
  <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Card hoverable actions={[<Button type='link' htmlType="submit">Submit Name</Button>]}>
      <Typography.Paragraph>Let's choose a name for your character!</Typography.Paragraph>
      <Form.Item
        style={{marginBottom:0}}
        label="Name"
        name="name"
        rules={[
          {
            required:true,
            message: "Please give your character a name!"
          },
        ]}
      >
        <Input/>
      </Form.Item>
    </Card>
  </Form>
  )
}

export default withRouter(Name);
