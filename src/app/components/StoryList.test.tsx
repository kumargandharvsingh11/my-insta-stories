"use client";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Import Jest DOM matchers for extended assertions
import StoryList from './StoryList';
import users from '@/data/stories';

// Mock the onStoryClick function
const mockOnStoryClick = jest.fn();

describe('StoryList', () => {
  it('renders the correct number of story previews', () => {
    render(<StoryList users={users} onStoryClick={mockOnStoryClick} />);

    // Check if the correct number of story previews are rendered
    const storyPreviews = screen.getAllByTestId('story-preview'); 
    expect(storyPreviews).toHaveLength(users.length);
  });

  it('displays the correct username for each story', () => {
    render(<StoryList users={users} onStoryClick={mockOnStoryClick} />);

    // Check if usernames are displayed correctly
    users.forEach((user) => {
      const usernameElement = screen.getByText(user.username);
      expect(usernameElement).toBeInTheDocument();
    });
  });

  it('calls the onStoryClick prop when a story is clicked', () => {
    render(<StoryList users={users} onStoryClick={mockOnStoryClick} />);

    // Simulate a click on the first story preview
    const firstStoryPreview = screen.getAllByTestId('story-preview')[0];
    firstStoryPreview.click();

    // Check if the onStoryClick function was called with the correct userId
    expect(mockOnStoryClick).toHaveBeenCalledTimes(1);
    expect(mockOnStoryClick).toHaveBeenCalledWith(users[0].id);
  });
});
