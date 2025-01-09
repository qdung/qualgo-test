import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={jest.fn()} />);
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onSearch with the correct query when submitted', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={onSearchMock} />,
    );

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Inception');
    fireEvent(searchInput, 'submitEditing');

    expect(onSearchMock).toHaveBeenCalledWith('Inception');
  });
});
