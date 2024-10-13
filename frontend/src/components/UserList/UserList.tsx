import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { getUsers } from '../../api/users';

interface UserListProps {
  onEditUser: (user: any) => void;
  searchTerm: string;
}

const UserList: React.FC<UserListProps> = ({ onEditUser, searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(searchTerm, page, pageSize);
      console.log(response.data);
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'District', dataIndex: 'district', key: 'district' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (date: string) => new Date(date).toLocaleString() },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt', render: (date: string) => new Date(date).toLocaleString() },  // Updated At sütunu
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button onClick={() => onEditUser(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default UserList;
