import { Form, Input, Button } from 'antd'
import React from 'react'

const CreateTodoForm = ({ onFinish, onFinishFailed, isLoading }) => {
  const [form] = Form.useForm()

  const handleOnFinish = values => {
    onFinish(values)
    form.resetFields()
  }

  return (
    <div>
      <Form
        name="create-todo"
        form={form}
        onFinish={handleOnFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
        className="flex"
        size="large"
      >
        <Form.Item name="text" className="flex-grow m-0">
          <Input placeholder="Add a todo" required />
        </Form.Item>

        <Form.Item className="m-0">
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateTodoForm
