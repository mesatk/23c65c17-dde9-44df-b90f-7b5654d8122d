import React, { useState } from 'react';
import { Input } from 'antd';

const SearchInput: React.FC = () => {
  const [search, setSearch] = useState('');

  const onSearch = (value: string) => {
    setSearch(value);
    // Burada arama fonksiyonunu UserList bileşenine gönderebilirsiniz
  };

  return (
    <Input.Search
      placeholder="Search users"
      onSearch={onSearch}
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchInput;
