"use client";
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryView from "./StoryView";
import users from '@/data/stories';

describe("StoryView", () => {
    // Mock function to simulate closing the StoryView
    const mockOnClose = jest.fn();

    // Helper function to render StoryView with a given user ID
    const renderStoryView = (userId: number) => {
        render(<StoryView initialUserId={userId} onClose={mockOnClose} users={users} />);
    };

    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers for testing intervals
    });

    afterEach(() => {
        jest.runOnlyPendingTimers(); // Run any remaining timers after each test
        jest.useRealTimers(); // Restore real timers
    });

    it("auto-advances to the next story after 5 seconds", async () => {

        renderStoryView(2);
        const initialImageSrc = `story${users[1].stories[0].id}`;
        let imageElement = screen.getByTestId("story-image") as HTMLImageElement;
        // Assert (initial state)
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.src).toContain(initialImageSrc);
        // Act (advance time)
        act(() => {
            jest.advanceTimersByTime(5500); // Add a bit more time to allow for image loading (5000 for auto + 400 for transition + 100 buffer)

        });
        // Wait for the component and image to update
        await waitFor(() => {
            const newImageElement = screen.getByTestId("story-image") as HTMLImageElement;
            console.log("initialImageSrc", initialImageSrc, "imageElement", imageElement.src, "newImageElement", newImageElement.src)
            expect(newImageElement.src).not.toContain(initialImageSrc);
            expect(newImageElement.src).toContain(`story${users[1].stories[1].id}`);
        });
    });

    it("pauses auto-advancement on tap and hold, resumes on release", async () => {
        // Arrange
        renderStoryView(2);
        const initialImageSrc = `story${users[1].stories[0].id}`;
        const imageElement = screen.getByTestId("story-image") as HTMLImageElement;

        // Assert (initial state)
        expect(imageElement.src).toContain(initialImageSrc); // First story of user 2

        // Act (tap and hold for 7 seconds)
        fireEvent.mouseDown(imageElement); // Or fireEvent.touchStart for touch devices
        jest.advanceTimersByTime(7000); 

        // Assert (should not advance)
        expect(imageElement.src).toContain(initialImageSrc); // Should still be on the first story

        // Act (release hold)
        fireEvent.mouseUp(imageElement); // Or fireEvent.touchEnd for touch devices

        // Wait for auto-advancement to resume
        await waitFor(
          () => {
            const newImageElement = screen.getByTestId("story-image") as HTMLImageElement;
            expect(newImageElement.src).not.toContain(initialImageSrc);
            expect(newImageElement.src).toContain(`story${users[1].stories[1].id}`); // Should have advanced to the second story
          },
          { timeout: 5500 }
        );
      });

    it("navigates to the next story on tapping the right side, and previous on tapping the left", async () => {
        // Arrange
        renderStoryView(2); // User 2 (multiple stories)
        const initialImageSrc = `story${users[1].stories[0].id}`;
        let imageElement = screen.getByTestId("story-image") as HTMLImageElement;

        // Assert (initial story)
        expect(imageElement.src).toContain(initialImageSrc);

        // Act (tap right side)
        act(() => {
            const rightTapZone = screen.getByTestId("right-tap-zone"); // Select the right tap zone by its data-testid
            fireEvent.click(rightTapZone, { clientX: rightTapZone.clientWidth - 10 });
            jest.advanceTimersByTime(500) //for transitiondelay
            // Wait for the state update and re-render
            waitFor(() => { });
        })

        // Assert (next story)
        await waitFor(() => {
            imageElement = screen.getByTestId("story-image") as HTMLImageElement;
            console.log("imageElement", imageElement.src, "initialImageSrc", initialImageSrc, "forRightSideTap")
            expect(imageElement.src).not.toContain(initialImageSrc);
            expect(imageElement.src).toContain(`story${users[1].stories[1].id}`);
        });

        // Act (tap left side)
        act(() => {
            const leftTapZone = screen.getByTestId("left-tap-zone"); // Select the left tap zone by its data-testid
            fireEvent.click(leftTapZone, { clientX: leftTapZone.clientWidth - 10 });
            jest.advanceTimersByTime(500) //for transitiondelay
            // Wait for the state update and re-render
            waitFor(() => { });
        })

        // Assert (previous story)
        await waitFor(() => {
            imageElement = screen.getByTestId("story-image") as HTMLImageElement;
            console.log("imageElement", imageElement.src, "initialImageSrc", initialImageSrc, "forleftSideTap")
            expect(imageElement.src).toContain(initialImageSrc);
        }, { timeout: 500 }); //this timeout for 400ms transition delay
    });

    it("closes the StoryView when the close button is clicked", () => {
        // Arrange
        renderStoryView(1); // Render StoryView for any user
        // Add data-testid to the close button
        const closeButton = screen.getByTestId("close-button");
      
        // Act
        fireEvent.click(closeButton);
      
        // Assert
        expect(mockOnClose).toHaveBeenCalledTimes(1); // Check if onClose was called
      });

});
