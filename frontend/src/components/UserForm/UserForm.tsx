import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { saveUser, updateUser } from '../../api/users';

const { Option } = Select;

interface UserFormProps {
  user?: any;
  closeModal: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);  // Eğer kullanıcı düzenleniyorsa formu doldur
    } else {
      form.resetFields();  // Yeni kullanıcı ekleme ise formu sıfırla
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    try {
      if (user) {
        await updateUser({ ...user, ...values });
      } else {
        await saveUser(values);
      }
      closeModal();  // İşlem bittiğinde modalı kapat
    } catch (error) {
      console.error("Error saving/updating user:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="surname" label="Surname" rules={[{ required: true, message: 'Please input the surname!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input the country!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="district" label="District" rules={[{ required: true, message: 'Please input the district!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select the role!' }]}>
        <Select placeholder="Select a role">
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {user ? 'Update User' : 'Add User'}
      </Button>
    </Form>
  );
};

export default UserForm;
