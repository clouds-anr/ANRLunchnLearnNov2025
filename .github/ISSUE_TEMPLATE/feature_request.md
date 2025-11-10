---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

## Issue Type
Feature (New Feature)

## Component
`[ComponentName.tsx]` (Located in `[path/to/component]`)

## Who are you?
You are a senior software engineer.

## Description
[Provide a detailed description of the new feature, including its purpose, user impact, and any relevant business or technical requirements in bullet form. Example is below:
- [ ] Modify admin screen to contain a tab interface.
- [ ] The tabs should be Users, Bedrock, Chat, Logging, Application and should appear at the top of the component.
- [ ] When a tab is selected, the tab should be highlighted. 
- [ ] Create a new admin component called adminBedrock.
- [ ] The bedrock component should display the list of bedrock agents in a list/table format with filter, sort, add, edit, delete functionality in a grid style UI.
- [ ] When the user selects add or edit, a pop-up UI will be presented, allowing the user to perform the action.
- [ ] Relevant fields for the adminbedrock component are name, description, agentId, agentAliasId.
- [ ] When the user deletes an agent, a confirmation dialog will be presented. 
- [ ] Implement the adminBedrock agent component on the admin tab for Bedrock.
- [ ] Write unit tests for new functionality
- [ ] If necessary modify unit tests for existing functionality
- [ ] Use existing mocking strategy and testing utils
- [ ] Run build and test validation
- [ ] Take screenshot of UI changes

## Task
Implement the new feature in the specified component. The implementation should cover the following:
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
- Use existing mocking strategy and test utils located in the src\__mocks__ and src\__test__ folders respectively.
- Use conventional commit messages (e.g., `feat(component): add real-time analytics widget`).
- Create a Pull Request with a description linking to this issue, including screenshots or a video of the feature in action and the test coverage report.
- Update relevant documentation (e.g., README, API docs) if the feature introduces new endpoints or configurations.

## Acceptance Criteria
- Feature implements all specified functionality and edge cases.
- Code runs without errors via `npm run start` or equivalent.
- Feature integrates seamlessly with existing components (e.g., no breaking changes).
- Accessibility meets WCAG 2.1 AA standards (e.g., Lighthouse score >= 90 for accessibility).
- Code adheres to ESLint and Prettier rules.
- Unit tests achieve at least 80% coverage (via `npm run test:ci:development`).
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
