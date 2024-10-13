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
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 50, ellipsis: true },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 100, ellipsis: true },
    { title: 'Surname', dataIndex: 'surname', key: 'surname', width: 100, ellipsis: true },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200, ellipsis: true },
    { title: 'Password', dataIndex: 'password', key: 'password', width: 100, ellipsis: true },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 120, ellipsis: true },
    { title: 'Age', dataIndex: 'age', key: 'age', width: 70, ellipsis: true },
    { title: 'Country', dataIndex: 'country', key: 'country', width: 100, ellipsis: true },
    { title: 'District', dataIndex: 'district', key: 'district', width: 75, ellipsis: true },
    { title: 'Role', dataIndex: 'role', key: 'role', width: 75, ellipsis: true },
    { title: 'Created At', dataIndex: 'createdat', key: 'createdat', width: 100, ellipsis: true, render: (date: string) => new Date(Date.parse(date)).toLocaleString() },
    { title: 'Updated At', dataIndex: 'updatedat', key: 'updatedat', width: 100, ellipsis: true, render: (date: string) => new Date(Date.parse(date)).toLocaleString() },
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
        position: ['bottomCenter']
      }}
    />
  );
};

export default UserList;
