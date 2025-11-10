---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

## Issue Type
Bug

## Component
src/components/chat/chatFooter.tsx

## Who are you?
You are a senior software engineer.

## Steps to Reproduce
- [ ] Login to application
- [ ] Hit the Chat menu item in the sidebar
- [ ] In the chat footer change the agent dropdown to different selected values
- [ ] The dropdown always returns to the 'Claude Agent by Donta'

**Expected behavior**
- [ ] The selected agent from the dropdown in the chatfooter should persist and be the agent used for all chats until another agent is selected.

**Screenshots**
Place Screenshots Here

## Task
The implementation should fix the bug and cover the following:
1. **Core Functionality**: Build the main logic, such as rendering UI elements, handling user interactions, and integrating with data sources (e.g., API, state management).
2. **Data Handling**: Ensure the feature processes and displays data correctly based on props or state (e.g., fetch and render API data).
3. **Edge Cases**: Handle scenarios like:
   - Empty or missing data (e.g., render fallback UI).
   - Error states (e.g., API failures, network issues).
   - Loading states (e.g., display a spinner during async operations).
   - Extreme inputs (e.g., very large datasets, invalid formats).
4. **Accessibility**: Ensure the feature meets WCAG 2.1 AA standards (e.g., ARIA labels, keyboard navigation, sufficient color contrast).
5. **Prop and State Management**: Validate props, handle missing/invalid inputs, and manage internal state appropriately.
6. **Responsive Design**: Ensure the feature renders correctly across devices (e.g., mobile, tablet, desktop) using media queries or CSS frameworks like Tailwind.
7. **Additional Edge Cases**: [List specifics, e.g., "Handle offline scenarios," "Support internationalization if applicable."]

## Instructions for Copilot
- Create a separate branch off the `[relevant base branch, e.g., Sprint1]` named `feature/[short-feature-name]` to house the work.
- Use React, TypeScript, and specified libraries (e.g., `react-chartjs-2` for charts) per `../copilot-instructions.md`:
  - Structure code with clear separation of concerns (e.g., UI, logic, hooks).
  - Use functional components with hooks (e.g., `useState`, `useEffect`).
  - Mock external dependencies (e.g., APIs, hooks, or context) using `vi.mock` or `vi.spyOn` for isolation during development and testing.
  - Adhere to global standards: Use camelCase for variables, avoid magic numbers, and ensure type safety with interfaces/props.
  - Add JSDoc comments for components, hooks, and non-obvious logic. Include inline comments for complex code.
  - Optimize performance (e.g., use `React.memo` or `useCallback` to prevent unnecessary re-renders).
  - Ensure security (e.g., sanitize dynamic content to prevent XSS).
- Integrate with existing state management (e.g., Redux, Context API) if applicable.
- Write unit tests for the feature, achieving at least 80% coverage, following the unit testing template.
- Use conventional commit messages (e.g., `feat(component): add real-time analytics widget`).
- Create a Pull Request with a description linking to this issue, including screenshots or a video of the feature in action and the test coverage report.
- Update relevant documentation (e.g., README, API docs) if the feature introduces new endpoints or configurations.

## Acceptance Criteria
- Feature implements all specified functionality and edge cases.
- Code runs without errors via `npm run start` or equivalent.
- Feature integrates seamlessly with existing components (e.g., no breaking changes).
- Accessibility meets WCAG 2.1 AA standards (e.g., Lighthouse score >= 90 for accessibility).
- Code adheres to ESLint and Prettier rules.
- Unit tests achieve at least 80% coverage (via `npm run test -- --coverage`).
- No security vulnerabilities (e.g., no XSS in dynamic content, verified via ESLint or manual review).
- PR includes updated documentation and clear setup instructions if needed.

## Priority
[High/Medium/Low] (Based on impact, e.g., High for user-facing features)

## Labels
- `feature`
- `frontend`
- `react`
- `typescript`

## Assignee
Copilot Agent
