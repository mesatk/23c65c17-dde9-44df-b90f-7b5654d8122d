import React from 'react';
import { Input } from 'antd';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <Input.Search
      placeholder="Search users"
      onSearch={onSearch}
      enterButton="Search"
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchInput;
